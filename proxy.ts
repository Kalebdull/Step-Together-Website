import { NextResponse, type NextRequest } from 'next/server'

async function makeToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + 'st-admin')
  const buf = await globalThis.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin auth (simple password cookie) ──────────────────────
  if (pathname.startsWith('/admin')) {
    // Allow the login page and login API through
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/')) {
      return NextResponse.next()
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    const token = request.cookies.get('admin_token')?.value
    const expected = adminPassword ? await makeToken(adminPassword) : null

    if (!expected || token !== expected) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
  }

  // ── Supabase session refresh for public/dashboard routes ──────
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.next({ request })
  }

  // Refresh session cookie if needed
  const { createServerClient } = await import('@supabase/ssr')
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  if (pathname.startsWith('/dashboard')) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
