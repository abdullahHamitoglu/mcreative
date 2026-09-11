import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { MarketsSection } from '@/components/site/MarketsSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import type { MarketItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'الأسواق',
  description: 'خارطة الأسواق التي تعمل بها M Creative، من تركيا وحتى التوسع العربي.',
}

export default async function MarketsPage() {
  const payload = await getPayload({ config })
  const [{ site, footerAbout }, marketsRes] = await Promise.all([
    getShellData(),
    payload.find({ collection: 'markets', sort: 'order', limit: 100 }),
  ])

  const markets: MarketItem[] = marketsRes.docs.map((m, i) => ({
    id: rowId(m.id, 'market', i),
    stage: m.stage,
    title: m.title,
    description: m.description,
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout}>
      <div className="h-6" />
      <MarketsSection markets={markets} sectionId="top" />
    </PageShell>
  )
}
