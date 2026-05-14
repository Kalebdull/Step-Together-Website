import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FlowingSwirl } from '@/components/ui/WesternAccents'
import { HeroPhotoPanel } from '@/components/ui/HeroPhotoPanel'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
  dark?: boolean
  leftPhotos?: string[]
  rightPhotos?: string[]
  pattern?: string   // path to pattern file in /public, e.g. '/diamond-pattern.svg'
  patternSize?: string
}

export function PageHero({
  label,
  title,
  subtitle,
  dark = true,
  leftPhotos,
  rightPhotos,
  pattern = '/diamond-pattern.svg',
  patternSize = '100px 100px',
}: PageHeroProps) {
  const bg = dark ? 'bg-navy-dark' : 'bg-navy'
  const hasPanels = !!(leftPhotos && rightPhotos)

  return (
    <section
      className={`relative ${bg} overflow-hidden`}
      style={{
        backgroundImage: `url('${pattern}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: patternSize,
      }}
    >
      <div
        className={`flex items-stretch ${hasPanels ? '' : 'justify-center'}`}
        style={{ minHeight: hasPanels ? '340px' : 'auto' }}
      >

        {hasPanels && (
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 relative">
            <HeroPhotoPanel photos={leftPhotos!} />
          </div>
        )}

        <div className={`${hasPanels ? 'flex-1' : 'w-full'} py-24 px-6 text-center relative z-10`}>
          <AnimatedSection>
            <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">
              {label}
            </p>
            <h1
              className="font-serif text-cream font-light mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {title}
            </h1>
            <FlowingSwirl className="my-5" opacity={0.35} />
            {subtitle && (
              <p className="text-cream/60 font-sans text-lg max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </AnimatedSection>
        </div>

        {hasPanels && (
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 relative">
            <HeroPhotoPanel photos={rightPhotos!} />
          </div>
        )}

      </div>
    </section>
  )
}
