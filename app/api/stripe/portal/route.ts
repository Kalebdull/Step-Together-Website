import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  console.log('[POST /api/stripe/portal] Request received')
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single()
    if (!profile?.stripe_customer_id) return NextResponse.json({ error: 'No Stripe customer' }, { status: 400 })

    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    console.log('[POST /api/stripe/portal] Portal session created')
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[POST /api/stripe/portal] Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
