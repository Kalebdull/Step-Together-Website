import Stripe from 'stripe'

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
    apiVersion: '2026-04-22.dahlia',
    typescript: true,
  })
}

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''

export const MEMBERSHIP_PRICES = {
  community: process.env.STRIPE_COMMUNITY_PRICE_ID ?? '',
  premium: process.env.STRIPE_PREMIUM_PRICE_ID ?? '',
}
