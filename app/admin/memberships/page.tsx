export default async function AdminMembershipsPage() {
  let memberships: any[] = []
  const tiers = { free: 0, community: 0, premium: 0 }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: m } = await supabase.from('memberships').select('*').order('price')
    const { data: profiles } = await supabase.from('profiles').select('membership_tier')
    memberships = m ?? []
    profiles?.forEach(u => {
      if (u.membership_tier in tiers) tiers[u.membership_tier as keyof typeof tiers]++
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Memberships</h1>
      </div>

      {/* Tier breakdown */}
      <div className="grid grid-cols-3 gap-5 mb-10">
        {Object.entries(tiers).map(([tier, count]) => (
          <div key={tier} className="bg-white border border-cream-dark rounded-lg p-6 text-center">
            <p className="font-serif text-navy text-4xl font-light mb-1">{count}</p>
            <p className="text-navy/50 font-sans text-sm capitalize">{tier} members</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-navy text-2xl font-medium mb-5">Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {memberships && memberships.length > 0 ? memberships.map(m => (
          <div key={m.id} className="bg-white border border-cream-dark rounded-lg p-6">
            <p className="font-sans text-xs font-semibold tracking-widest uppercase text-rust mb-2">{m.name}</p>
            <p className="font-serif text-navy text-4xl font-light mb-1">${m.price}<span className="text-navy/40 font-sans text-sm">/{m.interval}</span></p>
            <p className="text-navy/55 font-sans text-sm mb-4">{m.description}</p>
            {m.stripe_price_id && <p className="font-mono text-xs text-navy/40 bg-cream px-3 py-1.5 rounded">{m.stripe_price_id}</p>}
          </div>
        )) : (
          <div className="col-span-3 bg-white border border-cream-dark rounded-lg py-12 text-center">
            <p className="text-navy/40 font-sans text-sm mb-2">No membership plans in database yet.</p>
            <p className="text-navy/40 font-sans text-xs">Run the seed migration to add default plans.</p>
          </div>
        )}
      </div>

      <div className="bg-navy rounded-lg p-6">
        <p className="text-cream font-sans text-sm font-semibold mb-1">Stripe Integration</p>
        <p className="text-cream/60 font-sans text-xs leading-relaxed">
          Membership pricing is managed in Stripe. To update prices, change them in your Stripe dashboard and update the STRIPE_*_PRICE_ID environment variables.
        </p>
      </div>
    </div>
  )
}
