import { Users, Calendar, MessageSquare, Mail, TrendingUp, CheckSquare, DollarSign, ClipboardList } from 'lucide-react'

export default async function AdminDashboard() {
  let userCount = 0, eventCount = 0, contactCount = 0, subscriberCount = 0
  let registrationCount = 0
  let communityCount = 0, premiumCount = 0

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const [u, e, c, s, r, profiles] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('registrations').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('membership_tier'),
    ])
    userCount = u.count ?? 0
    eventCount = e.count ?? 0
    contactCount = c.count ?? 0
    subscriberCount = s.count ?? 0
    registrationCount = r.count ?? 0
    profiles.data?.forEach(p => {
      if (p.membership_tier === 'community') communityCount++
      if (p.membership_tier === 'premium') premiumCount++
    })
  }

  const monthlyRevenue = (communityCount * 19) + (premiumCount * 39)

  const stats = [
    { label: 'Total Members', value: userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Events', value: eventCount, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Unread Messages', value: contactCount, icon: MessageSquare, color: 'text-rust', bg: 'bg-rust/10' },
    { label: 'Newsletter Subscribers', value: subscriberCount, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  const quickActions = [
    { label: 'Setup Checklist', desc: 'Connect Supabase, Stripe, and go live', href: '/admin/setup', icon: CheckSquare, primary: true },
    { label: 'Add a Class', desc: 'Create a new in-person class', href: '/admin/classes', icon: TrendingUp, primary: false },
    { label: 'Create Event', desc: 'Add an upcoming event or social', href: '/admin/events', icon: Calendar, primary: false },
    { label: 'View Inbox', desc: `${contactCount} unread messages`, href: '/admin/contact', icon: MessageSquare, primary: false },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin Panel</p>
        <h1 className="font-serif text-navy text-4xl font-light">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-lg border border-cream-dark p-6">
            <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center mb-4`}>
              <Icon className={color} size={20} />
            </div>
            <p className="font-serif text-navy text-4xl font-light mb-1">{value}</p>
            <p className="text-navy/55 font-sans text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Tracker */}
      <div className="bg-navy-dark rounded-xl p-7 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign size={18} className="text-rust" />
          <h2 className="font-serif text-cream text-xl font-light">Revenue Tracker</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg px-6 py-5 border border-white/8">
            <p className="text-cream/40 font-sans text-xs uppercase tracking-widest mb-2">Est. Monthly Revenue</p>
            <p className="font-serif text-cream font-light" style={{ fontSize: '2.8rem', lineHeight: 1 }}>
              ${monthlyRevenue.toLocaleString()}
            </p>
            <p className="text-cream/30 font-sans text-xs mt-2">from active memberships</p>
          </div>
          <div className="bg-white/5 rounded-lg px-6 py-5 border border-white/8">
            <p className="text-cream/40 font-sans text-xs uppercase tracking-widest mb-3">By Plan</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-cream/60 font-sans text-sm">Community × {communityCount}</span>
                <span className="text-cream font-sans text-sm font-medium">${communityCount * 19}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/60 font-sans text-sm">Premium × {premiumCount}</span>
                <span className="text-cream font-sans text-sm font-medium">${premiumCount * 39}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/60 font-sans text-sm">Free × {userCount - communityCount - premiumCount}</span>
                <span className="text-cream/40 font-sans text-sm">$0/mo</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg px-6 py-5 border border-white/8">
            <p className="text-cream/40 font-sans text-xs uppercase tracking-widest mb-2">Total Registrations</p>
            <p className="font-serif text-cream font-light" style={{ fontSize: '2.8rem', lineHeight: 1 }}>
              {registrationCount}
            </p>
            <p className="text-cream/30 font-sans text-xs mt-2">events, classes & workshops</p>
            <a href="/admin/users" className="text-rust font-sans text-xs mt-3 inline-block hover:underline">View members →</a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="font-serif text-navy text-2xl font-medium mb-5">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {quickActions.map(({ label, desc, href, icon: Icon, primary }) => (
          <a
            key={label}
            href={href}
            className={`block p-6 rounded-lg border transition-all duration-200 hover:shadow-md group ${
              primary ? 'bg-rust border-rust text-white' : 'bg-white border-cream-dark hover:border-rust/30'
            }`}
          >
            <Icon size={22} className={`mb-3 ${primary ? 'text-white' : 'text-rust'}`} />
            <p className={`font-serif text-lg font-medium mb-1 ${primary ? 'text-white' : 'text-navy group-hover:text-rust transition-colors'}`}>{label}</p>
            <p className={`font-sans text-xs leading-relaxed ${primary ? 'text-white/70' : 'text-navy/50'}`}>{desc}</p>
          </a>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-navy rounded-lg p-6">
        <p className="font-serif text-cream text-xl font-light mb-2">First time here?</p>
        <p className="text-cream/60 font-sans text-sm leading-relaxed mb-4">
          Head to the <strong className="text-cream">Setup Checklist</strong> to connect Supabase, configure Stripe payments, set up email, and deploy your site — step by step, with plain-English instructions.
        </p>
        <a href="/admin/setup" className="inline-flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors duration-200">
          <CheckSquare size={15} /> Open Setup Checklist
        </a>
      </div>
    </div>
  )
}
