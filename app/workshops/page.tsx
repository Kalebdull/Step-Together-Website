import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { Calendar, MapPin, Users, ArrowRight, Check, Star } from 'lucide-react'
import type { Workshop } from '@/types'

const ACCENT_PALETTE = [
  { accent: '#fb923c', glow: 'rgba(251,146,60,0.18)' },
  { accent: '#34d399', glow: 'rgba(52,211,153,0.15)' },
  { accent: '#c084fc', glow: 'rgba(192,132,252,0.18)' },
]
const FEATURED_ACCENT = { accent: '#F05A1A', glow: 'rgba(240,90,26,0.22)' }

function formatDateRange(start: string | null, end: string | null) {
  if (!start) return ''
  const s = new Date(start)
  const e = end ? new Date(end) : s
  const sameDay = s.toDateString() === e.toDateString()
  if (sameDay) return s.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })
  return `${s.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })} – ${e.toLocaleDateString('en-CA', { day: 'numeric', year: 'numeric' })}`
}

const FALLBACK: Workshop[] = [
  { id: '1', title: 'Summer Dance Retreat', subtitle: '3-Day Immersive Experience', description: 'Three days of deep-dive line dance in the Canadian Rockies. Morning sessions, afternoon workshops, and evening socials surrounded by mountains. All levels welcome.', location: 'Banff, Alberta', start_date: '2026-08-14', end_date: '2026-08-16', price: 495, max_capacity: 20, highlights: ['6 new choreographies', 'All meals included', 'Evening social dances', 'Small group — max 20 dancers'], image_url: null, is_featured: true, is_published: true, created_at: '' },
  { id: '2', title: 'Weekend Boot Camp', subtitle: '2-Day Intensive', description: 'A focused weekend to level up your footwork, timing, and stage presence. Suitable for intermediate to advanced dancers.', location: 'Calgary, AB', start_date: '2026-09-19', end_date: '2026-09-20', price: 195, max_capacity: 30, highlights: ['Footwork mastery', 'Stage presence coaching', 'Video review sessions', 'Networking dinner'], image_url: null, is_featured: false, is_published: true, created_at: '' },
  { id: '3', title: "Beginner's Journey Workshop", subtitle: 'Half-Day Session', description: 'New to line dance? This half-day workshop is your perfect starting point. Walk away knowing 2 full routines and feeling confident on any dance floor.', location: 'Edmonton, AB', start_date: '2026-07-18', end_date: '2026-07-18', price: 65, max_capacity: 25, highlights: ['2 complete routines', 'No experience needed', 'Light refreshments', 'Take-home cheat sheets'], image_url: null, is_featured: false, is_published: true, created_at: '' },
]

