'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dance_experience: '',
    date_of_birth: '',
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          phone: form.phone || null,
          dance_experience: form.dance_experience || null,
          date_of_birth: form.date_of_birth || null,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) { setError(error.message); setLoading(false) }
    else setDone(true)
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <Image src="/logo.png" alt="Step Together" width={72} height={72} className="mx-auto rounded-full mb-4" />
          </Link>
          <h1 className="font-serif text-cream text-3xl font-light">Join the family</h1>
          <p className="text-cream/50 font-sans text-sm mt-2">Create your Step Together account — it's free.</p>
        </div>

        <div className="bg-navy rounded-lg border border-cream/10 p-8">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle className="text-rust" size={48} />
              <h3 className="font-serif text-cream text-2xl font-light">Check your email!</h3>
              <p className="text-cream/60 font-sans text-sm leading-relaxed">
                We sent a confirmation link to <strong className="text-cream">{form.email}</strong>. Click it to activate your account.
              </p>
              <Link href="/" className="text-rust text-sm font-sans font-medium hover:text-rust-light transition-colors mt-2">
                ← Back to site
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Full Name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
              </div>
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Email</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
              </div>
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'} required minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 pr-11 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Phone Number <span className="text-cream/30 font-normal">(optional)</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
              </div>
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Dance Experience</label>
                <select
                  value={form.dance_experience}
                  onChange={(e) => setForm({ ...form, dance_experience: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream font-sans text-sm focus:outline-none focus:border-rust transition-colors appearance-none"
                  style={{ color: form.dance_experience ? undefined : 'rgba(245,237,214,0.3)' }}
                >
                  <option value="" disabled>Select your level</option>
                  <option value="Never danced before">Never danced before</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Date of Birth <span className="text-cream/30 font-normal">(optional)</span></label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              {error && <p className="text-red-400 text-sm font-sans">{error}</p>}
              <p className="text-cream/40 font-sans text-xs leading-relaxed">
                By creating an account you agree to our Terms of Use and Privacy Policy.
              </p>
              <button
                type="submit" disabled={loading}
                className="w-full bg-rust text-white font-sans font-medium text-sm py-3.5 rounded-md hover:bg-rust-dark transition-colors duration-200 disabled:opacity-60 mt-1"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {!done && (
            <p className="text-center text-cream/50 font-sans text-sm mt-6">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-rust hover:text-rust-light transition-colors font-medium">Sign In</Link>
            </p>
          )}
        </div>
        <p className="text-center mt-6">
          <Link href="/" className="text-cream/30 font-sans text-xs hover:text-cream/60 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  )
}
