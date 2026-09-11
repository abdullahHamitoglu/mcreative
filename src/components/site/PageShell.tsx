import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import type { SiteSettingsData } from './types'

export function PageShell({
  site,
  footerAbout,
  children,
}: {
  site: SiteSettingsData
  footerAbout: string
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      <div className="relative z-1 overflow-hidden">
        <Navbar siteName={site.siteName} nav={site.nav} />
        <main>{children}</main>
        <Footer siteName={site.siteName} footerAbout={footerAbout} siteSettings={site} />
      </div>
    </div>
  )
}
