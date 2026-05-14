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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { table, id } = await params
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const body = await request.json()
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from(table).update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { table, id } = await params
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'Invalid table' }, { status: 400 })

  const supabase = await createServiceClient()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
