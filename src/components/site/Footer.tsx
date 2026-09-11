import React from 'react'
import Link from 'next/link'
import { Reveal } from './Reveal'
import { R, FONT_EN } from './tokens'
import type { SiteSettingsData } from './types'

const SOCIAL_LABELS: { key: keyof SiteSettingsData['socials']; label: string; abbr: string }[] = [
  { key: 'instagram', label: 'إنستغرام', abbr: 'IG' },
  { key: 'linkedin', label: 'لينكدإن', abbr: 'IN' },
]

export function Footer({
  siteName,
  footerAbout,
  siteSettings,
}: {
  siteName: string
  footerAbout: string
  siteSettings: SiteSettingsData
}) {
  const year = new Date().getFullYear()
  const socials = SOCIAL_LABELS.map((s) => ({ ...s, href: siteSettings.socials[s.key] })).filter((s) => s.href)
  const whatsappDigits = siteSettings.contact.whatsapp?.replace(/[^0-9]/g, '')
  const hasContactIcons = socials.length > 0 || Boolean(siteSettings.contact.email) || Boolean(whatsappDigits)

  return (
    <footer className="relative z-10 mt-6 px-5 pt-8 sm:px-8">
      <Reveal className="mx-auto max-w-[1152px] overflow-hidden">
        <div
          style={{
            borderRadius: `${R.card}px ${R.card}px 0 0`,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderBottom: 'none',
          }}
        >
          <div className="flex flex-col items-center gap-7 p-8">
            <span className="inline-flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/brand/logo-icon.svg" alt="" className="h-9 w-9 rounded-[10px]" />
              <span style={{ fontFamily: FONT_EN }} className="text-lg font-bold text-white">
                {siteName}
              </span>
            </span>
            <div className="max-w-lg text-center">
              <p className="m-0 mb-2 text-sm font-bold text-white">عن {siteName}</p>
              <p className="m-0 text-[13px] leading-[1.7] text-[#9aa0ab]">{footerAbout}</p>
            </div>
            {hasContactIcons && (
              <div className="flex flex-wrap justify-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {s.abbr}
                  </a>
                ))}
                {whatsappDigits && (
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="واتساب"
                    className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    WA
                  </a>
                )}
                {siteSettings.contact.email && (
                  <a
                    href={`mailto:${siteSettings.contact.email}`}
                    aria-label="البريد الإلكتروني"
                    className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    @
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-8 py-4" style={{ background: '#060606' }}>
            <div className="flex flex-wrap gap-5">
              {siteSettings.nav.map((l) => (
                <Link key={l.id} href={l.href} className="text-[13px] text-[#7d818c] transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
            <span className="text-xs text-[#7d818c]">
              © {year} {siteSettings.footerNote}
            </span>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
