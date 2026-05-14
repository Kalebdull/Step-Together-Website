import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { MapPin, Star, Users, ArrowRight } from 'lucide-react'
import type { Class } from '@/types'

const levelData: Record<string, { accent: string; glow: string }> = {
  Beginner:     { accent: '#34d399', glow: 'rgba(52,211,153,0.15)' },
  Intermediate: { accent: '#60a5fa', glow: 'rgba(96,165,250,0.15)' },
  Advanced:     { accent: '#c084fc', glow: 'rgba(192,132,252,0.18)' },
  'All Levels': { accent: '#F05A1A', glow: 'rgba(240,90,26,0.20)' },
}

const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const FALLBACK: Class[] = [
  { id: '1', title: "Beginner Boot Scootin'", description: null, location: 'Community Hall A', address: null, day_of_week: 'Monday',    time: '6:30 PM', level: 'Beginner',     instructor: 'Cinnamon Leigh Dull', price: 15, is_free: false, max_capacity: 20, image_url: null, is_active: true, created_at: '' },
  { id: '2', title: 'Intermediate Groove',     description: null, location: 'Studio West',      address: null, day_of_week: 'Wednesday', time: '7:00 PM', level: 'Intermediate', instructor: 'Cinnamon Leigh Dull', price: 18, is_free: false, max_capacity: 20, image_url: null, is_active: true, created_at: '' },
  { id: '3', title: 'All Levels Open Floor',   description: null, location: 'Community Hall B', address: null, day_of_week: 'Friday',    time: '7:30 PM', level: 'All Levels',  instructor: 'Cinnamon Leigh Dull', price: 12, is_free: false, max_capacity: 25, image_url: null, is_active: true, created_at: '' },
  { id: '4', title: 'Advanced Footwork',       description: null, location: 'Dance Studio Main',address: null, day_of_week: 'Saturday',  time:'10:00 AM', level: 'Advanced',    instructor: 'Cinnamon Leigh Dull', price: 22, is_free: false, max_capacity: 15, image_url: null, is_active: true, created_at: '' },
  { id: '5', title: 'Country Heat Cardio',     description: null, location: 'Fitness Centre',   address: null, day_of_week: 'Tuesday',   time: '5:30 PM', level: 'All Levels',  instructor: 'Cinnamon Leigh Dull', price: 14, is_free: false, max_capacity: 25, image_url: null, is_active: true, created_at: '' },
  { id: '6', title: 'Saturday Social Dance',   description: null, location: 'The Ranch Venue',  address: null, day_of_week: 'Saturday',  time: '7:00 PM', level: 'All Levels',  instructor: 'Cinnamon Leigh Dull', price: 20, is_free: false, max_capacity: 30, image_url: null, is_active: true, created_at: '' },
]

export default async function ClassesPage() {
  let classes: Class[] = FALLBACK

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase.from('classes').select('*').eq('is_active', true)
      if (data && data.length > 0) {
        classes = (data as Class[]).sort((a, b) =>
          DAY_ORDER.indexOf(a.day_of_week ?? '') - DAY_ORDER.indexOf(b.day_of_week ?? '')
        )
      }
    } catch {}
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Weekly Schedule"
          title="In-Person Classes"
          subtitle="The heartbeat of everything we do — weekly classes across communities for every level."
        />

        <section className="bg-cream-light py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
              {classes.map((cls) => {
                const colors = levelData[cls.level] ?? levelData['All Levels']
                return (
                  <StaggerItem key={cls.id}>
                    <div
                      className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      style={{
                        background: 'linear-gradient(135deg, #0D1B2E 0%, #162236 100%)',
                        boxShadow: '0 6px 28px rgba(0,0,0,0.30)',
                        borderLeft: `4px solid ${colors.accent}`,
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 90% 30%, ${colors.glow}, transparent 65%)` }}
                      />

                      <div className="relative p-7 flex flex-col flex-1">
                        {/* Day + time header */}
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p
                              className="font-sans text-sm font-bold tracking-widest uppercase"
                              style={{ color: colors.accent }}
                            >
                              {cls.day_of_week}
                            </p>
                            <p className="text-cream/45 font-sans text-sm mt-0.5">{cls.time}</p>
                          </div>
                          <span
                            className="font-sans text-xs font-bold px-3 py-1.5 rounded-full"
                            style={{
                              background: `${colors.accent}18`,
                              color: colors.accent,
                              border: `1px solid ${colors.accent}35`,
                            }}
                          >
                            {cls.level}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-serif text-cream font-medium leading-snug group-hover:text-rust transition-colors duration-200 mb-4"
                          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}
                        >
                          {cls.title}
                        </h3>

                        {cls.description && (
                          <p className="text-cream/50 font-sans text-sm leading-relaxed mb-4">{cls.description}</p>
                        )}

                        {/* Info pills */}
                        <div className="flex flex-col gap-2 mb-6 flex-1">
                          {cls.location && (
                            <span className="flex items-center gap-2 text-cream/50 font-sans text-sm">
                              <MapPin size={13} style={{ color: colors.accent, flexShrink: 0 }} />
                              {cls.location}
                            </span>
                          )}
                          {cls.instructor && (
                            <span className="flex items-center gap-2 text-cream/50 font-sans text-sm">
                              <Star size={13} style={{ color: colors.accent, flexShrink: 0 }} />
                              {cls.instructor}
                            </span>
                          )}
                          {cls.max_capacity && (
                            <span className="flex items-center gap-2 text-cream/50 font-sans text-sm">
                              <Users size={13} style={{ color: colors.accent, flexShrink: 0 }} />
                              {cls.max_capacity} max capacity
                            </span>
                          )}
                        </div>

                        {/* Footer: price + CTA */}
                        <div
                          className="flex items-center justify-between pt-5"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <div>
                            <p className="font-serif text-cream font-light leading-none" style={{ fontSize: '2.2rem' }}>
                              {cls.is_free ? 'Free' : `$${cls.price}`}
                            </p>
                            {!cls.is_free && <p className="text-cream/30 font-sans text-xs mt-0.5">per class</p>}
                          </div>
                          <a
                            href="/auth/signup"
                            className="group/btn flex items-center gap-2 bg-rust text-white font-sans font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-rust-dark transition-all duration-200 hover:gap-3"
                            style={{ boxShadow: '0 4px 16px rgba(240,90,26,0.28)' }}
                          >
                            Register
                            <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            <AnimatedSection delay={0.3} className="mt-12">
              <div className="bg-navy-dark rounded-2xl px-8 py-12 text-center">
                <h3 className="font-serif text-cream text-2xl font-light mb-3">{"Can't find a time that works?"}</h3>
                <p className="text-cream/60 font-sans text-sm mb-6">Check out our online platform for classes on your schedule.</p>
                <a href="/online" className="bg-rust text-white font-sans font-medium text-sm px-7 py-3.5 rounded-xl hover:bg-rust-dark transition-colors duration-200 inline-block">
                  Explore Online Classes
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
