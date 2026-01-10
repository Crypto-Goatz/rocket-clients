// ============================================================
// Form Embed API - Returns Form Configuration
// ============================================================
// Provides dynamic form configuration with custom values
// Can be used to personalize forms per location
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { getCustomValues } from '@/lib/ghl'

// CORS headers for cross-origin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
}

// Handle preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// Default form configurations (can be extended per form ID)
const FORM_CONFIGS: Record<string, {
  heading: string
  subheading: string
  buttonText: string
  successMessage: string
  showName: boolean
  showPhone: boolean
  showMessage: boolean
  nameRequired: boolean
  phoneRequired: boolean
  theme: string
  workflowId?: string
  tags: string[]
}> = {
  // Default lead capture form
  'default': {
    heading: 'Get Started Today',
    subheading: 'Fill out the form and we\'ll be in touch shortly.',
    buttonText: 'Get Started',
    successMessage: 'Thank you! We\'ll be in touch soon.',
    showName: true,
    showPhone: true,
    showMessage: false,
    nameRequired: false,
    phoneRequired: false,
    theme: 'light',
    tags: ['website-lead'],
  },

  // Quick contact form
  'contact': {
    heading: 'Contact Us',
    subheading: 'Have a question? Send us a message.',
    buttonText: 'Send Message',
    successMessage: 'Message sent! We\'ll get back to you within 24 hours.',
    showName: true,
    showPhone: true,
    showMessage: true,
    nameRequired: true,
    phoneRequired: false,
    theme: 'light',
    tags: ['contact-form'],
  },

  // Quote request form
  'quote': {
    heading: 'Get Your Free Quote',
    subheading: 'Tell us about your project and we\'ll provide a custom quote.',
    buttonText: 'Request Quote',
    successMessage: 'Quote request received! Check your email for next steps.',
    showName: true,
    showPhone: true,
    showMessage: true,
    nameRequired: true,
    phoneRequired: true,
    theme: 'rocket',
    tags: ['quote-request', 'high-intent'],
  },

  // Newsletter signup
  'newsletter': {
    heading: 'Join Our Newsletter',
    subheading: 'Get the latest tips and updates delivered to your inbox.',
    buttonText: 'Subscribe',
    successMessage: 'You\'re subscribed! Check your inbox for a welcome email.',
    showName: false,
    showPhone: false,
    showMessage: false,
    nameRequired: false,
    phoneRequired: false,
    theme: 'light',
    tags: ['newsletter'],
  },

  // Free consultation
  'consultation': {
    heading: 'Book Your Free Consultation',
    subheading: 'Schedule a call with our team to discuss your needs.',
    buttonText: 'Book Now',
    successMessage: 'Thanks {{first_name}}! We\'ll call you within 24 hours to schedule.',
    showName: true,
    showPhone: true,
    showMessage: true,
    nameRequired: true,
    phoneRequired: true,
    theme: 'rocket',
    tags: ['consultation', 'high-intent'],
  },

  // Lead magnet download
  'download': {
    heading: 'Download Your Free Guide',
    subheading: 'Enter your email to get instant access.',
    buttonText: 'Download Now',
    successMessage: 'Check your email for the download link!',
    showName: true,
    showPhone: false,
    showMessage: false,
    nameRequired: false,
    phoneRequired: false,
    theme: 'light',
    tags: ['lead-magnet', 'download'],
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('formId') || 'default'
    const includeCustomValues = searchParams.get('includeCustomValues') === 'true'

    // Get base config
    const config = FORM_CONFIGS[formId] || FORM_CONFIGS['default']

    // Build response
    const response: Record<string, unknown> = {
      formId,
      ...config,
      apiUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://rocketclients.com'}/api/leads`,
    }

    // Optionally include custom values for personalization
    if (includeCustomValues) {
      const customValuesResult = await getCustomValues()
      if (customValuesResult.success && customValuesResult.data?.customValues) {
        // Convert custom values to a usable format
        const customValues: Record<string, string> = {}
        for (const cv of customValuesResult.data.customValues) {
          // Convert name to camelCase key
          const key = cv.name.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          customValues[key] = cv.value
        }
        response.customValues = customValues
      }
    }

    return NextResponse.json(response, { headers: corsHeaders })
  } catch (error) {
    console.error('Form embed API error:', error)
    return NextResponse.json(
      { error: 'Failed to load form configuration' },
      { status: 500, headers: corsHeaders }
    )
  }
}
