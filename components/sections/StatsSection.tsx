import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 5, suffix: '+', label: 'Years Teaching', desc: 'Building community through dance' },
  { value: 100, suffix: '+', label: 'Dances Choreographed', desc: 'Original routines for every level' },
  { value: 50, suffix: '+', label: 'Classes Taught', desc: 'Across multiple communities' },
  { value: 4, suffix: '', label: 'Skill Levels', desc: 'Beginner to advanced — all welcome' },
]

export function StatsSection() {
  return (
    <section className="bg-cream-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, label, desc }, i) => (
            <AnimatedSection key={label} delay={i * 0.1} className="text-center">
              <p className="font-serif text-rust font-semibold mb-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                <AnimatedCounter value={value} suffix={suffix} />
              </p>
              <p className="font-serif text-navy text-xl font-medium mb-1">{label}</p>
              <p className="font-sans text-navy/55 text-sm">{desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
