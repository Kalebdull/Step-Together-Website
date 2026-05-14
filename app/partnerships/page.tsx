import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { Handshake, MapPin, Music, Building2, ArrowRight, Check } from 'lucide-react'

const partnerTypes = [
  { icon: MapPin, title: 'Venues', desc: 'Dance studios, community halls, event spaces, and restaurants looking to host line dance nights and socials.' },
  { icon: Building2, title: 'Organizations', desc: 'Community groups, cultural orgs, and non-profits aligned with our mission of bringing people together.' },
  { icon: Music, title: 'Brands', desc: 'Western wear, footwear, lifestyle brands, and businesses who want to reach an engaged dance community.' },
]

const benefits = [
  'Co-branded event promotion across all social channels',
  'Featured placement on the Step Together website',
  'Exclusive access to our engaged community of dancers',
  'Co-hosted events and collaborative programming',
  'Newsletter features and community spotlights',
  'Alignment with a mission-driven, growing brand',
]

export default function PartnershipsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Grow Together"
          title="Community Partnerships"
          subtitle="Collaborations with local venues, organizations, and brands who share our mission of connecting people through dance."
        />

        <section className="bg-cream py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-serif text-navy font-light" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>Who We Partner With</h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {partnerTypes.map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title} className="flex">
                  <div className="bg-white rounded-lg border border-cream-dark p-8 hover:border-rust/30 hover:shadow-lg transition-all duration-300 flex flex-col w-full">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mb-5 flex-shrink-0">
                      <Icon className="text-rust" size={22} />
                    </div>
                    <h3 className="font-serif text-navy text-2xl font-medium mb-3">{title}</h3>
                    <p className="text-navy/60 font-sans text-sm leading-relaxed flex-1">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="bg-navy-dark py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">What You Get</p>
              <h2 className="font-serif text-cream font-light mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Partnership Benefits
              </h2>
              <p className="text-cream/60 font-sans text-base leading-relaxed">
                A Step Together partnership means more than a logo on a page — it means being woven into a living, breathing community of passionate people.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.1}>
              <ul className="flex flex-col gap-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-cream/75 font-sans text-sm leading-relaxed">
                    <Check size={16} className="text-rust flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-cream-light py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <Handshake className="text-rust mx-auto mb-6" size={40} />
              <h2 className="font-serif text-navy font-light mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Ready to step together?
              </h2>
              <p className="text-navy/60 font-sans text-base leading-relaxed mb-8">
                Reach out and let's explore what's possible. Every great partnership starts with a conversation.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-rust text-white font-sans font-medium text-sm px-8 py-4 rounded-md hover:bg-rust-dark transition-colors duration-200">
                Start the Conversation <ArrowRight size={16} />
              </a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
