// ============================================================
// Checkout API - Creates Stripe Checkout Sessions
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin, logActivity } from '@/lib/supabase'

// CORS headers (same pattern as /api/leads)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// ============================================================
// Price Map — Stripe Price IDs (Live)
// ============================================================

const PRICE_MAP: Record<string, { monthly: string; annual: string }> = {
  // Individual features
  'funnels':          { monthly: 'price_1SyqaQLENnHWT4tVSHXerks1', annual: 'price_1SyqaQLENnHWT4tVncBNzy9f' },
  'email-marketing':  { monthly: 'price_1SyqaQLENnHWT4tVcEj8kj19', annual: 'price_1SyqaRLENnHWT4tVGgV8YJVg' },
  'sms-marketing':    { monthly: 'price_1SyqaRLENnHWT4tVqkFGg3yU', annual: 'price_1SyqaRLENnHWT4tVSSodHGxJ' },
  'unified-inbox':    { monthly: 'price_1SyqaSLENnHWT4tVWZl5FyfN', annual: 'price_1SyqaSLENnHWT4tVTf1gX023' },
  'social-media':     { monthly: 'price_1SyqaSLENnHWT4tVMy8FHDUk', annual: 'price_1SyqaTLENnHWT4tVNeZ0qolp' },
  'reputation':       { monthly: 'price_1SyqaTLENnHWT4tVqeKZyOKp', annual: 'price_1SyqaULENnHWT4tVBvhYXRz2' },
  'pipeline':         { monthly: 'price_1SyqagLENnHWT4tVbohpbPbk', annual: 'price_1SyqahLENnHWT4tVnu4yjQyg' },
  'workflows':        { monthly: 'price_1SyqahLENnHWT4tVEyEjCsMP', annual: 'price_1SyqaiLENnHWT4tVh4mE4Kuf' },
  'triggers':         { monthly: 'price_1SyqajLENnHWT4tV3Aj3oOrF', annual: 'price_1SyqakLENnHWT4tVVzJO5ehI' },
  'payments':         { monthly: 'price_1SyqalLENnHWT4tVWT3MoaH8', annual: 'price_1SyqamLENnHWT4tVV3S48w3c' },
  'ecommerce':        { monthly: 'price_1SyqanLENnHWT4tVUrK5NjbQ', annual: 'price_1SyqanLENnHWT4tVVdrv1y2U' },
  'membership':       { monthly: 'price_1SyqaoLENnHWT4tVbF3WHifz', annual: 'price_1SyqapLENnHWT4tV8OtTD0pa' },
  'communities':      { monthly: 'price_1Syqb1LENnHWT4tVhSDUtYyM', annual: 'price_1Syqb2LENnHWT4tV5tUhSJL9' },
  'call-tracking':    { monthly: 'price_1Syqb3LENnHWT4tVNlKziYrA', annual: 'price_1Syqb4LENnHWT4tVQqrBNoWe' },
  'rocket-ai':        { monthly: 'price_1Syqb5LENnHWT4tVPY0Qfxpn', annual: 'price_1Syqb6LENnHWT4tVhNPMbeiY' },
  // Bundles
  'starter':          { monthly: 'price_1Syqb6LENnHWT4tVCXGuXNq8', annual: 'price_1Syqb7LENnHWT4tVumSlCUwj' },
  'growth':           { monthly: 'price_1Syqb8LENnHWT4tVVVb5JqRH', annual: 'price_1Syqb9LENnHWT4tVJIBF7DJa' },
  'scale':            { monthly: 'price_1SyqbALENnHWT4tVDyHX2CRc', annual: 'price_1SyqbBLENnHWT4tVWW97e8ca' },
}

// Bundle trial days
const BUNDLE_TRIALS: Record<string, number> = {
  'starter': 7,
  'growth': 0,
  'scale': 14,
}

