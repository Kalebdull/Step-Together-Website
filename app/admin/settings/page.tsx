'use client'

import { useState, useEffect } from 'react'
import { adminList } from '@/lib/admin-api'
import { Save, AlertTriangle } from 'lucide-react'
import type { SiteSetting } from '@/types'

const DEFAULT_SETTINGS = [
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
  { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
  { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
  { key: 'contact_email', label: 'Contact Email', placeholder: 'hello@steptogetherdance.com' },
  { key: 'hero_headline', label: 'Hero Headline', placeholder: 'Connecting People Through Line Dance' },
  { key: 'hero_subtext', label: 'Hero Subtext', placeholder: 'A community built on rhythm...' },
  { key: 'about_text', label: 'About Text (Home)', placeholder: 'Step Together was built on one idea...' },
]

async function upsertSetting(key: string, value: string) {
  const res = await fetch('/api/admin/db/site_settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value, _onConflict: 'key' }),
  })
  if (!res.ok) {
    const json = await res.json()
    throw new Error(json.error ?? 'Save failed')
  }
}

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    adminList<SiteSetting>('site_settings')
      .then(data => {
        const map: Record<string, string> = {}
        data.forEach(s => { map[s.key] = s.value ?? '' })
        setValues(map)
      })
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    setSaveError('')
    try {
      await Promise.all(
        Object.entries(values).map(([key, value]) => upsertSetting(key, value))
      )
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-navy/40 font-sans text-sm">Loading settings...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-rust font-sans text-xs font-semibold tracking-widest uppercase mb-1">Admin</p>
        <h1 className="font-serif text-navy text-4xl font-light">Site Settings</h1>
        <p className="text-navy/50 font-sans text-sm mt-1">Update social links, contact info, and page content.</p>
      </div>

      <div className="bg-white rounded-lg border border-cream-dark p-8 flex flex-col gap-5">
        {saveError && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-4 py-3 rounded-md">
            <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
            {saveError}
          </div>
        )}

        {DEFAULT_SETTINGS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium text-navy/70 font-sans block mb-1.5">{label}</label>
            {key.includes('text') || key.includes('subtext') ? (
              <textarea
                value={values[key] ?? ''} rows={3} placeholder={placeholder}
                onChange={e => setValues({ ...values, [key]: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors resize-none"
              />
            ) : (
              <input
                type="text" value={values[key] ?? ''} placeholder={placeholder}
                onChange={e => setValues({ ...values, [key]: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-cream-dark text-navy font-sans text-sm focus:outline-none focus:border-rust transition-colors"
              />
            )}
          </div>
        ))}

        <button
          onClick={save} disabled={saving}
          className="flex items-center justify-center gap-2 bg-rust text-white font-sans font-medium text-sm py-3.5 rounded-md hover:bg-rust-dark transition-colors disabled:opacity-60 mt-2"
        >
          <Save size={15} /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