export default async function WorkshopsPage() {
  let workshops: Workshop[] = FALLBACK

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('workshops')
        .select('*')
        .eq('is_published', true)
        .order('start_date', { ascending: true })
      if (data && data.length > 0) workshops = data as Workshop[]
    } catch {}
  }

  let nonFeaturedCount = 0

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Go Deeper"
          title="Workshops & Retreats"
          subtitle="Immersive experiences for dancers who want to grow, connect, and go deeper together."
          leftPhotos={[
            'https://images.unsplash.com/photo-1542665952-14513db15293?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1526568929-7cdd510e77fd?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1624763149686-1893acf73092?auto=format&fit=crop&w=600&q=85',
          ]}
          rightPhotos={[
            'https://images.unsplash.com/photo-1568530873454-e4103a0b3c71?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1549895058-36748fa6c6a7?auto=format&fit=crop&w=600&q=85',
            'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=85',
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
            <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
              {workshops.map((w) => {
                const colors = w.is_featured
                  ? FEATURED_ACCENT
                  : ACCENT_PALETTE[nonFeaturedCount++ % ACCENT_PALETTE.length]

                return (
                  <StaggerItem key={w.id}>
                    {w.is_featured ? (
                      /* ── FEATURED CARD ── */
                      <div
                        className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500"
                        style={{
                          background: 'linear-gradient(135deg, #0D1B2E 0%, #162236 100%)',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                          border: `1px solid ${colors.accent}40`,
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 70% 30%, ${colors.glow}, transparent 55%)` }}
                        />

                        {/* Hero header */}
                        <div className="relative px-8 pt-8 pb-6 overflow-hidden">
                          {/* Mountain silhouette SVG */}
                          <svg
                            viewBox="0 0 600 120"
                            className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
                            preserveAspectRatio="none"
                            style={{ opacity: 0.07 }}
                          >
                            <path d="M0,120 L90,45 L160,75 L260,15 L360,60 L440,28 L520,55 L600,20 L600,120 Z" fill="#F5EDD6" />
                            <path d="M0,120 L70,65 L130,90 L200,40 L300,80 L380,48 L460,72 L540,38 L600,55 L600,120 Z" fill="#F5EDD6" opacity="0.5" />
                          </svg>

                          <div className="relative flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Star size={14} className="text-rust fill-rust" />
                                <span className="font-sans text-rust text-xs font-bold tracking-widest uppercase">Featured Experience</span>
                              </div>
                              <h3 className="font-serif text-cream font-medium leading-tight mb-1 group-hover:text-rust transition-colors duration-200"
                                  style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
                                {w.title}
                              </h3>
                              <p className="text-cream/50 font-sans text-sm">{w.subtitle}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-cream/35 font-sans text-xs uppercase tracking-wider mb-1">From</p>
                              <p className="font-serif text-cream font-light leading-none" style={{ fontSize: '3.5rem' }}>
                                ${w.price}
                              </p>
                              <p className="text-cream/35 font-sans text-xs mt-1">per person</p>
                            </div>
                          </div>

                          {/* Info pills in header */}
                          <div className="relative flex flex-wrap gap-2 mt-5">
                            {[
                              { Icon: Calendar, text: formatDateRange(w.start_date, w.end_date) },
                              { Icon: MapPin, text: w.location ?? '' },
                              { Icon: Users, text: `Max ${w.max_capacity} dancers` },
                            ].filter(p => p.text).map(({ Icon, text }) => (
                              <span
                                key={text}
                                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-cream/55 font-sans text-xs"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                              >
                                <Icon size={11} className="text-rust flex-shrink-0" />
                                {text}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', background: `linear-gradient(to right, ${colors.accent}60, transparent)` }} />

                        {/* Body */}
                        <div className="px-8 py-6">
                          <p className="text-cream/55 font-sans text-sm leading-relaxed mb-6">{w.description}</p>

                          {/* Highlights */}
                          {w.highlights?.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mb-7">
                              {w.highlights.map((h) => (
                                <div key={h} className="flex items-center gap-2.5">
                                  <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${colors.accent}25`, border: `1px solid ${colors.accent}40` }}
                                  >
                                    <Check size={11} style={{ color: colors.accent }} />
                                  </div>
                                  <span className="text-cream/70 font-sans text-sm">{h}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <a
                            href="/auth/signup"
                            className="group/btn inline-flex items-center gap-2.5 bg-rust text-white font-sans font-medium text-sm px-8 py-4 rounded-xl hover:bg-rust-dark transition-all duration-200 hover:gap-3.5"
                            style={{ boxShadow: '0 4px 24px rgba(240,90,26,0.35)' }}
                          >
                            Reserve Your Spot
                            <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* ── NON-FEATURED CARD ── */
                      <div
                        className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-400"
                        style={{
                          background: 'linear-gradient(135deg, #0D1B2E 0%, #162236 100%)',
                          boxShadow: '0 6px 28px rgba(0,0,0,0.28)',
                          borderLeft: `4px solid ${colors.accent}`,
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 80% 40%, ${colors.glow}, transparent 60%)` }}
                        />

                        <div className="relative p-7 md:p-8">
                          {/* Top row */}
                          <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                              {w.subtitle && (
                                <span
                                  className="inline-block font-sans text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-3"
                                  style={{ background: `${colors.accent}20`, color: colors.accent, border: `1px solid ${colors.accent}35` }}
                                >
                                  {w.subtitle}
                                </span>
                              )}
                              <h3
                                className="font-serif text-cream font-medium leading-tight group-hover:text-rust transition-colors duration-200"
                                style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)' }}
                              >
                                {w.title}
                              </h3>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-serif text-cream font-light leading-none" style={{ fontSize: '2.6rem' }}>
                                ${w.price}
                              </p>
                              <p className="text-cream/35 font-sans text-xs mt-1">per person</p>
                            </div>
                          </div>

                          <p className="text-cream/55 font-sans text-sm leading-relaxed mb-5">{w.description}</p>

                          {/* Info pills */}
                          <div className="flex flex-wrap gap-2 mb-5">
                            {[
                              { Icon: Calendar, text: formatDateRange(w.start_date, w.end_date) },
                              { Icon: MapPin, text: w.location ?? '' },
                              { Icon: Users, text: `Max ${w.max_capacity} dancers` },
                            ].filter(p => p.text).map(({ Icon, text }) => (
                              <span
                                key={text}
                                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-cream/55 font-sans text-xs"
                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                              >
                                <Icon size={11} style={{ color: colors.accent, flexShrink: 0 }} />
                                {text}
                              </span>
                            ))}
                          </div>

                          {/* Highlights — compact chips */}
                          {w.highlights?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {w.highlights.map((h) => (
                                <span
                                  key={h}
                                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-cream/60 font-sans text-xs"
                                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                  <Check size={9} style={{ color: colors.accent, flexShrink: 0 }} />
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div
                            className="flex items-center justify-end pt-5"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            <a
                              href="/auth/signup"
                              className="group/btn flex items-center gap-2.5 bg-rust text-white font-sans font-medium text-sm px-7 py-3.5 rounded-xl hover:bg-rust-dark transition-all duration-200 hover:gap-3.5"
                              style={{ boxShadow: '0 4px 18px rgba(240,90,26,0.28)' }}
                            >
                              Reserve Your Spot
                              <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            <AnimatedSection delay={0.4} className="mt-14">
              <div className="bg-navy-dark rounded-2xl px-8 py-12 text-center">
                <h3 className="font-serif text-cream text-2xl font-light mb-2">Want a custom workshop?</h3>
                <p className="text-cream/60 font-sans text-sm mb-6 max-w-md mx-auto">
                  Cinnamon works with groups, studios, and organizations to create tailored workshops.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 border border-cream/30 text-cream font-sans font-medium text-sm px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-all duration-200">
                  Get in Touch <ArrowRight size={14} />
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
