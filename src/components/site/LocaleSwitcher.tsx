'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, LOCALE_LABELS, type Locale } from '@/i18n/locales'
import { ChevronDownIcon } from './icons'
import { R } from './tokens'

/** Swaps the leading /{locale} segment of the current path, keeping the rest of the URL. */
function pathForLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/')
  segments[1] = locale
  return segments.join('/') || `/${locale}`
}

export function LocaleSwitcher({ locale, className = '' }: { locale: Locale; className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeydown)
    }
  }, [open, close])

  const otherLocales = LOCALES.filter((l) => l !== locale)

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-1.5 px-4 text-[13px] font-bold text-white transition-[filter] hover:brightness-110"
        style={{
          background: 'rgba(255,255,255,0.13)',
          border: '1.5px solid rgba(255,255,255,0.16)',
          borderRadius: R.pill,
        }}
      >
        {LOCALE_LABELS[locale]}
        <ChevronDownIcon size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 top-[calc(100%+8px)] z-[60] flex min-w-[140px] flex-col gap-0.5 p-1.5"
          style={{ background: '#131211', border: '1px solid rgba(255,255,255,0.12)', borderRadius: R.inner }}
        >
          {otherLocales.map((l) => (
            <Link
              key={l}
              href={pathForLocale(pathname, l)}
              role="menuitem"
              onClick={close}
              className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              {LOCALE_LABELS[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
