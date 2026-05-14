'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/ui/SocialIcons'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Get in Touch"
          title="Let's Connect"
          subtitle="Questions, partnership inquiries, class bookings, or just want to say hey — we'd love to hear from you."
        />

        <section className="bg-cream-light py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-cream-dark p-8">
                {done ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle className="text-rust" size={48} />
                    <h3 className="font-serif text-navy text-3xl font-light">Message sent!</h3>
                    <p className="text-navy/60 font-sans text-base">We'll get back to you within 24–48 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 className="font-serif text-navy text-2xl font-medium mb-2">Send a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-navy/70 font-sans block mb-1.5">Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition-colors" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-navy/70 font-sans block mb-1.5">Email</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy/70 font-sans block mb-1.5">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition-colors">
                        <option value="">Select a subject...</option>
                        <option>General Inquiry</option>
                        <option>Class Information</option>
                        <option>Event Booking</option>
                        <option>Partnership Inquiry</option>
                        <option>Online Platform</option>
                        <option>Apparel</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy/70 font-sans block mb-1.5">Message</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what's on your mind..." className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition-colors resize-none" />
                    </div>
                    {error && <p className="text-red-500 text-sm font-sans">{error}</p>}
                    <button type="submit" disabled={loading} className="bg-rust text-white font-sans font-medium text-sm px-8 py-4 rounded-md hover:bg-rust-dark transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1} className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h3 className="font-serif text-navy text-2xl font-medium mb-5">Direct Contact</h3>
                <a href="mailto:hello@steptogetherdance.com" className="flex items-center gap-3 text-navy/70 hover:text-rust transition-colors duration-200 font-sans text-sm">
                  <Mail size={18} className="text-rust flex-shrink-0" />
                  hello@steptogetherdance.com
                </a>
              </div>

              <div>
                <h3 className="font-serif text-navy text-2xl font-medium mb-5">Follow Along</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/steptogetherdance', handle: '@steptogetherdance' },
                    { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com/steptogetherdance', handle: 'Step Together Line Dance' },
                    { icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com/@steptogetherdance', handle: '@steptogetherdance' },
                  ].map(({ icon: Icon, label, href, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-navy/70 hover:text-rust transition-colors duration-200 group">
                      <div className="w-9 h-9 rounded-full border border-cream-dark group-hover:border-rust group-hover:bg-rust/5 flex items-center justify-center transition-all duration-200">
                        <Icon size={16} className="text-navy/60 group-hover:text-rust transition-colors duration-200" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-navy group-hover:text-rust transition-colors duration-200">{label}</p>
                        <p className="font-sans text-xs text-navy/50">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-navy rounded-lg p-6">
                <p className="font-serif text-cream text-xl font-light mb-2">Response Time</p>
                <p className="text-cream/60 font-sans text-sm leading-relaxed">
                  We typically respond within <strong className="text-cream">24–48 hours</strong>. For urgent matters, reach out via Instagram DM.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
