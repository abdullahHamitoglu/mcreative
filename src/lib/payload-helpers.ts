export function mediaUrl(value: unknown): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return undefined
  const doc = value as { url?: string }
  return doc.url ?? undefined
}

/** Editors naturally type "instagram.com/x" instead of a full URL — treat that as https. */
export function normalizeUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function rowId(id: string | null | undefined, fallbackPrefix: string, index: number): string {
  return id || `${fallbackPrefix}-${index}`
}
