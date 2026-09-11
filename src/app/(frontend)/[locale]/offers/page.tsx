import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { OffersSection } from '@/components/site/OffersSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { OfferItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'ar')
  return { title: dict.offers.eyebrow, description: dict.offers.description }
}

export default async function OffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })
  const [{ site, footerAbout }, offersRes] = await Promise.all([
    getShellData(locale),
    payload.find({ collection: 'offers', sort: 'order', limit: 100, locale }),
  ])

  const offers: OfferItem[] = offersRes.docs.map((o, i) => ({
    id: rowId(o.id, 'offer', i),
    index: o.index,
    title: o.title,
    whatBuys: o.whatBuys,
    scopeNote: o.scopeNote,
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <div className="h-6" />
      <OffersSection offers={offers} dict={dict.offers} sectionId="top" />
    </PageShell>
  )
}
