'use client'

import Image from 'next/image'
import Link from 'next/link'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/ui/SocialIcons'

const links = {
  Explore: [
    { label: 'Classes', href: '/classes' },
    { label: 'Events', href: '/events' },
    { label: 'Online Platform', href: '/online' },
    { label: 'Workshops', href: '/workshops' },
    { label: 'Apparel', href: '/apparel' },
  ],
  Connect: [
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sign In', href: '/auth/signin' },
    { label: 'Join Now', href: '/auth/signup' },
  ],
}

const social = [
  { icon: InstagramIcon, href: 'https://instagram.com/steptogetherdance', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com/steptogetherdance', label: 'Facebook' },
  { icon: YoutubeIcon, href: 'https://www.youtube.com/@CyndiDull', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-navy-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image src="/logo.png" alt="Step Together" width={56} height={56} className="rounded-full" />
              <div>
                <p className="font-serif text-cream font-semibold text-xl leading-tight">Step Together</p>
                <p className="text-cream/50 text-xs tracking-widest uppercase font-sans">Line Dance</p>
              </div>
            </Link>
            <p className="font-serif text-cream/80 text-lg font-light italic leading-relaxed mb-6 max-w-xs">
              Connecting People Through Line Dance.
            </p>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              More than a class. A movement. A family. Join communities across cities and screens who share one mission — to step together.
            </p>
            <div className="flex items-center gap-5">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-rust hover:border-rust transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-cream font-sans text-xs font-semibold tracking-widest uppercase mb-5">{title}</p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm hover:text-cream transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Step Together Line Dance. Founded by Cinnamon Leigh Dull. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-xs text-cream/40 hover:text-cream/70 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-cream/40 hover:text-cream/70 transition-colors duration-200">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
