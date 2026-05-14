import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { Calendar, MapPin, Users, ArrowRight, Zap, Dumbbell, Heart, Star } from 'lucide-react'
import type { Event } from '@/types'

const typeData: Record<string, {
  label: string
  color: string
  glow: string
  badgeBg: string
  badgeText: string
  Icon: React.ElementType
}> = {
  themed_night: {
    label: 'Themed Night',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.18)',
    badgeBg: 'rgba(192,132,252,0.15)',
    badgeText: '#c084fc',
    Icon: Zap,
  },
  boot_camp: {
    label: 'Boot Camp',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.18)',
    badgeBg: 'rgba(251,146,60,0.15)',
    badgeText: '#fb923c',
    Icon: Dumbbell,
  },
  social: {
    label: 'Social',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    badgeBg: 'rgba(52,211,153,0.12)',
    badgeText: '#34d399',
    Icon: Heart,
  },
  special: {
    label: 'Special Event',
    color: '#F05A1A',
    glow: 'rgba(240,90,26,0.20)',
    badgeBg: 'rgba(240,90,26,0.15)',
    badgeText: '#F05A1A',
    Icon: Star,
  },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-CA', { weekday: 'short', month: 'long', day: 'numeric' })
}

const FALLBACK: Event[] = [
  { id: '1', title: 'Western Neon Night', description: 'Dust off your boots and glow up. Western neon dress code, live DJ, and all-night dancing.', event_type: 'themed_night', location: 'The Ranch Venue', address: null, event_date: '2026-06-07', end_date: null, price: 25, is_free: false, max_capacity: 80, image_url: null, is_published: true, created_at: '' },
  { id: '2', title: 'Spring Boot Camp', description: 'A full-day intensive for all levels. Learn 6 new routines and build your confidence on the floor.', event_type: 'boot_camp', location: 'Studio West', address: null, event_date: '2026-06-14', end_date: null, price: 45, is_free: false, max_capacity: 30, image_url: null, is_published: true, created_at: '' },
  { id: '3', title: 'Community Social Dance', description: 'Our monthly open social — come dance, meet new people, and feel the Step Together energy.', event_type: 'social', location: 'Community Hall A', address: null, event_date: '2026-06-21', end_date: null, price: 10, is_free: false, max_capacity: 100, image_url: null, is_published: true, created_at: '' },
  { id: '4', title: 'Canada Day Stomp', description: 'Celebrate Canada Day with a special themed dance night. Red & white, boots required.', event_type: 'special', location: 'The Ranch Venue', address: null, event_date: '2026-07-01', end_date: null, price: 30, is_free: false, max_capacity: 120, image_url: null, is_published: true, created_at: '' },
  { id: '5', title: 'Beginners Welcome Night', description: "Never danced before? Perfect. This night is designed for you — no experience needed, just show up.", event_type: 'social', location: 'Community Hall B', address: null, event_date: '2026-07-12', end_date: null, price: 0, is_free: true, max_capacity: 50, image_url: null, is_published: true, created_at: '' },
]

