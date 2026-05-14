'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { ShoppingBag, Bell } from 'lucide-react'
import {
  TeeIllustration,
  HoodieIllustration,
  CapIllustration,
  BandanaIllustration,
  BootBagIllustration,
  VestIllustration,
} from '@/components/ui/ApparelIllustrations'
import type React from 'react'

const products: { id: number; name: string; category: string; illustration: React.FC }[] = [
  { id: 1, name: 'Step Together Tee', category: 'Tops', illustration: TeeIllustration },
  { id: 2, name: 'Signature Hoodie', category: 'Tops', illustration: HoodieIllustration },
  { id: 3, name: 'Branded Cap', category: 'Accessories', illustration: CapIllustration },
  { id: 4, name: 'Dance Bandana', category: 'Accessories', illustration: BandanaIllustration },
  { id: 5, name: 'Boot Bag', category: 'Gear', illustration: BootBagIllustration },
  { id: 6, name: 'Community Vest', category: 'Tops', illustration: VestIllustration },
]

export default function ApparelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PageHero
          label="Wear Your Story"
          title="Apparel"
          subtitle="Branded gear that lets community members wear their belonging with pride."
        />

        <section className="bg-cream-light py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-rust/10 border border-rust/20 text-rust text-sm font-sans font-medium px-5 py-2.5 rounded-full">
                <Bell size={14} />
                Collection launching soon — notify me when it drops
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {products.map((product) => {
                const Illustration = product.illustration
                return (
                <StaggerItem key={product.id}>
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + product.id * 0.4,
                      ease: 'easeInOut',
                      delay: product.id * 0.2,
                    }}
                    className="bg-white rounded-lg border border-cream-dark overflow-hidden group cursor-default"
                  >
                    <div className="bg-gradient-to-br from-navy-dark to-navy h-52 flex items-center justify-center relative">
                      <Illustration />
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        className="absolute top-4 right-4 bg-rust text-white text-xs font-sans font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-lg"
                      >
                        Coming Soon
                      </motion.div>
                    </div>
                    <div className="p-5">
                      <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">{product.category}</p>
                      <h3 className="font-serif text-navy text-xl font-medium mb-3">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-navy/40 font-sans text-sm italic">Price TBA</p>
                        <button className="flex items-center gap-2 border border-navy/20 text-navy/60 text-xs font-sans font-medium px-4 py-2 rounded-md hover:border-rust hover:text-rust transition-all duration-200">
                          <Bell size={12} /> Notify Me
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
                )
              })}
            </StaggerContainer>

            <AnimatedSection delay={0.4} className="mt-16">
              <div className="bg-navy-dark rounded-lg px-8 py-14 text-center">
                <ShoppingBag className="text-rust mx-auto mb-4" size={36} />
                <h3 className="font-serif text-cream text-3xl font-light mb-3">Be the first to shop</h3>
                <p className="text-cream/60 font-sans text-base mb-8 max-w-md mx-auto">
                  Drop your email and we'll notify you the moment the collection launches.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-md bg-navy border border-cream/15 text-cream placeholder-cream/30 font-sans text-sm focus:outline-none focus:border-rust transition-colors duration-200"
                  />
                  <button type="submit" className="bg-rust text-white font-sans font-medium text-sm px-6 py-3 rounded-md hover:bg-rust-dark transition-colors duration-200 whitespace-nowrap">
                    Notify Me
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
