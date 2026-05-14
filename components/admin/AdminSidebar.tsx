'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, CheckSquare, Music, Calendar, Mountain,
  ShoppingBag, Handshake, Users, CreditCard, Settings,
  MessageSquare, Mail, LogOut, Monitor
} from 'lucide-react'

const nav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Setup Checklist', href: '/admin/setup', icon: CheckSquare, badge: 'Start Here' },
  { divider: true, label: 'Content' },
  { label: 'Classes', href: '/admin/classes', icon: Music },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Workshops', href: '/admin/workshops', icon: Mountain },
  { label: 'Online Platform', href: '/admin/online', icon: Monitor },
  { label: 'Apparel', href: '/admin/apparel', icon: ShoppingBag },
  { label: 'Partnerships', href: '/admin/partnerships', icon: Handshake },
  { divider: true, label: 'People' },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Memberships', href: '/admin/memberships', icon: CreditCard },
  { label: 'Contact Inbox', href: '/admin/contact', icon: MessageSquare },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { divider: true, label: 'System' },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-navy-dark border-r border-cream/10 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-cream/10">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Step Together" width={38} height={38} className="rounded-full" />
          <div>
            <p className="font-serif text-cream text-base font-medium leading-tight">Step Together</p>
            <p className="text-rust text-xs font-sans tracking-wider uppercase">Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {nav.map((item, i) => {
          if ('divider' in item && item.divider) {
            return (
              <p key={i} className="text-cream/30 font-sans text-xs font-semibold tracking-widest uppercase px-3 pt-5 pb-2">
                {item.label}
              </p>
            )
          }
          const Icon = item.icon!
          const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href!)
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-all duration-200 mb-0.5 group ${
                active
                  ? 'bg-rust text-white'
                  : 'text-cream/60 hover:text-cream hover:bg-cream/5'
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && !active && (
                <span className="text-xs bg-rust/20 text-rust px-2 py-0.5 rounded-full font-semibold">{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-cream/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-cream/40 hover:text-cream text-sm font-sans transition-colors duration-200 mb-1">
          ← View Site
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-cream/40 hover:text-red-400 text-sm font-sans transition-colors duration-200">
            <LogOut size={15} /> Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
