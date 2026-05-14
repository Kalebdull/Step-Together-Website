import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { PillarsSection } from '@/components/sections/PillarsSection'
import { FounderSection } from '@/components/sections/FounderSection'
import { CommunityCtaSection } from '@/components/sections/CommunityCtaSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { DoubleSwirlOrnament } from '@/components/ui/WesternAccents'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <PillarsSection />
        <FounderSection />
        {/* Single swirl accent between Founder and CTA */}
        <div className="bg-cream-light flex justify-center py-8">
          <DoubleSwirlOrnament color="#F05A1A" opacity={0.4} width={320} />
        </div>
        <CommunityCtaSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
