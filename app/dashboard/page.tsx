export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Calendar, Music, Monitor, LogOut } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/signin')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: registrations } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Dancer'

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-cream-light">
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <AnimatedSection>
              <p className="font-sans text-rust text-xs font-semibold tracking-widest uppercase mb-2">My Account</p>
              <h1 className="font-serif text-cream text-4xl font-light">Hey, {firstName}.</h1>
              <p className="text-cream/50 font-sans text-sm mt-1">{user.email}</p>
            </AnimatedSection>
            <form action="/api/auth/signout" method="POST">
              <button className="flex items-center gap-2 border border-cream/20 text-cream/60 hover:text-cream hover:border-cream text-sm font-sans px-5 py-2.5 rounded-md transition-all duration-200">
                <LogOut size={15} /> Sign Out
              </button>
            </form>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Membership Card */}
            <AnimatedSection className="mb-8">
              <div className="bg-navy rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-cream/50 font-sans text-xs uppercase tracking-widest mb-1">Membership</p>
                  <p className="font-serif text-cream text-2xl font-medium capitalize">{profile?.membership_tier ?? 'Free'} Plan</p>
                </div>
                {profile?.membership_tier === 'free' && (
                  <a href="/online" className="bg-rust text-white font-sans text-sm font-medium px-6 py-3 rounded-md hover:bg-rust-dark transition-colors duration-200">
                    Upgrade Plan
                  </a>
                )}
              </div>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection className="mb-8">
              <h2 className="font-serif text-navy text-2xl font-medium mb-5">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Music, label: 'Browse Classes', href: '/classes', desc: 'Find your next in-person class' },
                  { icon: Calendar, label: 'Upcoming Events', href: '/events', desc: 'See what\'s happening soon' },
                  { icon: Monitor, label: 'Online Platform', href: '/online', desc: 'Stream classes anytime' },
                ].map(({ icon: Icon, label, href, desc }) => (
                  <a key={label} href={href} className="bg-white border border-cream-dark rounded-lg p-6 hover:border-rust/30 hover:shadow-md transition-all duration-200 group">
                    <Icon className="text-rust mb-3" size={22} />
                    <p className="font-serif text-navy text-lg font-medium group-hover:text-rust transition-colors duration-200">{label}</p>
                    <p className="text-navy/55 font-sans text-xs mt-1">{desc}</p>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Registrations */}
            <AnimatedSection>
              <h2 className="font-serif text-navy text-2xl font-medium mb-5">My Registrations</h2>
              <div className="bg-white border border-cream-dark rounded-lg overflow-hidden">
                {!registrations || registrations.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-navy/40 font-sans text-sm">No registrations yet.</p>
                    <a href="/classes" className="text-rust text-sm font-sans font-medium mt-2 inline-block hover:underline">
                      Browse classes →
                    </a>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-cream-dark">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-dark">
                      {registrations.map((reg) => (
                        <tr key={reg.id}>
                          <td className="px-6 py-4 font-sans text-sm text-navy capitalize">{reg.entity_type}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${reg.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-sans text-sm text-navy/60">
                            {new Date(reg.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
