import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ServicesSection } from '@/components/site/ServicesSection'
import { getShellData } from '@/lib/site-data'
import { rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { ServiceItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'ar')
  return { title: dict.services.eyebrow, description: dict.services.description }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })
  const [{ site, footerAbout }, servicesRes] = await Promise.all([
    getShellData(locale),
    payload.find({ collection: 'services', sort: 'order', limit: 100, locale }),
  ])

  const services: ServiceItem[] = servicesRes.docs.map((s, i) => ({
    id: rowId(s.id, 'service', i),
    title: s.title,
    description: s.description,
    icon: s.icon || 'strategy',
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <div className="h-6" />
      <ServicesSection services={services} dict={dict.services} sectionId="top" />
    </PageShell>
  )
}
