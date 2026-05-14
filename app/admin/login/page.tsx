'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Wrong password. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image src="/logo.png" alt="Step Together" width={72} height={72} className="mx-auto rounded-full mb-5 ring-2 ring-rust/30" />
          <h1 className="font-serif text-cream text-3xl font-light">Admin Access</h1>
          <p className="text-cream/40 font-sans text-sm mt-2">Step Together dashboard</p>
        </div>

        <div className="bg-navy rounded-lg border border-cream/10 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-cream/70 font-sans text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30">
                  <Lock size={15} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-11 py-3 rounded-md bg-navy-dark border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm font-sans">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rust text-white font-sans font-medium text-sm py-3.5 rounded-md hover:bg-rust-dark transition-colors duration-200 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-cream/30 font-sans text-xs hover:text-cream/60 transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  )
}
