export default async function AdminNewsletterPage() {
  let subscribers: any[] = []
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false })
    subscribers = data ?? []
  }

  const active = subscribers.filter(s => s.is_active).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Newsletter</h1>
        <p className="text-navy/50 font-sans text-sm mt-1">{active} active subscribers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Subscribers', value: subscribers?.length ?? 0 },
          { label: 'Active', value: active },
          { label: 'Unsubscribed', value: (subscribers?.length ?? 0) - active },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-cream-dark rounded-lg p-6 text-center">
            <p className="font-serif text-navy text-4xl font-light mb-1">{value}</p>
            <p className="text-navy/50 font-sans text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {!subscribers || subscribers.length === 0 ? (
          <div className="py-16 text-center"><p className="text-navy/40 font-sans text-sm">No subscribers yet.</p></div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>{['Name','Email','Status','Joined'].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {subscribers.map(s => (
                <tr key={s.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-3.5 font-sans text-sm text-navy">{s.name ?? '—'}</td>
                  <td className="px-5 py-3.5 font-sans text-sm text-navy/70">{s.email}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${s.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{s.is_active ? 'Active' : 'Unsubscribed'}</span></td>
                  <td className="px-5 py-3.5 font-sans text-sm text-navy/60">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
