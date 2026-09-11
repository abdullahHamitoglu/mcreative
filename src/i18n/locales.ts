export const LOCALES = ['ar', 'en', 'tr'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ar'

export const RTL_LOCALES: readonly Locale[] = ['ar']

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  tr: 'Türkçe',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale)
}
