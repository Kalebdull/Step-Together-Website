'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminList, adminCreate, adminUpdate, adminDelete } from '@/lib/admin-api'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Workshop } from '@/types'

const BLANK: Partial<Workshop> = { title: '', subtitle: '', description: '', location: '', price: 0, max_capacity: 20, highlights: [], is_featured: false, is_published: true }

export default function AdminWorkshopsPage() {
  const [items, setItems] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Partial<Workshop>>(BLANK)
  const [highlightsText, setHighlightsText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminList<Workshop>('workshops', { orderBy: 'start_date' })
      setItems(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load workshops')
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openModal(w: Partial<Workshop> = BLANK) {
    setForm(w)
    setHighlightsText((w.highlights ?? []).join('\n'))
    setModal(true)
  }

  async function save() {
    setSaving(true)
    try {
      const { id, created_at, ...rest } = form as Workshop & { created_at?: string }
      const payload = { ...rest, highlights: highlightsText.split('\n').map(s => s.trim()).filter(Boolean) }
      if (id) await adminUpdate<Workshop>('workshops', id, payload)
      else await adminCreate<Workshop>('workshops', payload)
      setModal(false); load()
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Delete this workshop?')) return
    await adminDelete('workshops', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-navy text-4xl font-light">Workshops & Retreats</h1>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors">
          <Plus size={16} /> Add Workshop
        </button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-5 py-3 rounded-md">{error}</div>}

      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {loading ? <div className="py-16 text-center text-navy/40 font-sans text-sm">Loading...</div> :
        items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-navy/40 font-sans text-sm mb-3">No workshops yet.</p>
            <button onClick={() => openModal()} className="text-rust text-sm font-sans font-medium hover:underline">Add your first workshop →</button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>{['Workshop', 'Location', 'Start Date', 'Price', 'Featured', 'Status', ''].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {items.map(w => (
                <tr key={w.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-sans text-sm font-medium text-navy">{w.title}</p>
                    {w.subtitle && <p className="font-sans text-xs text-navy/45 mt-0.5">{w.subtitle}</p>}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{w.location}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{w.start_date ? new Date(w.start_date).toLocaleDateString() : '—'}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy">{w.price ? `$${w.price}` : '—'}</td>
                  <td className="px-5 py-4">
                    {w.is_featured && <span className="text-xs font-sans font-semibold px-2.5 py-1 rounded-full bg-rust/10 text-rust">Featured</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${w.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                      {w.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(w)} className="text-navy/40 hover:text-rust"><Pencil size={15} /></button>
                      <button onClick={() => remove(w.id)} className="text-navy/40 hover:text-red-500"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-cream-dark w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-cream-dark">
              <h2 className="font-serif text-navy text-2xl font-medium">{form.id ? 'Edit' : 'Add'} Workshop</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Title</label>
                <input type="text" value={form.title ?? ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Subtitle <span className="text-navy/30">(e.g. 3-Day Immersive Experience)</span></label>
                <input type="text" value={form.subtitle ?? ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Location</label>
                <input type="text" value={form.location ?? ''} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Start Date</label>
                  <input type="datetime-local" value={form.start_date?.slice(0, 16) ?? ''} onChange={e => setForm({ ...form, start_date: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">End Date</label>
                  <input type="datetime-local" value={form.end_date?.slice(0, 16) ?? ''} onChange={e => setForm({ ...form, end_date: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Price ($)</label>
                  <input type="number" value={form.price ?? 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Capacity</label>
                  <input type="number" value={form.max_capacity ?? ''} onChange={e => setForm({ ...form, max_capacity: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Description</label>
                <textarea value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Highlights <span className="text-navy/30">(one per line)</span></label>
                <textarea
                  value={highlightsText}
                  onChange={e => setHighlightsText(e.target.value)}
                  rows={4}
                  placeholder="6 new choreographies&#10;All meals included&#10;Evening social dances"
                  className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none"
                />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured ?? false} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="accent-rust" />
                  Featured workshop
                </label>
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer">
                  <input type="checkbox" checked={form.is_published ?? true} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="accent-rust" />
                  Published
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Workshop'}
              </button>
              <button onClick={() => setModal(false)} className="flex-1 border border-cream-dark text-navy font-sans text-sm py-3 rounded-md hover:bg-cream-dark transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
