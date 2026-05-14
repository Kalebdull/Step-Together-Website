import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendNewsletterWelcome } from '@/lib/resend'

export async function POST(req: NextRequest) {
  console.log('[POST /api/newsletter] Request received')
  try {
    const { email, name } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const supabase = await createClient()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, name, is_active: true }, { onConflict: 'email' })
    if (error) throw error

    sendNewsletterWelcome(name, email).catch(console.error)

    console.log('[POST /api/newsletter] Subscribed:', email)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/newsletter] Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
