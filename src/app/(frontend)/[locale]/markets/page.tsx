import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { MarketsSection } from '@/components/site/MarketsSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { MarketItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'ar')
  return { title: dict.markets.eyebrow, description: dict.markets.description }
}

export default async function MarketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })
  const [{ site, footerAbout }, marketsRes] = await Promise.all([
    getShellData(locale),
    payload.find({ collection: 'markets', sort: 'order', limit: 100, locale }),
  ])

  const markets: MarketItem[] = marketsRes.docs.map((m, i) => ({
    id: rowId(m.id, 'market', i),
    stage: m.stage,
    title: m.title,
    description: m.description,
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <div className="h-6" />
      <MarketsSection markets={markets} dict={dict.markets} sectionId="top" />
    </PageShell>
  )
}
