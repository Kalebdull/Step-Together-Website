async function req(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Request failed')
  return json
}

export async function adminList<T>(
  table: string,
  opts?: { orderBy?: string; ascending?: boolean }
): Promise<T[]> {
  const p = new URLSearchParams()
  if (opts?.orderBy) p.set('orderBy', opts.orderBy)
  if (opts?.ascending === false) p.set('ascending', 'false')
  const { data } = await req(`/api/admin/db/${table}?${p}`)
  return data ?? []
}

export async function adminCreate<T>(table: string, body: Partial<T>): Promise<T> {
  const { data } = await req(`/api/admin/db/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return data
}

export async function adminUpdate<T>(table: string, id: string, body: Partial<T>): Promise<T> {
  const { data } = await req(`/api/admin/db/${table}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return data
}

export async function adminDelete(table: string, id: string): Promise<void> {
  await req(`/api/admin/db/${table}/${id}`, { method: 'DELETE' })
}
