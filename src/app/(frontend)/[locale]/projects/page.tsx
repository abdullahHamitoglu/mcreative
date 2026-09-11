import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ProjectsSection } from '@/components/site/ProjectsSection'
import { getShellData } from '@/lib/site-data'
import { mediaUrl, rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { ProjectListItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'ar')
  return { title: dict.projects.eyebrow, description: dict.projects.description }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })
  const [{ site, footerAbout }, projectsRes] = await Promise.all([
    getShellData(locale),
    payload.find({ collection: 'projects', sort: 'order', limit: 100, locale }),
  ])

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
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <div className="h-6" />
      <ProjectsSection projects={projects} dict={dict.projects} locale={locale} sectionId="top" showEmptyState />
    </PageShell>
  )
}
