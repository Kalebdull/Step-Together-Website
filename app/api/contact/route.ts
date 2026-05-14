import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendContactConfirmation } from '@/lib/resend'

export async function POST(req: NextRequest) {
  console.log('[POST /api/contact] Request received')
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('contact_submissions').insert({ name, email, subject, message })
    if (error) throw error

    // Send confirmation email (non-blocking)
    sendContactConfirmation(name, email, subject ?? 'General Inquiry').catch(console.error)

    console.log('[POST /api/contact] Success for', email)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/contact] Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
