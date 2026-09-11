import React from 'react'
import { Navbar } from './Navbar'
import { HeroSection } from './HeroSection'
import { StatementSection } from './StatementSection'
import { ServicesSection } from './ServicesSection'
import { OffersSection } from './OffersSection'
import { ProcessSection } from './ProcessSection'
import { MarketsSection } from './MarketsSection'
import { AboutSection } from './AboutSection'
import { Footer } from './Footer'
import type { HomepageData, SiteSettingsData } from './types'

export function HomePage({ home, site }: { home: HomepageData; site: SiteSettingsData }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      <div className="relative z-[1]">
        <Navbar siteName={site.siteName} nav={site.nav} />
        <main>
          <HeroSection hero={home.hero} contactEmail={site.contact.email} />
          <StatementSection statement={home.statement} />
          <ServicesSection headline={home.servicesHeadline} services={home.services} />
          <OffersSection offers={home.offers} />
          <ProcessSection process={home.process} />
          <MarketsSection headline={home.marketsHeadline} markets={home.markets} />
          <AboutSection about={home.about} />
        </main>
        <Footer siteName={site.siteName} footerAbout={home.footerAbout} siteSettings={site} />
      </div>
    </div>
  )
}
