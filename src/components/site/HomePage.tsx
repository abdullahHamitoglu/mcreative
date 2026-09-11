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
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/locales'

export function HomePage({
  home,
  site,
  services,
  offers,
  markets,
  projects,
  aboutStory,
  dict,
  locale,
}: {
  home: HomepageData
  site: SiteSettingsData
  services: ServiceItem[]
  offers: OfferItem[]
  markets: MarketItem[]
  projects: ProjectListItem[]
  aboutStory: string
  dict: Dictionary
  locale: Locale
}) {
  return (
    <PageShell site={site} footerAbout={home.footerAbout} dict={dict} locale={locale}>
      <HeroSection hero={home.hero} contactEmail={site.contact.email} dict={dict.hero} locale={locale} />
      <StatementSection statement={home.statement} />
      <ServicesSection services={services} dict={dict.services} viewAllHref={`/${locale}/services`} />
      <OffersSection offers={offers} dict={dict.offers} viewAllHref={`/${locale}/offers`} />
      <ProjectsSection projects={projects} dict={dict.projects} locale={locale} viewAllHref={`/${locale}/projects`} />
      <MarketsSection markets={markets} dict={dict.markets} viewAllHref={`/${locale}/markets`} />
      <AboutTeaser story={aboutStory} dict={dict.aboutTeaser} aboutHref={`/${locale}/about`} />
    </PageShell>
  )
}
