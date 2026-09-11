import React from 'react'
import { PageShell } from './PageShell'
import { HeroSection } from './HeroSection'
import { StatementSection } from './StatementSection'
import { ServicesSection } from './ServicesSection'
import { OffersSection } from './OffersSection'
import { MarketsSection } from './MarketsSection'
import { ProjectsSection } from './ProjectsSection'
import { AboutTeaser } from './AboutTeaser'
import type { HomepageData, SiteSettingsData, ServiceItem, OfferItem, MarketItem, ProjectListItem } from './types'

export function HomePage({
  home,
  site,
  services,
  offers,
  markets,
  projects,
  aboutStory,
}: {
  home: HomepageData
  site: SiteSettingsData
  services: ServiceItem[]
  offers: OfferItem[]
  markets: MarketItem[]
  projects: ProjectListItem[]
  aboutStory: string
}) {
  return (
    <PageShell site={site} footerAbout={home.footerAbout}>
      <HeroSection hero={home.hero} contactEmail={site.contact.email} />
      <StatementSection statement={home.statement} />
      <ServicesSection services={services} viewAllHref="/services" />
      <OffersSection offers={offers} viewAllHref="/offers" />
      <ProjectsSection projects={projects} viewAllHref="/projects" />
      <MarketsSection markets={markets} viewAllHref="/markets" />
      <AboutTeaser story={aboutStory} />
    </PageShell>
  )
}
