'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Partnership } from '@/types'

const BLANK: Partial<Partnership> = { partner_name:'', description:'', website_url:'', partnership_type:'venue', is_featured:false, is_active:true }
const TYPES = ['venue','brand','organization']

export default function AdminPartnershipsPage() {
  const [items, setItems] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Partial<Partnership>>(BLANK)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('partnerships').select('*').order('partner_name')
    setItems(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  async function save() {
    setSaving(true)
    if (form.id) await supabase.from('partnerships').update(form).eq('id', form.id)
    else await supabase.from('partnerships').insert(form)
    setSaving(false); setModal(false); load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this partner?')) return
    await supabase.from('partnerships').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div><p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p><h1 className="font-serif text-navy text-4xl font-light">Partnerships</h1></div>
        <button onClick={() => { setForm(BLANK); setModal(true) }} className="flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors"><Plus size={16} /> Add Partner</button>
      </div>
      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {loading ? <div className="py-16 text-center text-navy/40 font-sans text-sm">Loading...</div> :
        items.length === 0 ? <div className="py-16 text-center"><p className="text-navy/40 font-sans text-sm mb-3">No partners yet.</p><button onClick={() => { setForm(BLANK); setModal(true) }} className="text-rust text-sm font-sans font-medium hover:underline">Add first partner →</button></div> : (
          <table className="w-full">
            <thead className="bg-cream-dark"><tr>{['Partner','Type','Featured','Status',''].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-cream-dark">
              {items.map(p => (
                <tr key={p.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-4"><p className="font-sans text-sm font-medium text-navy">{p.partner_name}</p>{p.website_url && <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="text-rust text-xs hover:underline">{p.website_url}</a>}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70 capitalize">{p.partnership_type}</td>
                  <td className="px-5 py-4"><span className={`text-xs font-sans px-2.5 py-1 rounded-full ${p.is_featured ? 'bg-rust/10 text-rust' : 'bg-gray-100 text-gray-500'}`}>{p.is_featured ? 'Featured' : 'Standard'}</span></td>
                  <td className="px-5 py-4"><span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${p.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => { setForm(p); setModal(true) }} className="text-navy/40 hover:text-rust"><Pencil size={15} /></button><button onClick={() => remove(p.id)} className="text-navy/40 hover:text-red-500"><Trash2 size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-cream-dark w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-cream-dark"><h2 className="font-serif text-navy text-2xl font-medium">{form.id ? 'Edit' : 'Add'} Partner</h2><button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button></div>
            <div className="p-6 flex flex-col gap-4">
              {[{ label:'Partner Name', key:'partner_name' },{ label:'Website URL', key:'website_url' }].map(({ label, key }) => (
                <div key={key}><label className="text-sm font-medium text-navy/70 font-sans block mb-1">{label}</label><input type="text" value={(form as any)[key] ?? ''} onChange={e => setForm({...form,[key]:e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" /></div>
              ))}
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Type</label><select value={form.partnership_type ?? ''} onChange={e => setForm({...form,partnership_type:e.target.value as any})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">{TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Description</label><textarea value={form.description ?? ''} onChange={e => setForm({...form,description:e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none" /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_featured ?? false} onChange={e => setForm({...form,is_featured:e.target.checked})} className="accent-rust" /> Featured</label>
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_active ?? true} onChange={e => setForm({...form,is_active:e.target.checked})} className="accent-rust" /> Active</label>
              </div>
            </div>
            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">{saving ? 'Saving...' : 'Save Partner'}</button>
              <button onClick={() => setModal(false)} className="flex-1 border border-cream-dark text-navy font-sans text-sm py-3 rounded-md hover:bg-cream-dark transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
