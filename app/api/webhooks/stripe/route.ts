// ============================================================
// Stripe Webhook Handler for RocketClients
// Processes checkout, subscription updates, and cancellations
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { supabaseAdmin, logActivity } from '@/lib/supabase'
import { createSubAccount } from '@/lib/ghl'

// Universal inbound webhook
const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/6MSqx0trfxgLxeHBJE1k/webhook-trigger/888494a8-27e2-4a7d-b3fc-e56243dc86be'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    let event: Stripe.Event
    const stripe = getStripe()

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancelled(subscription)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// ============================================================
// checkout.session.completed — The critical flow
// ============================================================

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const clientId = session.metadata?.client_id
  if (!clientId) {
    console.error('No client_id in checkout session metadata')
    return
  }

  // Get the client record
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (!client) {
    console.error('Client not found:', clientId)
    return
  }

  // Activate client in Supabase
  await supabaseAdmin
    .from('clients')
    .update({
      status: 'active',
      metadata: {
        ...(client.metadata as object),
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        activated_at: new Date().toISOString(),
      },
    } as never)
    .eq('id', clientId)

  // Create CRM sub-account
  let ghlLocationId: string | null = null
  try {
    const subAccountResult = await createSubAccount({
      name: client.name,
      email: client.email || '',
      phone: client.phone || undefined,
      timezone: client.timezone || 'America/New_York',
    })

    if (subAccountResult.success && subAccountResult.data?.location) {
      ghlLocationId = (subAccountResult.data.location as Record<string, string>).id || null

      // Store location ID on client record
      if (ghlLocationId) {
        await supabaseAdmin
          .from('clients')
          .update({
            ghl_location_id: ghlLocationId,
          } as never)
          .eq('id', clientId)
      }
    } else {
      console.error('CRM sub-account creation failed:', subAccountResult.error)
    }
  } catch (err) {
    console.error('CRM sub-account creation error:', err)
  }

  // Fire webhook to CRM
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'checkout_completed',
      client_id: clientId,
      email: client.email,
      name: client.name,
      ghl_location_id: ghlLocationId,
      stripe_subscription_id: session.subscription,
      features: (client.settings as Record<string, unknown>)?.enabled_features || [],
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => console.error('Webhook fire failed:', err))

  // Log activity
  await logActivity({
    client_id: clientId,
    user_id: null,
    user_email: client.email,
    api_key_id: null,
    action: 'subscription_activated',
    resource_type: 'subscription',
    resource_id: session.subscription as string,
    description: 'Subscription activated after checkout',
    metadata: {
      checkout_session_id: session.id,
      amount: session.amount_total,
      ghl_location_id: ghlLocationId,
    },
    ip_address: null,
    user_agent: null,
  })
}

// ============================================================
// customer.subscription.updated
// ============================================================

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('id, settings')
    .eq('metadata->>stripe_subscription_id', subscription.id)
    .single()

  if (!client) return

  // Extract features from subscription item metadata
  const features: string[] = []
  for (const item of subscription.items.data) {
    const featureId = item.price.metadata?.feature_id
    if (featureId) features.push(featureId)
  }

  // Calculate monthly price
  const monthlyPrice = subscription.items.data.reduce((sum, item) => {
    return sum + ((item.price.unit_amount || 0) / 100)
  }, 0)

  await supabaseAdmin
    .from('clients')
    .update({
      settings: {
        ...(client.settings as object),
        enabled_features: features.length > 0
          ? features
          : (client.settings as Record<string, unknown>)?.enabled_features,
      },
      monthly_revenue: monthlyPrice,
    } as never)
    .eq('id', client.id)

  await logActivity({
    client_id: client.id,
    user_id: null,
    user_email: null,
    api_key_id: null,
    action: 'subscription_updated',
    resource_type: 'subscription',
    resource_id: subscription.id,
    description: 'Subscription plan updated',
    metadata: { features, monthly_price: monthlyPrice, status: subscription.status },
    ip_address: null,
    user_agent: null,
  })
}

// ============================================================
// customer.subscription.deleted
// ============================================================

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('id')
    .eq('metadata->>stripe_subscription_id', subscription.id)
    .single()

  if (!client) return

  await supabaseAdmin
    .from('clients')
    .update({ status: 'paused' } as never)
    .eq('id', client.id)

  await logActivity({
    client_id: client.id,
    user_id: null,
    user_email: null,
    api_key_id: null,
    action: 'subscription_cancelled',
    resource_type: 'subscription',
    resource_id: subscription.id,
    description: 'Subscription cancelled',
    metadata: { cancelled_at: new Date().toISOString() },
    ip_address: null,
    user_agent: null,
  })
}

// ============================================================
// invoice.payment_failed
// ============================================================

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.customer) return

  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('id')
    .eq('metadata->>stripe_customer_id', invoice.customer)
    .single()

  if (!client) return

  console.error('Payment failed for client:', client.id, 'Invoice:', invoice.id)

  await logActivity({
    client_id: client.id,
    user_id: null,
    user_email: null,
    api_key_id: null,
    action: 'payment_failed',
    resource_type: 'invoice',
    resource_id: invoice.id,
    description: `Payment failed — $${((invoice.amount_due || 0) / 100).toFixed(2)}`,
    metadata: {
      invoice_id: invoice.id,
      amount: (invoice.amount_due || 0) / 100,
      attempt_count: invoice.attempt_count,
    },
    ip_address: null,
    user_agent: null,
  })
}
