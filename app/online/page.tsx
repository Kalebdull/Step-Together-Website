import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { Check, Play, Monitor, Video } from 'lucide-react'
import type { Membership } from '@/types'

const FALLBACK_PLANS: Membership[] = [
  { id: '1', name: 'Free', price: 0, interval: 'month', description: 'Get a taste of the community.', features: ['Access to 3 free tutorial videos', 'Community newsletter', 'Event announcements', 'Basic class schedule'], stripe_price_id: null, is_active: true, created_at: '' },
  { id: '2', name: 'Community', price: 19, interval: 'month', description: 'For the regular dancer who wants more.', features: ['Unlimited on-demand videos', 'Live virtual classes (2/week)', 'Member-only event discounts', 'Community chat access', 'Monthly new routine drop'], stripe_price_id: null, is_active: true, created_at: '' },
  { id: '3', name: 'Premium', price: 39, interval: 'month', description: 'Everything — for the dedicated dancer.', features: ['Everything in Community', 'Unlimited live virtual classes', '1-on-1 monthly check-in with Cinnamon', 'Early access to workshops & retreats', 'Exclusive choreography notes', 'Priority event registration'], stripe_price_id: null, is_active: true, created_at: '' },
]

export default async function OnlinePage() {
  let plans: Membership[] = FALLBACK_PLANS

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase.from('memberships').select('*').eq('is_active', true).order('price')
      if (data && data.length > 0) plans = data as Membership[]
    } catch {}
  }

  const highlightIndex = plans.findIndex(p => p.name === 'Community') !== -1
    ? plans.findIndex(p => p.name === 'Community')
    : Math.floor(plans.length / 2)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Dance Anywhere"
          title="Online Platform"
          subtitle="Memberships, on-demand videos, and virtual classes for dancers everywhere — at your pace, on your schedule."
        />

        {/* Feature highlights */}
        <section className="bg-cream-dark py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Play, title: 'On-Demand Library', desc: 'Access routines, tutorials, and full class recordings anytime. Your pace, your schedule.' },
              { icon: Video, title: 'Live Virtual Classes', desc: 'Join live sessions with Cinnamon from anywhere in the world — real energy, real connection.' },
              { icon: Monitor, title: 'Any Device', desc: 'Phone, tablet, TV, or laptop — dance wherever feels right. No downloads, no hassle.' },
            ].map(({ icon: Icon, title, desc }) => (
              <AnimatedSection key={title} className="text-center">
                <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-rust" size={24} />
                </div>
                <h3 className="font-serif text-navy text-xl font-medium mb-2">{title}</h3>
                <p className="text-navy/60 font-sans text-sm leading-relaxed">{desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-cream-light py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-14">
              <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">Membership Plans</p>
              <h2 className="font-serif text-navy font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Choose Your Level</h2>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {plans.map((plan, i) => {
                const isHighlight = i === highlightIndex
                return (
                  <StaggerItem key={plan.id} className="flex">
                    <div className={`relative rounded-lg border w-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-navy/10 ${isHighlight ? 'border-rust shadow-lg shadow-rust/10' : 'border-cream-dark bg-white'}`}>
                      {isHighlight && (
                        <div className="bg-rust text-white text-center py-2 text-xs font-sans font-semibold tracking-widest uppercase">
                          Most Popular
                        </div>
                      )}
                      <div className={`p-8 flex flex-col flex-1 ${isHighlight ? 'bg-navy text-cream' : ''}`}>
                        <p className={`font-sans text-xs font-semibold tracking-widest uppercase mb-3 ${isHighlight ? 'text-rust' : 'text-navy/50'}`}>{plan.name}</p>
                        <div className="flex items-end gap-1 mb-2">
                          <span className={`font-serif font-light text-5xl ${isHighlight ? 'text-cream' : 'text-navy'}`}>
                            {plan.price === 0 ? 'Free' : `$${plan.price}`}
                          </span>
                          {plan.price > 0 && <span className={`font-sans text-sm mb-2 ${isHighlight ? 'text-cream/50' : 'text-navy/40'}`}>/{plan.interval}</span>}
                        </div>
                        <p className={`font-sans text-sm mb-6 ${isHighlight ? 'text-cream/60' : 'text-navy/55'}`}>{plan.description}</p>
                        <ul className="flex flex-col gap-3 mb-8 flex-1">
                          {plan.features.map((f) => (
                            <li key={f} className={`flex items-start gap-3 font-sans text-sm ${isHighlight ? 'text-cream/80' : 'text-navy/70'}`}>
                              <Check size={15} className="text-rust flex-shrink-0 mt-0.5" /> {f}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={plan.price === 0 ? '/auth/signup' : `/auth/signup?plan=${plan.name.toLowerCase()}`}
                          className={`text-center font-sans font-medium text-sm py-3.5 rounded-md transition-colors duration-200 ${isHighlight ? 'bg-rust text-white hover:bg-rust-dark' : 'border border-navy/20 text-navy hover:bg-navy hover:text-cream'}`}
                        >
                          {plan.price === 0 ? 'Get Started Free' : `Join ${plan.name}`}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