export default async function EventsPage() {
  let events: Event[] = FALLBACK

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true })
      if (data && data.length > 0) events = data as Event[]
    } catch {}
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="What's On"
          title="Events & Socials"
          subtitle="Themed nights, boot camps, and dance socials that bring the community alive."
          leftPhotos={[
            'https://images.unsplash.com/photo-1767299544235-42683fb8e09b?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=85',
          ]}
          rightPhotos={[
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=85',
          ]}
        />

        <section className="relative bg-cream-light py-20 px-6">
          {/* Left vine */}
          <div
            className="hidden xl:block absolute left-6 top-0 bottom-0 w-14 pointer-events-none"
            style={{ backgroundImage: "url('/side-vine.svg')", backgroundRepeat: 'repeat-y', backgroundSize: '56px 240px', backgroundPosition: 'center top' }}
          />
          {/* Right vine (mirrored) */}
          <div
            className="hidden xl:block absolute right-6 top-0 bottom-0 w-14 pointer-events-none"
            style={{ backgroundImage: "url('/side-vine.svg')", backgroundRepeat: 'repeat-y', backgroundSize: '56px 240px', backgroundPosition: 'center top', transform: 'scaleX(-1)' }}
          />
          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="flex flex-col gap-5" staggerDelay={0.08}>
              {events.map((evt) => {
                const d = new Date(evt.event_date ?? '')
                const type = typeData[evt.event_type ?? 'social'] ?? typeData.social
                const { Icon } = type

                return (
                  <StaggerItem key={evt.id}>
                    <div
                      className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-400"
                      style={{
                        background: 'linear-gradient(135deg, #0D1B2E 0%, #162236 100%)',
                        boxShadow: '0 6px 30px rgba(0,0,0,0.30)',
                        borderLeft: `4px solid ${type.color}`,
                      }}
                    >
                      {/* Ghost date watermark */}
                      <div className="absolute right-6 top-0 bottom-0 flex items-center pointer-events-none select-none">
                        <span
                          className="font-serif text-cream"
                          style={{ fontSize: '11rem', fontWeight: 300, lineHeight: 1, opacity: 0.04 }}
                        >
                          {d.getDate()}
                        </span>
                      </div>

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 85% 40%, ${type.glow}, transparent 60%)` }}
                      />

                      <div className="relative p-7 md:p-8">
                        {/* Top row: badge + price */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <span
                            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                            style={{
                              background: type.badgeBg,
                              color: type.badgeText,
                              borderColor: `${type.color}40`,
                            }}
                          >
                            <Icon size={11} />
                            {type.label}
                          </span>
                          <div className="text-right flex-shrink-0">
                            <p className="font-serif text-cream font-light leading-none" style={{ fontSize: '2.8rem' }}>
                              {evt.is_free ? 'Free' : `$${evt.price}`}
                            </p>
                            {!evt.is_free && (
                              <p className="text-cream/35 font-sans text-xs mt-1">per person</p>
                            )}
                          </div>
                        </div>

                        {/* Date + Title */}
                        <div className="flex items-start gap-6 mb-6">
                          <div className="flex-shrink-0 text-center" style={{ minWidth: '54px' }}>
                            <p
                              className="font-sans text-xs font-bold tracking-widest uppercase mb-0.5"
                              style={{ color: type.color }}
                            >
                              {d.toLocaleString('en-CA', { month: 'short' })}
                            </p>
                            <p
                              className="font-serif text-cream font-light leading-none"
                              style={{ fontSize: '3.5rem', lineHeight: 1 }}
                            >
                              {d.getDate()}
                            </p>
                            <p className="text-cream/30 font-sans text-xs mt-1 tracking-wider">
                              {d.getFullYear()}
                            </p>
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <h3 className="font-serif text-cream font-medium leading-tight group-hover:text-rust transition-colors duration-200 mb-2"
                                style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                              {evt.title}
                            </h3>
                            <p className="text-cream/55 font-sans text-sm leading-relaxed">{evt.description}</p>
                          </div>
                        </div>

                        {/* Info pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {[
                            { Icon: Calendar, text: formatDate(evt.event_date ?? '') },
                            { Icon: MapPin, text: evt.location ?? '' },
                            { Icon: Users, text: `${evt.max_capacity} spots` },
                          ].filter(p => p.text).map(({ Icon: PillIcon, text }) => (
                            <span
                              key={text}
                              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-cream/55 font-sans text-xs"
                              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                            >
                              <PillIcon size={11} style={{ color: type.color, flexShrink: 0 }} />
                              {text}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div
                          className="flex items-center justify-between pt-5"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <p className="text-cream/25 font-sans text-xs tracking-widest uppercase">Step Together</p>
                          <a
                            href="/auth/signup"
                            className="group/btn flex items-center gap-2.5 bg-rust text-white font-sans font-medium text-sm px-7 py-3.5 rounded-xl hover:bg-rust-dark transition-all duration-200 hover:gap-3.5"
                            style={{ boxShadow: '0 4px 20px rgba(240,90,26,0.30)' }}
                          >
                            Register Now
                            <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            <AnimatedSection delay={0.4} className="mt-14">
              <div className="bg-navy rounded-2xl px-8 py-12 text-center">
                <h3 className="font-serif text-cream text-2xl font-light mb-2">Want to host an event?</h3>
                <p className="text-cream/60 font-sans text-sm mb-6 max-w-md mx-auto">We partner with venues and organizations to bring Step Together events to new communities.</p>
                <a href="/partnerships" className="inline-flex items-center gap-2 border border-cream/30 text-cream font-sans text-sm font-medium px-7 py-3 rounded-xl hover:bg-cream/10 transition-all duration-200">
                  Explore Partnerships <ArrowRight size={14} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
