'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminList, adminCreate, adminUpdate } from '@/lib/admin-api'
import { Pencil, X, Image as ImageIcon, AlertTriangle } from 'lucide-react'
import type { ApparelProduct } from '@/types'

type DisplayProduct = {
  id: string | null
  name: string
  category: string
  price: number | null
  image_url: string | null
  description: string | null
  is_coming_soon: boolean
  is_active: boolean
}

const DEFAULTS: DisplayProduct[] = [
  { id: null, name: 'Step Together Tee',  category: 'Tops',        price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
  { id: null, name: 'Signature Hoodie',   category: 'Tops',        price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
  { id: null, name: 'Branded Cap',        category: 'Accessories', price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
  { id: null, name: 'Dance Bandana',      category: 'Accessories', price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
  { id: null, name: 'Boot Bag',           category: 'Gear',        price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
  { id: null, name: 'Community Vest',     category: 'Tops',        price: null, image_url: null, description: null, is_coming_soon: true, is_active: true },
]

const CATEGORIES = ['Tops', 'Bottoms', 'Accessories', 'Gear', 'Footwear']

export default function AdminApparelPage() {
  const [dbItems, setDbItems] = useState<ApparelProduct[]>([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<DisplayProduct>(DEFAULTS[0])
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await adminList<ApparelProduct>('apparel_products', { ascending: true })
      setDbItems(data)
    } catch {}
  }, [])

  useEffect(() => { load() }, [load])

  // Merge hardcoded defaults with whatever is in the DB
  const products: DisplayProduct[] = DEFAULTS.map(d => {
    const match = dbItems.find(db => db.name === d.name)
    if (match) {
      return {
        id: match.id,
        name: match.name,
        category: match.category ?? d.category,
        price: match.price,
        image_url: match.image_url,
        description: match.description,
        is_coming_soon: match.is_coming_soon,
        is_active: match.is_active,
      }
    }
    return d
  })

  // Also show any extra DB products not in defaults
  const extras = dbItems.filter(db => !DEFAULTS.find(d => d.name === db.name))
  extras.forEach(e => products.push({
    id: e.id, name: e.name, category: e.category ?? 'Tops', price: e.price,
    image_url: e.image_url, description: e.description,
    is_coming_soon: e.is_coming_soon, is_active: e.is_active,
  }))

  function openEdit(p: DisplayProduct) {
    setForm({ ...p })
    setSaveError('')
    setModal(true)
  }

  async function save() {
    setSaving(true)
    setSaveError('')
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: form.price ?? 0,
        image_url: form.image_url,
        description: form.description,
        is_coming_soon: form.is_coming_soon,
        is_active: form.is_active,
      }
      if (form.id) {
        await adminUpdate<ApparelProduct>('apparel_products', form.id, payload)
      } else {
        await adminCreate<ApparelProduct>('apparel_products', payload)
      }
      setModal(false)
      load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed'
      if (msg.includes('security') || msg.includes('RLS') || msg.includes('policy')) {
        setSaveError('Permission denied — add SUPABASE_SERVICE_ROLE_KEY to your .env.local and restart the server.')
      } else {
        setSaveError(msg)
      }
    }
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Apparel Products</h1>
        <p className="text-navy/45 font-sans text-sm mt-1">Click the pencil on any product to add a photo or price when you&apos;re ready.</p>
      </div>

      {/* Product grid — always shows all 6 defaults */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        {products.map((p, i) => (
          <div key={p.id ?? p.name} className="bg-white border border-cream-dark rounded-xl overflow-hidden group">
            {/* Image area */}
            <div className="bg-gradient-to-br from-navy-dark to-navy h-44 flex items-center justify-center relative overflow-hidden">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(245,237,214,0.08)', border: '1px solid rgba(245,237,214,0.12)' }}
                  >
                    <p className="font-serif text-cream text-xl font-light">{p.name.charAt(0)}</p>
                  </div>
                  <p className="text-cream/30 font-sans text-xs">No photo yet</p>
                </div>
              )}

              {p.is_coming_soon && (
                <div className="absolute top-3 left-3 bg-rust text-white text-xs font-sans font-bold px-2.5 py-1 rounded-full">
                  Coming Soon
                </div>
              )}

              {/* Edit button overlay */}
              <button
                onClick={() => openEdit(p)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-navy hover:bg-white hover:text-rust transition-all duration-200 shadow"
              >
                <Pencil size={13} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-0.5">{p.category}</p>
              <p className="font-serif text-navy text-lg font-medium leading-tight mb-2">{p.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-navy/45 font-sans text-sm">
                  {p.price ? `$${p.price}` : 'Price TBA'}
                </p>
                <button
                  onClick={() => openEdit(p)}
                  className="text-navy/40 hover:text-rust font-sans text-xs font-medium transition-colors duration-200"
                >
                  Edit details →
                </button>
              </div>
              {p.image_url && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-sans text-xs">
                    <ImageIcon size={10} /> Photo added
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-cream-dark w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-cream-dark">
              <h2 className="font-serif text-navy text-2xl font-medium">Edit — {form.name}</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Error */}
              {saveError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-4 py-3 rounded-md">
                  <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                  {saveError}
                </div>
              )}

              {/* Image preview + URL */}
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-2">Product Photo</label>
                {form.image_url ? (
                  <div className="w-full h-48 rounded-lg overflow-hidden border border-cream-dark mb-2">
                    <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-28 rounded-lg border-2 border-dashed border-cream-dark flex items-center justify-center mb-2 bg-cream-light">
                    <div className="text-center">
                      <ImageIcon size={22} className="text-navy/20 mx-auto mb-1" />
                      <p className="text-navy/30 font-sans text-xs">Paste an image URL below to preview</p>
                    </div>
                  </div>
                )}
                <input
                  type="url"
                  value={form.image_url ?? ''}
                  onChange={e => setForm({ ...form, image_url: e.target.value || null })}
                  placeholder="https://your-image-url.com/photo.jpg"
                  className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors"
                />
                <p className="text-navy/30 font-sans text-xs mt-1">Paste any direct image link — it shows up instantly as a preview.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Product Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>

              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Price ($) <span className="text-navy/35">— leave blank if TBA</span></label>
                <input
                  type="number"
                  value={form.price ?? ''}
                  onChange={e => setForm({ ...form, price: e.target.value ? Number(e.target.value) : null })}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Description <span className="text-navy/35">(optional)</span></label>
                <textarea
                  value={form.description ?? ''}
                  onChange={e => setForm({ ...form, description: e.target.value || null })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer">
                  <input type="checkbox" checked={form.is_coming_soon} onChange={e => setForm({ ...form, is_coming_soon: e.target.checked })} className="accent-rust" />
                  Coming Soon
                </label>
                <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-rust" />
                  Visible on site
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Product'}
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
