import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePage } from '@/components/site/HomePage'
import type { HomepageData, SiteSettingsData } from '@/components/site/types'

export const dynamic = 'force-dynamic'

function mediaUrl(value: unknown): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return undefined
  const doc = value as { url?: string }
  return doc.url
}

/** Editors naturally type "instagram.com/x" instead of a full URL — treat that as https. */
function normalizeUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function rowId(id: string | null | undefined, fallbackPrefix: string, index: number): string {
  return id || `${fallbackPrefix}-${index}`
}

export default async function Page() {
  const payload = await getPayload({ config })

  const [siteSettings, homepage] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'homepage' }),
  ])

  const site: SiteSettingsData = {
    siteName: siteSettings.siteName || 'M Creative',
    contact: {
      email: siteSettings.contact?.email ?? undefined,
      whatsapp: siteSettings.contact?.whatsapp ?? undefined,
    },
    socials: {
      instagram: normalizeUrl(siteSettings.socials?.instagram),
      linkedin: normalizeUrl(siteSettings.socials?.linkedin),
    },
    nav: (siteSettings.nav ?? []).map((n, i) => ({ id: rowId(n.id, 'nav', i), label: n.label, href: n.href })),
    footerNote: siteSettings.footerNote || 'M Creative. جميع الحقوق محفوظة.',
  }

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
    servicesHeadline: {
      line1: homepage.servicesHeadline?.line1 || '',
      line2: homepage.servicesHeadline?.line2 || '',
    },
    services: (homepage.services ?? []).map((s, i) => ({
      id: rowId(s.id, 'service', i),
      title: s.title,
      description: s.description,
      icon: s.icon || 'strategy',
    })),
    offers: (homepage.offers ?? []).map((o, i) => ({
      id: rowId(o.id, 'offer', i),
      index: o.index,
      title: o.title,
      whatBuys: o.whatBuys,
      scopeNote: o.scopeNote,
    })),
    process: (homepage.process ?? []).map((p, i) => ({
      id: rowId(p.id, 'process', i),
      stepLabel: p.stepLabel,
      title: p.title,
      description: p.description,
    })),
    marketsHeadline: {
      title: homepage.marketsHeadline?.title || '',
      description: homepage.marketsHeadline?.description || '',
    },
    markets: (homepage.markets ?? []).map((m, i) => ({
      id: rowId(m.id, 'market', i),
      stage: m.stage,
      title: m.title,
      description: m.description,
    })),
    about: {
      title: homepage.about?.title || 'من نحن',
      description: homepage.about?.description || '',
      founders: (homepage.about?.founders ?? []).map((f, i) => ({
        id: rowId(f.id, 'founder', i),
        name: f.name,
        role: f.role,
      })),
    },
    footerAbout: homepage.footerAbout || '',
  }

  return <HomePage home={home} site={site} />
}
