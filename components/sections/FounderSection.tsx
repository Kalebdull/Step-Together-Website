import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ExternalLink } from 'lucide-react'

export function FounderSection() {
  return (
    <section className="bg-navy py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Logo / Visual Side */}
        <AnimatedSection direction="right" className="flex justify-center lg:justify-start">
          <div className="relative">
            <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-4 ring-rust/30 shadow-2xl shadow-navy-dark/60">
              <Image
                src="/logo.png"
                alt="Step Together Line Dance — Cinnamon Leigh Dull"
                fill
                className="object-cover scale-110"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-rust text-white px-5 py-3 rounded-lg shadow-lg">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase">5+ Years</p>
              <p className="font-serif text-lg font-medium leading-tight">Instructing</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Text Side */}
        <AnimatedSection direction="left" delay={0.1}>
          <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">
            Meet the Founder
          </p>
          <h2
            className="font-serif text-cream font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Cinnamon Leigh Dull
          </h2>
          <p className="text-cream/70 font-sans text-base leading-relaxed mb-4">
            Founder, lead instructor, and the heart behind Step Together. Cinnamon has been teaching line dance at all levels for over five years — building communities, breaking down barriers, and proving that anyone can find their rhythm.
          </p>
          <p className="text-cream/70 font-sans text-base leading-relaxed mb-8">
            Her mission has always been bigger than the steps. It's about the handshakes, the friendships, and the sense of family that forms when strangers move together for the first time.
          </p>

          {/* Copper Knob */}
          <a
            href="https://www.copperknob.co.uk/choreographer/3QCHXXH/cinnamon-dull"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-cream/20 hover:border-rust px-6 py-4 rounded-lg transition-all duration-200 hover:bg-cream/5"
          >
            <div>
              <p className="text-cream font-sans text-sm font-semibold group-hover:text-rust transition-colors duration-200">
                Copper Knob Choreographer
              </p>
              <p className="text-cream/50 text-xs font-sans mt-0.5">
                The world's leading line dance resource
              </p>
            </div>
            <ExternalLink size={16} className="text-cream/40 group-hover:text-rust transition-colors duration-200 ml-auto flex-shrink-0" />
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            {['All Levels', 'Community Builder', 'Choreographer', 'Line Dance Instructor'].map((tag) => (
              <span key={tag} className="text-xs font-sans text-cream/60 border border-cream/15 rounded-full px-4 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
