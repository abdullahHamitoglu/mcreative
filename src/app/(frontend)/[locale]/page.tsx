import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePage } from '@/components/site/HomePage'
import { getShellData } from '@/lib/site-data'
import { mediaUrl, rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { HomepageData, ServiceItem, OfferItem, MarketItem, ProjectListItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })

  const [{ site, footerAbout }, homepage, servicesRes, offersRes, marketsRes, projectsRes, aboutPage] = await Promise.all([
    getShellData(locale),
    payload.findGlobal({ slug: 'homepage', locale }),
    payload.find({ collection: 'services', sort: 'order', limit: 4, locale }),
    payload.find({ collection: 'offers', sort: 'order', limit: 3, locale }),
    payload.find({ collection: 'markets', sort: 'order', limit: 4, locale }),
    payload.find({ collection: 'projects', where: { featured: { equals: true } }, sort: 'order', limit: 3, locale }),
    payload.findGlobal({ slug: 'about-page', locale }),
  ])

  const home: HomepageData = {
    hero: {
      kicker: homepage.hero?.kicker || '',
      title: homepage.hero?.title || 'M Creative',
      englishTagline: homepage.hero?.englishTagline || '',
      subtitleLine1: homepage.hero?.subtitleLine1 || '',
      subtitleLine2: homepage.hero?.subtitleLine2 || '',
      visualUrl: mediaUrl(homepage.hero?.visual),
    },
    statement: {
      quote: homepage.statement?.quote || '',
      highlight: homepage.statement?.highlight || '',
      cite: homepage.statement?.cite || '',
    },
    footerAbout,
  }

  const services: ServiceItem[] = servicesRes.docs.map((s, i) => ({
    id: rowId(s.id, 'service', i),
    title: s.title,
    description: s.description,
    icon: s.icon || 'strategy',
  }))

  const offers: OfferItem[] = offersRes.docs.map((o, i) => ({
    id: rowId(o.id, 'offer', i),
    index: o.index,
    title: o.title,
    whatBuys: o.whatBuys,
    scopeNote: o.scopeNote,
  }))

  const markets: MarketItem[] = marketsRes.docs.map((m, i) => ({
    id: rowId(m.id, 'market', i),
    stage: m.stage,
    title: m.title,
    description: m.description,
  }))

  const projects: ProjectListItem[] = projectsRes.docs.map((p, i) => ({
    id: rowId(p.id, 'project', i),
    slug: p.slug,
    title: p.title,
    client: p.client ?? undefined,
    category: p.category ?? undefined,
    summary: p.summary,
    coverImageUrl: mediaUrl(p.coverImage),
  }))

  return (
    <HomePage
      home={home}
      site={site}
      services={services}
      offers={offers}
      markets={markets}
      projects={projects}
      aboutStory={aboutPage.story || ''}
      dict={dict}
      locale={locale}
    />
  )
}
