import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'

const ALLOWED = ['classes','events','workshops','apparel_products','partnerships',
  'newsletter_subscribers','contact_submissions','profiles','site_settings','memberships']

function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const password = process.env.ADMIN_PASSWORD
  if (!token || !password) return false
  const expected = crypto.createHash('sha256').update(password + 'st-admin').digest('hex')
  return token === expected
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { table } = await params
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const url = new URL(request.url)
  const orderBy = url.searchParams.get('orderBy') ?? 'created_at'
  const ascending = url.searchParams.get('ascending') !== 'false'

  const supabase = await createServiceClient()
  const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { table } = await params
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const body = await request.json()
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from(table).insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// Upsert — used by settings page (bypasses RLS via service role)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { table } = await params
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const { _onConflict, ...body } = await request.json()
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from(table)
    .upsert(body, { onConflict: _onConflict ?? 'id' })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
