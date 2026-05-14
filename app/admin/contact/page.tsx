export default async function AdminContactPage() {
  let submissions: any[] = []
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    submissions = data ?? []
    await supabase.from('contact_submissions').update({ is_read: true }).eq('is_read', false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Contact Inbox</h1>
        <p className="text-navy/50 font-sans text-sm mt-1">{submissions?.length ?? 0} messages total</p>
      </div>

      <div className="flex flex-col gap-4">
        {!submissions || submissions.length === 0 ? (
          <div className="bg-white rounded-lg border border-cream-dark py-16 text-center"><p className="text-navy/40 font-sans text-sm">No messages yet.</p></div>
        ) : submissions.map(s => (
          <div key={s.id} className="bg-white rounded-lg border border-cream-dark p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-sans text-sm font-semibold text-navy">{s.name}</p>
                <a href={`mailto:${s.email}`} className="text-rust text-xs font-sans hover:underline">{s.email}</a>
              </div>
              <div className="text-right flex-shrink-0">
                {s.subject && <p className="font-sans text-xs font-semibold text-navy/60 uppercase tracking-wide mb-1">{s.subject}</p>}
                <p className="text-navy/40 font-sans text-xs">{new Date(s.created_at).toLocaleDateString('en-CA', { month:'short', day:'numeric', year:'numeric' })}</p>
              </div>
            </div>
            <p className="text-navy/70 font-sans text-sm leading-relaxed bg-cream-light rounded-md p-4">{s.message}</p>
            <div className="mt-4 flex gap-3">
              <a href={`mailto:${s.email}?subject=Re: ${s.subject ?? 'Your message'}`} className="text-xs font-sans font-medium text-rust border border-rust/30 px-4 py-2 rounded-md hover:bg-rust hover:text-white transition-all duration-200">
                Reply via Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
