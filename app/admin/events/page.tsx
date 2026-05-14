'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminList, adminCreate, adminUpdate, adminDelete } from '@/lib/admin-api'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Event } from '@/types'

const EVENT_TYPES = ['themed_night','boot_camp','social','special']
const BLANK: Partial<Event> = { title:'', description:'', event_type:'social', location:'', price:0, is_free:false, max_capacity:50, is_published:true }

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Partial<Event>>(BLANK)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminList<Event>('events', { orderBy: 'event_date' })
      setEvents(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load events')
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function save() {
    setSaving(true)
    try {
      const { id, created_at, ...rest } = form as Event & { created_at?: string }
      if (id) await adminUpdate<Event>('events', id, rest)
      else await adminCreate<Event>('events', rest)
      setModal(false); load()
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Delete this event?')) return
    await adminDelete('events', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-navy text-4xl font-light">Events</h1>
        </div>
        <button onClick={() => { setForm(BLANK); setModal(true) }} className="flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors">
          <Plus size={16} /> Add Event
        </button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-5 py-3 rounded-md">{error}</div>}

      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {loading ? <div className="py-16 text-center text-navy/40 font-sans text-sm">Loading...</div> :
        events.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-navy/40 font-sans text-sm mb-3">No events yet.</p>
            <button onClick={() => { setForm(BLANK); setModal(true) }} className="text-rust text-sm font-sans font-medium hover:underline">Add your first event →</button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>{['Event','Type','Date','Location','Price','Status',''].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-navy">{ev.title}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70 capitalize">{ev.event_type?.replace('_',' ')}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{ev.event_date ? new Date(ev.event_date).toLocaleDateString() : '—'}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{ev.location}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy">{ev.is_free ? 'Free' : `$${ev.price}`}</td>
                  <td className="px-5 py-4"><span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${ev.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{ev.is_published ? 'Published' : 'Draft'}</span></td>
                  <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => { setForm(ev); setModal(true) }} className="text-navy/40 hover:text-rust"><Pencil size={15} /></button><button onClick={() => remove(ev.id)} className="text-navy/40 hover:text-red-500"><Trash2 size={15} /></button></div></td>
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
              <h2 className="font-serif text-navy text-2xl font-medium">{form.id ? 'Edit' : 'Add'} Event</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {[{ label:'Title', key:'title' },{ label:'Location', key:'location' },{ label:'Address', key:'address' }].map(({ label, key }) => (
                <div key={key}><label className="text-sm font-medium text-navy/70 font-sans block mb-1">{label}</label><input type="text" value={(form as Record<string,unknown>)[key] as string ?? ''} onChange={e => setForm({...form,[key]:e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" /></div>
              ))}
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Event Type</label><select value={form.event_type ?? ''} onChange={e => setForm({...form,event_type:e.target.value as Event['event_type']})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">{EVENT_TYPES.map(t => <option key={t} value={t}>{t.replace('_',' ')}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Date</label><input type="datetime-local" value={form.event_date?.slice(0,16) ?? ''} onChange={e => setForm({...form,event_date:e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" /></div>
                <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">End Date</label><input type="datetime-local" value={form.end_date?.slice(0,16) ?? ''} onChange={e => setForm({...form,end_date:e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Price ($)</label><input type="number" value={form.price ?? 0} onChange={e => setForm({...form,price:Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" /></div>
                <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Capacity</label><input type="number" value={form.max_capacity ?? ''} onChange={e => setForm({...form,max_capacity:Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" /></div>
              </div>
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Description</label><textarea value={form.description ?? ''} onChange={e => setForm({...form,description:e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none" /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_free ?? false} onChange={e => setForm({...form,is_free:e.target.checked})} className="accent-rust" /> Free event</label>
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_published ?? true} onChange={e => setForm({...form,is_published:e.target.checked})} className="accent-rust" /> Published</label>
              </div>
            </div>
            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">{saving ? 'Saving...' : 'Save Event'}</button>
              <button onClick={() => setModal(false)} className="flex-1 border border-cream-dark text-navy font-sans text-sm py-3 rounded-md hover:bg-cream-dark transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
