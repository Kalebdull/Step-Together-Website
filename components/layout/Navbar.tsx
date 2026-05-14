'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/ui/SocialIcons'
import { NavbarOrnamentLeft, NavbarOrnamentRight, NavbarSwoosh } from '@/components/ui/WesternAccents'

const navLinks = [
  { label: 'Classes', href: '/classes' },
  { label: 'Events', href: '/events' },
  { label: 'Online', href: '/online' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Apparel', href: '/apparel' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com/steptogetherdance', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com/steptogetherdance', label: 'Facebook' },
  { icon: YoutubeIcon, href: 'https://www.youtube.com/@CyndiDull', label: 'YouTube' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Always solid on non-home pages. On home: solid once scrolled, else very slight tint.
  const solid = scrolled || !isHome

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-navy-dark/96 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-navy-dark/20 backdrop-blur-sm'
        }`}
      >
        {/* Western scroll ornaments — visible on xl+ only */}
        <div className="absolute inset-y-0 left-3 hidden xl:flex items-center pointer-events-none">
          <NavbarOrnamentLeft opacity={solid ? 0.65 : 0.4} />
        </div>
        <div className="absolute inset-y-0 right-3 hidden xl:flex items-center pointer-events-none">
          <NavbarOrnamentRight opacity={solid ? 0.65 : 0.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/logo.png"
                  alt="Step Together Line Dance"
                  width={52}
                  height={52}
                  className="rounded-full"
                  priority
                />
              </motion.div>
              <div className="hidden sm:block">
                <p className="font-serif text-cream font-semibold text-lg leading-tight tracking-wide">
                  Step Together
                </p>
                <p className="text-cream/60 text-xs tracking-widest uppercase font-sans">
                  Line Dance
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/80 hover:text-cream text-sm font-sans tracking-wide transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rust transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Social Icons + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-cream/60 hover:text-rust transition-colors duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
              <div className="w-px h-5 bg-cream/20 mx-1" />
              <Link
                href="/auth/signin"
                className="text-sm text-cream/70 hover:text-cream transition-colors duration-200 font-sans"
              >
                Sign In
              </Link>
              <motion.a
                href="/auth/signup"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-rust text-white text-sm font-sans font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors duration-200"
              >
                Join Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-cream p-2"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Western swoosh line at bottom of navbar */}
        <NavbarSwoosh />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-y-0 right-0 w-80 bg-navy-dark z-40 flex flex-col px-8 pt-28 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-cream font-serif text-2xl font-light hover:text-rust transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <div className="flex gap-5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-cream/60 hover:text-rust transition-colors duration-200">
                    <Icon size={22} />
                  </a>
                ))}
              </div>
              <a href="/auth/signup" className="bg-rust text-white text-sm font-sans font-medium px-5 py-3 rounded-md text-center hover:bg-rust-dark transition-colors duration-200">
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
