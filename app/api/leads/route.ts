// ============================================================
// Leads API - Form Submission Handler
// ============================================================
// Receives form submissions and creates contacts in GHL
// Supports CORS for cross-origin embeds
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { captureLeadToGHL, type LeadCaptureData } from '@/lib/ghl'

// Universal inbound webhook — fires on every lead capture
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/6MSqx0trfxgLxeHBJE1k/webhook-trigger/888494a8-27e2-4a7d-b3fc-e56243dc86be'

// CORS headers for cross-origin embeds
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Rocket-Form-ID',
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Validate phone format (basic)
function isValidPhone(phone: string): boolean {
  // Allow various formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  return /^\+?\d{10,15}$/.test(cleaned)
}

// Rate limiting (simple in-memory for now)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Clean old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip)
    }
  }
}, 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: corsHeaders }
      )
    }

    // Parse request body
    const body = await request.json()

    // Extract and validate fields
    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      source,
      tags,
      workflowId,
      customFields,
      // UTM parameters
      utmSource,
      utmMedium,
      utmCampaign,
      // Form metadata
      formId,
      pageUrl,
    } = body as {
      firstName?: string
      lastName?: string
      name?: string
      email?: string
      phone?: string
      source?: string
      tags?: string[]
      workflowId?: string
      customFields?: Record<string, string>
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      formId?: string
      pageUrl?: string
    }

    // Validate required field: email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Validate phone if provided
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Parse name into first/last if only name provided
    let parsedFirstName = firstName
    let parsedLastName = lastName

    if (name && !firstName && !lastName) {
      const nameParts = name.trim().split(/\s+/)
      parsedFirstName = nameParts[0]
      parsedLastName = nameParts.slice(1).join(' ') || undefined
    }

    // Build the lead data
    const leadData: LeadCaptureData = {
      firstName: parsedFirstName,
      lastName: parsedLastName,
      email: email.toLowerCase().trim(),
      phone: phone?.replace(/[\s\-\(\)\.]/g, ''),
      source: source || (formId ? `Rocket Form: ${formId}` : 'Rocket Form'),
      tags: [
        ...(tags || []),
        formId ? `form:${formId}` : undefined,
        pageUrl ? `page:${new URL(pageUrl).pathname}` : undefined,
      ].filter(Boolean) as string[],
      workflowId,
      customFields,
      utmSource,
      utmMedium,
      utmCampaign,
    }

    // Send to GHL
    const result = await captureLeadToGHL(leadData)

    if (!result.success) {
      console.error('GHL lead capture failed:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit form. Please try again.' },
        { status: 500, headers: corsHeaders }
      )
    }

    const contactId = result.data?.contact?.id

    // Fire universal inbound webhook (non-blocking)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactId,
        email: leadData.email,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        phone: leadData.phone,
        source: leadData.source,
        tags: leadData.tags,
        tool: tags?.find((t: string) => t.startsWith('tool:'))?.replace('tool:', '') || null,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error('Webhook fire failed:', err))

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We\'ll be in touch soon.',
        contactId,
      },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500, headers: corsHeaders }
    )
  }
}
