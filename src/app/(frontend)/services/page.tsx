import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ServicesSection } from '@/components/site/ServicesSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import type { ServiceItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'الخدمات',
  description: 'خدمات M Creative — استراتيجية، هوية وأنظمة، إنتاج بصري، وتسويق.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  const [{ site, footerAbout }, servicesRes] = await Promise.all([
    getShellData(),
    payload.find({ collection: 'services', sort: 'order', limit: 100 }),
  ])

  const services: ServiceItem[] = servicesRes.docs.map((s, i) => ({
    id: rowId(s.id, 'service', i),
    title: s.title,
    description: s.description,
    icon: s.icon || 'strategy',
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout}>
      <div className="h-6" />
      <ServicesSection services={services} sectionId="top" />
    </PageShell>
  )
}
