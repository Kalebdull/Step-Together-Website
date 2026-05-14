'use client'

import React from 'react'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { SwirlAccent } from '@/components/ui/WesternAccents'
import {
  ClassesIllustration,
  EventsIllustration,
  OnlineIllustration,
  ApparelIllustration,
  WorkshopsIllustration,
  PartnershipsIllustration,
} from '@/components/ui/PillarIllustrations'
import { Music, Calendar, Monitor, ShoppingBag, Mountain, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const pillars: {
  icon: LucideIcon
  illustration: React.FC
  title: string
  desc: string
  href: string
  cta: string
}[] = [
  {
    icon: Music,
    illustration: ClassesIllustration,
    title: 'In-Person Classes',
    desc: 'Weekly classes across communities — the heartbeat of everything we do.',
    href: '/classes',
    cta: 'Find a Class',
  },
  {
    icon: Calendar,
    illustration: EventsIllustration,
    title: 'Events & Socials',
    desc: 'Themed nights, boot camps, and dance socials that bring the community alive.',
    href: '/events',
    cta: 'See Events',
  },
  {
    icon: Monitor,
    illustration: OnlineIllustration,
    title: 'Online Platform',
    desc: 'Memberships, on-demand videos, and virtual classes for dancers everywhere.',
    href: '/online',
    cta: 'Explore Online',
  },
  {
    icon: ShoppingBag,
    illustration: ApparelIllustration,
    title: 'Apparel',
    desc: 'Branded gear that lets community members wear their belonging with pride.',
    href: '/apparel',
    cta: 'Shop Gear',
  },
  {
    icon: Mountain,
    illustration: WorkshopsIllustration,
    title: 'Workshops & Retreats',
    desc: 'Immersive experiences for dancers who want to go deeper together.',
    href: '/workshops',
    cta: 'View Workshops',
  },
  {
    icon: Handshake,
    illustration: PartnershipsIllustration,
    title: 'Community Partnerships',
    desc: 'Collaborations with local venues, orgs, and brands who share our mission.',
    href: '/partnerships',
    cta: 'Partner With Us',
  },
]

export function PillarsSection() {
  return (
    <section className="bg-cream py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-4">
            Everything We Do
          </p>
          <h2
            className="font-serif text-navy font-light"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Six Ways We Step Together
          </h2>
          <SwirlAccent className="mt-6" color="#C0420A" opacity={0.35} />
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {pillars.map(({ icon: Icon, illustration: Illustration, title, desc, href, cta }) => (
            <StaggerItem key={title}>
              <Link
                href={href}
                className="group block p-8 bg-white rounded-lg border border-cream-dark hover:border-rust/30 hover:shadow-xl hover:shadow-navy/8 transition-all duration-350 h-full"
              >
                {/* Animated illustration */}
                <div className="flex items-center justify-center h-20 mb-4 rounded-md bg-cream/60 overflow-hidden">
                  <Illustration />
                </div>

                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-6 group-hover:bg-rust group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-navy group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <h3 className="font-serif text-navy text-2xl font-medium mb-3 group-hover:text-rust transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-navy/60 font-sans text-sm leading-relaxed mb-6">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-rust text-sm font-sans font-medium group-hover:gap-3 transition-all duration-200">
                  {cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
