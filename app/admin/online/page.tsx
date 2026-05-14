'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminList, adminCreate, adminUpdate, adminDelete } from '@/lib/admin-api'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import type { Membership } from '@/types'

const BLANK: Partial<Membership> = { name: '', description: '', price: 0, interval: 'month', features: [], is_active: true }

export default function AdminOnlinePage() {
  const [plans, setPlans] = useState<Membership[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<Partial<Membership>>(BLANK)
  const [featuresText, setFeaturesText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminList<Membership>('memberships', { orderBy: 'price' })
      setPlans(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load plans')
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openModal(plan: Partial<Membership> = BLANK) {
    setForm(plan)
    setFeaturesText((plan.features ?? []).join('\n'))
    setModal(true)
  }

  async function save() {
    setSaving(true)
    try {
      const { id, created_at, ...rest } = form as Membership & { created_at?: string }
      const payload = { ...rest, features: featuresText.split('\n').map(s => s.trim()).filter(Boolean) }
      if (id) await adminUpdate<Membership>('memberships', id, payload)
      else await adminCreate<Membership>('memberships', payload)
      setModal(false); load()
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Delete this plan? This may affect members on this plan.')) return
    await adminDelete('memberships', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
          <h1 className="font-serif text-navy text-4xl font-light">Online Platform</h1>
          <p className="text-navy/50 font-sans text-sm mt-1">Edit membership plans that appear on the Online Platform page.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-rust text-white font-sans text-sm font-medium px-5 py-2.5 rounded-md hover:bg-rust-dark transition-colors">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-5 py-3 rounded-md">{error}</div>}

      {/* Plan preview cards */}
      {!loading && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {plans.map(plan => (
            <div key={plan.id} className="bg-white border border-cream-dark rounded-xl overflow-hidden group">
              <div className="bg-navy-dark px-6 py-4 flex items-start justify-between">
                <div>
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-rust mb-1">{plan.name}</p>
                  <p className="font-serif text-cream text-3xl font-light leading-none">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    {plan.price > 0 && <span className="font-sans text-cream/40 text-sm ml-1">/{plan.interval}</span>}
                  </p>
                </div>
                <div className="flex gap-1.5 mt-1">
                  <button onClick={() => openModal(plan)} className="p-1.5 text-cream/40 hover:text-rust transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => remove(plan.id)} className="p-1.5 text-cream/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-navy/55 font-sans text-sm mb-4">{plan.description}</p>
                <ul className="flex flex-col gap-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-navy/70 font-sans text-xs">
                      <Check size={12} className="text-rust flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.stripe_price_id && (
                  <p className="font-mono text-xs text-navy/35 bg-cream-dark px-2 py-1 rounded mt-4 truncate">
                    {plan.stripe_price_id}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <div className="py-16 text-center text-navy/40 font-sans text-sm">Loading...</div>}

      {!loading && plans.length === 0 && (
        <div className="bg-white rounded-lg border border-cream-dark py-16 text-center mb-8">
          <p className="text-navy/40 font-sans text-sm mb-3">No membership plans yet.</p>
          <button onClick={() => openModal()} className="text-rust text-sm font-sans font-medium hover:underline">Create your first plan →</button>
        </div>
      )}

      <div className="bg-navy rounded-xl p-6">
        <p className="font-serif text-cream text-lg font-light mb-1">Stripe Pricing</p>
        <p className="text-cream/55 font-sans text-sm leading-relaxed">
          After updating a plan price, remember to update the matching Stripe Price ID in your environment variables so payments sync correctly.
        </p>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-cream-dark w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-cream-dark">
              <h2 className="font-serif text-navy text-2xl font-medium">{form.id ? 'Edit' : 'Add'} Plan</h2>
              <button onClick={() => setModal(false)}><X size={20} className="text-navy/40 hover:text-navy" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Plan Name</label>
                <input type="text" value={form.name ?? ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Community" className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Tagline</label>
                <input type="text" value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="e.g. For the regular dancer who wants more." className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Price ($)</label>
                  <input type="number" value={form.price ?? 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Billing Cycle</label>
                  <select value={form.interval ?? 'month'} onChange={e => setForm({ ...form, interval: e.target.value as 'month' | 'year' })} className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust">
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Features <span className="text-navy/30">(one per line)</span></label>
                <textarea
                  value={featuresText}
                  onChange={e => setFeaturesText(e.target.value)}
                  rows={6}
                  placeholder="Unlimited on-demand videos&#10;Live virtual classes (2/week)&#10;Member-only event discounts"
                  className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy/70 font-sans block mb-1">Stripe Price ID <span className="text-navy/30">(optional)</span></label>
                <input type="text" value={form.stripe_price_id ?? ''} onChange={e => setForm({ ...form, stripe_price_id: e.target.value })} placeholder="price_..." className="w-full px-4 py-2.5 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust font-mono transition-colors" />
              </div>
              <label className="flex items-center gap-2 text-sm font-sans text-navy/70 cursor-pointer">
                <input type="checkbox" checked={form.is_active ?? true} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-rust" />
                Active (visible to users)
              </label>
            </div>
            <div className="p-6 border-t border-cream-dark flex gap-3">
              <button onClick={save} disabled={saving} className="flex-1 bg-rust text-white font-sans font-medium text-sm py-3 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Plan'}
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
