'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, LOCALE_LABELS, type Locale } from '@/i18n/locales'

/** Swaps the leading /{locale} segment of the current path, keeping the rest of the URL. */
function pathForLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/')
  segments[1] = locale
  return segments.join('/') || `/${locale}`
}

export function LocaleSwitcher({ locale, className = '' }: { locale: Locale; className?: string }) {
  const pathname = usePathname()

  return (
    <div className={`inline-flex items-center gap-1 ${className}`} role="group" aria-label="Language / اللغة / Dil">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathForLocale(pathname, l)}
          aria-current={l === locale ? 'true' : undefined}
          className="rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
          style={{
            color: l === locale ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
            background: l === locale ? '#c3d830' : 'transparent',
          }}
        >
          {LOCALE_LABELS[l]}
        </Link>
      ))}
    </div>
  )
}
