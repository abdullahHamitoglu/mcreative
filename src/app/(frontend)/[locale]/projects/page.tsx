import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ProjectsListSection } from '@/components/site/ProjectsListSection'
import { SectionHeader } from '@/components/site/SectionHeader'
import { R } from '@/components/site/tokens'
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
    coverImageUrl: mediaUrl(p.coverImage, 'card'),
  }))

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <section id="top" className="relative z-10 px-5 py-10 sm:px-8">
        <SectionHeader eyebrow={dict.projects.eyebrow} title={dict.projects.title} description={dict.projects.description} />

        {projects.length > 0 ? (
          <ProjectsListSection projects={projects} dict={dict.projects} locale={locale} />
        ) : (
          <div
            className="mx-auto flex max-w-[520px] flex-col items-center gap-2 p-9 text-center"
            style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
          >
            <p className="m-0 text-base font-bold text-white">{dict.projects.emptyTitle}</p>
            <p className="m-0 text-sm leading-relaxed text-[#9aa0ab]">{dict.projects.emptyDescription}</p>
          </div>
        )}
      </section>
    </PageShell>
  )
}
