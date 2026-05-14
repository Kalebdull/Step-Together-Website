export default async function AdminUsersPage() {
  let users: any[] = []
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    users = data ?? []
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Users</h1>
        <p className="text-navy/50 font-sans text-sm mt-1">{users?.length ?? 0} members total</p>
      </div>

      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {!users || users.length === 0 ? (
          <div className="py-16 text-center"><p className="text-navy/40 font-sans text-sm">No users yet — they'll appear here once people sign up.</p></div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>{['Name','Email','Role','Membership','Joined',''].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-navy">{u.full_name ?? '—'}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${u.role === 'admin' ? 'bg-rust/10 text-rust' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full capitalize ${u.membership_tier === 'premium' ? 'bg-purple-100 text-purple-700' : u.membership_tier === 'community' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.membership_tier}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/60">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4 font-sans text-xs text-navy/40 font-mono truncate max-w-[80px]">{u.id.slice(0,8)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 bg-navy rounded-lg p-5">
        <p className="text-cream font-sans text-sm font-semibold mb-1">Make someone an admin</p>
        <p className="text-cream/60 font-sans text-xs leading-relaxed mb-2">Run this in the Supabase SQL editor, replacing the email:</p>
        <code className="block bg-navy-dark text-cream/80 font-mono text-xs p-3 rounded-md">
          {`UPDATE profiles SET role = 'admin' WHERE email = 'user@email.com';`}
        </code>
      </div>
    </div>
  )
}
