// ============================================================
// Stripe Client for RocketClients
// Lazy initialization to avoid build-time errors
// ============================================================

import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  }
  return stripeInstance
}

// Type-safe wrapper for common operations
export const stripe = {
  get customers() {
    return getStripe().customers
  },
  get checkout() {
    return getStripe().checkout
  },
  get subscriptions() {
    return getStripe().subscriptions
  },
  get webhooks() {
    return getStripe().webhooks
  },
}
