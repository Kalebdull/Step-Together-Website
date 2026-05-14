'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminList, adminCreate, adminUpdate, adminDelete } from '@/lib/admin-api'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Class } from '@/types'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const LEVELS = ['Beginner','Intermediate','Advanced','All Levels']
const BLANK: Partial<Class> = { title:'', description:'', location:'', address:'', day_of_week:'Monday', time:'', level:'All Levels', instructor:'Cinnamon Leigh Dull', price:0, is_free:false, max_capacity:20, is_active:true }

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Partial<Class>>(BLANK)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminList<Class>('classes', { orderBy: 'day_of_week' })
      setClasses(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load classes')
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function save() {
    setSaving(true)
    try {
      const { id, created_at, ...rest } = form as Class & { created_at?: string }
      if (id) await adminUpdate<Class>('classes', id, rest)
      else await adminCreate<Class>('classes', rest)
      setModal(false); load()
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Delete this class?')) return
    await adminDelete('classes', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-navy text-4xl font-light">Classes</h1>
        </div>
        <button onClick={() => { setForm(BLANK); setModal(true) }} className="flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors">
          <Plus size={16} /> Add Class
        </button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-5 py-3 rounded-md">{error}</div>}

      <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
        {loading ? <div className="py-16 text-center text-navy/40 font-sans text-sm">Loading...</div> :
        classes.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-navy/40 font-sans text-sm mb-3">No classes yet.</p>
            <button onClick={() => { setForm(BLANK); setModal(true) }} className="text-rust text-sm font-sans font-medium hover:underline">Add your first class →</button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>{['Class','Day & Time','Location','Level','Price','Status',''].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-sans font-semibold text-navy/60 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {classes.map(c => (
                <tr key={c.id} className="hover:bg-cream-light/50 transition-colors">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-navy">{c.title}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{c.day_of_week}<br/><span className="text-xs text-navy/40">{c.time}</span></td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{c.location}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy/70">{c.level}</td>
                  <td className="px-5 py-4 font-sans text-sm text-navy">{c.is_free ? 'Free' : `$${c.price}`}</td>
                  <td className="px-5 py-4"><span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${c.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{c.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => { setForm(c); setModal(true) }} className="text-navy/40 hover:text-rust"><Pencil size={15} /></button><button onClick={() => remove(c.id)} className="text-navy/40 hover:text-red-500"><Trash2 size={15} /></button></div></td>
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
              <h2 className="font-serif text-navy text-2xl font-medium">{form.id ? 'Edit' : 'Add'} Class</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {[
                { label:'Title', key:'title', type:'text' },
                { label:'Location', key:'location', type:'text' },
                { label:'Address', key:'address', type:'text' },
                { label:'Instructor', key:'instructor', type:'text' },
                { label:'Time (e.g. 7:00 PM)', key:'time', type:'text' },
                { label:'Price ($)', key:'price', type:'number' },
                { label:'Max Capacity', key:'max_capacity', type:'number' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">{label}</label>
                  <input type={type} value={(form as Record<string,unknown>)[key] as string ?? ''} onChange={e => setForm({...form,[key]: type==='number' ? Number(e.target.value) : e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
                </div>
              ))}
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Day</label><select value={form.day_of_week ?? ''} onChange={e => setForm({...form,day_of_week:e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">{DAYS.map(d => <option key={d}>{d}</option>)}</select></div>
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Level</label><select value={form.level ?? ''} onChange={e => setForm({...form,level:e.target.value as Class['level']})} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">{LEVELS.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="text-sm font-medium text-navy/70 font-sans block mb-1">Description</label><textarea value={form.description ?? ''} onChange={e => setForm({...form,description:e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none" /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_free ?? false} onChange={e => setForm({...form,is_free:e.target.checked})} className="accent-rust" /> Free class</label>
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer"><input type="checkbox" checked={form.is_active ?? true} onChange={e => setForm({...form,is_active:e.target.checked})} className="accent-rust" /> Active</label>
              </div>
            </div>
            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">{saving ? 'Saving...' : 'Save Class'}</button>
              <button onClick={() => setModal(false)} className="flex-1 border border-cream-dark text-navy font-sans text-sm py-3 rounded-md hover:bg-cream-dark transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
