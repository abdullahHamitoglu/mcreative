import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import type { SiteSettingsData } from './types'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/locales'

export function PageShell({
  site,
  footerAbout,
  dict,
  locale,
  children,
}: {
  site: SiteSettingsData
  footerAbout: string
  dict: Dictionary
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none fixed inset-0 z-0 flex items-start justify-between opacity-[0.09]" aria-hidden="true" dir='ltr'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/m-creative-vertical-brand-frame@3x.png" alt="" className="h-full w-auto object-contain" />
        <img src="/assets/brand/m-creative-vertical-brand-frame@3x.png" alt="" className="h-full w-auto object-contain -scale-x-100" />
      </div>
      <div className="relative z-1 overflow-hidden">
        <Navbar siteName={site.siteName} nav={site.nav} dict={dict.nav} locale={locale} />
        <main>{children}</main>
        <Footer siteName={site.siteName} footerAbout={footerAbout} siteSettings={site} dict={dict.footer} />
      </div>
    </div>
  )
}
