import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { SwirlAccent } from '@/components/ui/WesternAccents'
import { Users, Heart, MapPin } from 'lucide-react'

const values = [
  { icon: Users, title: 'Community', desc: 'Every class, every event, every dance floor is a place to belong. No experience needed — just show up.' },
  { icon: Heart, title: 'Connection', desc: "We believe the best things in life happen when people move and grow together. That's the whole point." },
  { icon: MapPin, title: 'Presence', desc: 'From local studios to online stages — Step Together meets you where you are, wherever that may be.' },
]

export function MissionSection() {
  return (
    <section className="bg-navy-dark py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-6">
            Our Mission
          </p>
          <h2 className="font-serif text-cream font-light leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Line dance is the tool,
            <br />
            <em style={{ fontStyle: 'italic' }}>Connection is the purpose.</em>
          </h2>
          {/* Swirl accent under the heading */}
          <SwirlAccent className="my-6" color="#F05A1A" opacity={0.5} />
          <p className="text-cream/60 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
            Step Together was built on one idea — that line dance is one of the most powerful ways to bring people together across ages, backgrounds, and ethnicity. We're here to prove it, one step at a time.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" staggerDelay={0.12}>
          {values.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title} className="flex">
              <div className="group p-8 rounded-lg border-l-2 border-rust/30 hover:border-rust transition-all duration-300 bg-cream/[0.03] hover:bg-cream/[0.07] shadow-sm hover:shadow-lg hover:shadow-black/20 text-left flex flex-col w-full">
                <div className="w-10 h-10 rounded-full bg-rust/10 flex items-center justify-center mb-5 group-hover:bg-rust/20 transition-colors duration-300 flex-shrink-0">
                  <Icon className="text-rust" size={20} />
                </div>
                <h3 className="font-serif text-cream text-2xl font-medium mb-3">{title}</h3>
                <p className="text-cream/55 font-sans text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
