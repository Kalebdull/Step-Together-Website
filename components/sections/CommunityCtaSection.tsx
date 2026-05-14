import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { InfinityOrnament } from '@/components/ui/WesternAccents'

export function CommunityCtaSection() {
  return (
    <section className="bg-rust py-28 px-6 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <InfinityOrnament className="mb-8" color="#ffffff" opacity={0.25} width={180} />
          <p className="font-sans text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
            Ready to Step Together?
          </p>
          <h2
            className="font-serif text-white font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Find your rhythm.
            <br />
            Find your people.
          </h2>
          <p className="text-white/75 font-sans text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Whether you've never danced a day in your life or you've been on the floor for years — there's a place for you here. Join the family.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signup"
              className="bg-white text-rust font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-md hover:bg-cream transition-colors duration-200 min-w-[160px]"
            >
              Join the Community
            </a>
            <a
              href="/classes"
              className="border border-white/50 text-white font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-md hover:border-white hover:bg-white/10 transition-all duration-200 min-w-[160px]"
            >
              Browse Classes
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
