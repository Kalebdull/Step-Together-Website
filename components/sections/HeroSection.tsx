'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { HeroSwoosh } from '@/components/ui/WesternAccents'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-start overflow-hidden">
      {/* Background image — anchored to top so the city shows */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cover.png"
          alt="Step Together Line Dance"
          fill
          className="object-cover brightness-110"
          style={{ objectPosition: '50% 0%' }}
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-navy-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/25 to-transparent" />
      </div>

      {/* Content — sits near top, below the navbar */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pt-20 sm:pt-24">
        {/* Logo — bigger and near the top */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/logo.png"
            alt="Step Together"
            width={240}
            height={240}
            className="rounded-full ring-2 ring-cream/30 shadow-2xl drop-shadow-[0_0_40px_rgba(240,90,26,0.4)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-serif text-cream"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.01em' }}
        >
          Connecting People
          <br />
          <em className="text-rust" style={{ fontStyle: 'italic' }}>Through Line Dance</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 text-cream/80 font-sans text-lg max-w-xl mx-auto leading-relaxed"
        >
          Line dance is why they come, relationships is why they stay.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="/classes"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-rust text-white font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-md hover:bg-rust-dark transition-colors duration-200 min-w-[160px]"
          >
            Find a Class
          </motion.a>
          <motion.a
            href="https://youtube.com/@steptogetherdance"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-transparent border border-cream/50 text-cream font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-md hover:border-cream transition-all duration-200 min-w-[160px]"
          >
            Watch Us Dance
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-cream/40" size={28} />
        </motion.div>
      </motion.div>

      {/* Western swoosh transition at bottom */}
      <HeroSwoosh />
    </section>
  )
}
