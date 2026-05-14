import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  console.log('[POST /api/stripe/webhook] Webhook received')
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  const stripe = getStripe()
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[POST /api/stripe/webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const userId = session.metadata?.user_id
    const entityType = session.metadata?.entity_type
    const entityId = session.metadata?.entity_id

    if (userId) {
      // Store customer ID if new
      if (session.customer) {
        await supabase.from('profiles').update({ stripe_customer_id: session.customer }).eq('id', userId)
      }

      // Handle subscription
      if (session.mode === 'subscription') {
        const sub = await stripe.subscriptions.retrieve(session.subscription)
        const priceId = sub.items.data[0]?.price.id
        const tier = priceId === process.env.STRIPE_PREMIUM_PRICE_ID ? 'premium' : 'community'
        await supabase.from('profiles').update({ membership_tier: tier }).eq('id', userId)
      }

      // Handle one-time registration
      if (entityType && entityId) {
        await supabase.from('registrations').insert({
          user_id: userId, entity_type: entityType, entity_id: entityId,
          status: 'confirmed', payment_status: 'paid', stripe_session_id: session.id,
        })
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any
    const { data: profile } = await supabase.from('profiles').select('id').eq('stripe_customer_id', sub.customer).single()
    if (profile) await supabase.from('profiles').update({ membership_tier: 'free' }).eq('id', profile.id)
  }

  console.log('[POST /api/stripe/webhook] Processed event:', event.type)
  return NextResponse.json({ received: true })
}

