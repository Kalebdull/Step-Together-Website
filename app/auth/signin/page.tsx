'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <Image src="/logo.png" alt="Step Together" width={72} height={72} className="mx-auto rounded-full mb-4" />
          </Link>
          <h1 className="font-serif text-cream text-3xl font-light">Welcome back</h1>
          <p className="text-cream/50 font-sans text-sm mt-2">Sign in to your Step Together account</p>
        </div>

        <div className="bg-navy rounded-lg border border-cream/10 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Email</label>
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
              />
            </div>
            <div>
              <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm font-sans">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full bg-rust text-white font-sans font-medium text-sm py-3.5 rounded-md hover:bg-rust-dark transition-colors duration-200 disabled:opacity-60 mt-1"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-cream/50 font-sans text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-rust hover:text-rust-light transition-colors font-medium">
              Join Now
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-cream/30 font-sans text-xs hover:text-cream/60 transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  )
}