// Bundle feature lists (for metadata)
const BUNDLE_FEATURES: Record<string, string[]> = {
  'starter': ['funnels', 'email-marketing', 'sms-marketing', 'unified-inbox', 'pipeline'],
  'growth': ['funnels', 'email-marketing', 'sms-marketing', 'unified-inbox', 'pipeline', 'workflows', 'social-media', 'reputation', 'payments', 'rocket-ai'],
  'scale': ['funnels', 'email-marketing', 'sms-marketing', 'unified-inbox', 'social-media', 'reputation', 'pipeline', 'workflows', 'triggers', 'payments', 'ecommerce', 'membership', 'communities', 'call-tracking', 'rocket-ai'],
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 50)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      phone,
      features,
      bundleId,
      billingCycle = 'monthly',
      promoCode,
    } = body as {
      email?: string
      name?: string
      phone?: string
      features?: string[]
      bundleId?: string
      billingCycle?: 'monthly' | 'annual'
      promoCode?: string
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Must have features or bundleId
    if (!bundleId && (!features || features.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'Select at least one feature or bundle' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Resolve line items
    const lineItems: { price: string; quantity: number }[] = []
    let trialDays = 3 // default trial for custom builds

    if (bundleId) {
      const prices = PRICE_MAP[bundleId]
      if (!prices) {
        return NextResponse.json(
          { success: false, error: 'Invalid bundle' },
          { status: 400, headers: corsHeaders }
        )
      }
      const priceId = billingCycle === 'annual' ? prices.annual : prices.monthly
      lineItems.push({ price: priceId, quantity: 1 })
      trialDays = BUNDLE_TRIALS[bundleId] ?? 0
    } else if (features) {
      for (const featureId of features) {
        const prices = PRICE_MAP[featureId]
        if (!prices) continue
        const priceId = billingCycle === 'annual' ? prices.annual : prices.monthly
        lineItems.push({ price: priceId, quantity: 1 })
      }
    }

    if (lineItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid features selected' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: email.toLowerCase(),
      name: name || undefined,
      phone: phone || undefined,
      metadata: {
        source: 'rocketclients_checkout',
        features: bundleId
          ? (BUNDLE_FEATURES[bundleId] || []).join(',')
          : (features || []).join(','),
        bundle_id: bundleId || '',
      },
    })

    // Create client record in Supabase (pending until webhook confirms)
    const slug = generateSlug(name || email.split('@')[0])
    const { data: client, error: clientError } = await supabaseAdmin
      .from('clients')
      .insert({
        name: name || email.split('@')[0],
        slug,
        email: email.toLowerCase(),
        phone: phone || null,
        status: 'pending',
        country: 'US',
        timezone: 'America/New_York',
        primary_color: '#f97316',
        settings: {
          enabled_features: bundleId
            ? BUNDLE_FEATURES[bundleId]
            : features,
          bundle_id: bundleId || null,
          billing_cycle: billingCycle,
          promo_code: promoCode || null,
        },
        metadata: {
          stripe_customer_id: customer.id,
          signup_date: new Date().toISOString(),
        },
        contact_count: 0,
        opportunity_count: 0,
        monthly_revenue: 0,
      } as never)
      .select()
      .single()

    if (clientError || !client) {
      console.error('Client creation error:', clientError)
      await stripe.customers.del(customer.id)
      return NextResponse.json(
        { success: false, error: 'Failed to create account' },
        { status: 500, headers: corsHeaders }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      subscription_data: {
        ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
        metadata: {
          client_id: client.id,
          features: bundleId
            ? (BUNDLE_FEATURES[bundleId] || []).join(',')
            : (features || []).join(','),
          bundle_id: bundleId || '',
        },
      },
      success_url: `https://rocketclients.com/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://rocketclients.com/pricing`,
      metadata: {
        client_id: client.id,
      },
      ...(promoCode ? { allow_promotion_codes: true } : {}),
    })

    // Log activity
    await logActivity({
      client_id: client.id,
      user_id: null,
      user_email: email.toLowerCase(),
      api_key_id: null,
      action: 'checkout_started',
      resource_type: 'checkout',
      resource_id: session.id,
      description: `Checkout started for ${bundleId ? `${bundleId} bundle` : `${features?.length} features`}`,
      metadata: {
        features: bundleId ? BUNDLE_FEATURES[bundleId] : features,
        bundle_id: bundleId || null,
        billing_cycle: billingCycle,
      },
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || null,
      user_agent: request.headers.get('user-agent') || null,
    })

    return NextResponse.json(
      { success: true, checkoutUrl: session.url },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500, headers: corsHeaders }
    )
  }
}
