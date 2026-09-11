import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { OffersSection } from '@/components/site/OffersSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import type { OfferItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'عروضنا',
  description: 'عروض M Creative — تشخيص واستراتيجية، إطلاق أو تطوير علامة، وشراكة إبداعية مستمرة.',
}

export default async function OffersPage() {
  const payload = await getPayload({ config })
  const [{ site, footerAbout }, offersRes] = await Promise.all([
    getShellData(),
    payload.find({ collection: 'offers', sort: 'order', limit: 100 }),
  ])

  const offers: OfferItem[] = offersRes.docs.map((o, i) => ({
    id: rowId(o.id, 'offer', i),
    index: o.index,
    title: o.title,
    whatBuys: o.whatBuys,
    scopeNote: o.scopeNote,
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout}>
      <div className="h-6" />
      <OffersSection offers={offers} sectionId="top" />
    </PageShell>
  )
}
