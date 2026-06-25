import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin, logActivity } from '@/lib/supabase'
import { getFeatureByKey, getFeaturesByKeys, type Feature } from '@/lib/features'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
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
    const { email, name, phone, features, bundleId, promoCode } = body as {
      email?: string
      name?: string
      phone?: string
      features?: string[]
      bundleId?: string
      promoCode?: string
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400, headers: corsHeaders })
    }
    if (!bundleId && (!features || features.length === 0)) {
      return NextResponse.json({ success: false, error: 'Select at least one feature or bundle' }, { status: 400, headers: corsHeaders })
    }

    // Resolve line items + trial days from DB
    const lineItems: { price: string; quantity: number }[] = []
    let trialDays = 3
    let enabledFeatureKeys: string[] = []
    let resolvedBundle: Feature | null = null

    if (bundleId) {
      const bundle = await getFeatureByKey(bundleId)
      if (!bundle || !bundle.is_bundle) {
        return NextResponse.json({ success: false, error: 'Invalid bundle' }, { status: 400, headers: corsHeaders })
      }
      resolvedBundle = bundle
      lineItems.push({ price: bundle.stripe_price_id, quantity: 1 })
      trialDays = bundle.trial_days ?? 0
      enabledFeatureKeys = bundle.included_features ?? []
    } else if (features) {
      const rows = await getFeaturesByKeys(features)
      const found = new Map(rows.map(r => [r.feature_key, r]))
      for (const key of features) {
        const row = found.get(key)
        if (!row || row.is_bundle) continue
        lineItems.push({ price: row.stripe_price_id, quantity: 1 })
        enabledFeatureKeys.push(key)
      }
    }

    if (lineItems.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid features selected' }, { status: 400, headers: corsHeaders })
    }

    const customer = await stripe.customers.create({
      email: email.toLowerCase(),
      name: name || undefined,
      phone: phone || undefined,
      metadata: {
        source: 'rocketclients_checkout',
        features: enabledFeatureKeys.join(','),
        bundle_id: bundleId || '',
      },
    })

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
          enabled_features: enabledFeatureKeys,
          bundle_id: bundleId || null,
          billing_cycle: 'monthly',
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
      return NextResponse.json({ success: false, error: 'Failed to create account' }, { status: 500, headers: corsHeaders })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      subscription_data: {
        ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
        metadata: {
          client_id: client.id,
          features: enabledFeatureKeys.join(','),
          bundle_id: bundleId || '',
        },
      },
      success_url: `https://rocketclients.com/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://rocketclients.com/pricing`,
      metadata: { client_id: client.id },
      ...(promoCode ? { allow_promotion_codes: true } : {}),
    })

    await logActivity({
      client_id: client.id,
      user_id: null,
      user_email: email.toLowerCase(),
      api_key_id: null,
      action: 'checkout_started',
      resource_type: 'checkout',
      resource_id: session.id,
      description: resolvedBundle
        ? `Checkout started for ${resolvedBundle.name}`
        : `Checkout started for ${enabledFeatureKeys.length} feature(s)`,
      metadata: {
        features: enabledFeatureKeys,
        bundle_id: bundleId || null,
        billing_cycle: 'monthly',
      },
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || null,
      user_agent: request.headers.get('user-agent') || null,
    })

    return NextResponse.json({ success: true, checkoutUrl: session.url }, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500, headers: corsHeaders })
  }
}
