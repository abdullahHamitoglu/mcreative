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
      <div className="relative z-1 overflow-hidden">
        <Navbar siteName={site.siteName} nav={site.nav} dict={dict.nav} locale={locale} />
        <main>{children}</main>
        <Footer siteName={site.siteName} footerAbout={footerAbout} siteSettings={site} dict={dict.footer} />
      </div>
    </div>
  )
}
