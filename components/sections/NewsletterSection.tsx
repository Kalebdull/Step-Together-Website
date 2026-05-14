'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FlowingSwirl } from '@/components/ui/WesternAccents'
import { Send, CheckCircle } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      if (!res.ok) throw new Error('Failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-navy-dark py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">Stay Connected</p>
          <h2 className="font-serif text-cream font-light mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Join the inner circle
          </h2>
          <FlowingSwirl className="mb-6" opacity={0.3} />
          <p className="text-cream/55 font-sans text-base mb-10 leading-relaxed">
            New classes, upcoming events, retreats, and community news — delivered straight to your inbox.
          </p>

          {done ? (
            <div className="flex flex-col items-center gap-3 text-cream">
              <CheckCircle className="text-rust" size={40} />
              <p className="font-serif text-2xl">You're in!</p>
              <p className="text-cream/60 font-sans text-sm">Welcome to the Step Together family.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-md bg-navy border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors duration-200"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3.5 rounded-md bg-navy border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-rust text-white font-sans font-medium text-sm px-6 py-3.5 rounded-md hover:bg-rust-dark transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Sending...' : <><Send size={15} /> Subscribe</>}
              </button>
            </form>
          )}
          {error && <p className="text-red-400 text-sm mt-3 font-sans">{error}</p>}
        </AnimatedSection>
      </div>
    </section>
  )
}
