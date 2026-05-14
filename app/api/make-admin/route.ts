import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin

  // Step 1: Check if the user is signed in
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.redirect(`${origin}/auth/signin`)
  }

  // Step 2: Use service role to bypass RLS and upsert admin profile
  const serviceSupabase = await createServiceClient()

  const { error } = await serviceSupabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name ?? 'Admin',
      role: 'admin',
      membership_tier: 'free',
    }, { onConflict: 'id' })

  if (error) {
    // Profiles table likely doesn't exist — migrations need to be run
    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:40px;max-width:600px">
        <h2>⚠️ Database not set up yet</h2>
        <p>The <code>profiles</code> table doesn't exist. You need to run the SQL migrations first.</p>
        <ol>
          <li>Go to your <a href="https://supabase.com" target="_blank">Supabase dashboard</a></li>
          <li>Click <strong>SQL Editor → New query</strong></li>
          <li>Paste and run <code>supabase/migrations/001_initial_schema.sql</code></li>
          <li>Then run <code>002_rls_policies.sql</code></li>
          <li>Then run <code>003_seed_data.sql</code></li>
          <li>Come back and visit <a href="/api/make-admin">/api/make-admin</a> again</li>
        </ol>
        <p style="color:red"><strong>Error:</strong> ${error.message}</p>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }

  // Success — go straight to admin
  return NextResponse.redirect(`${origin}/admin`)
}
