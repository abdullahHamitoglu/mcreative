import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ProjectsSection } from '@/components/site/ProjectsSection'
import { getShellData } from '@/lib/site-data'
import { mediaUrl, rowId } from '@/lib/payload-helpers'
import type { ProjectListItem } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'مشاريعنا',
  description: 'مشاريع نفّذتها M Creative، مع فريق العمل وراء كل مشروع.',
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config })
  const [{ site, footerAbout }, projectsRes] = await Promise.all([
    getShellData(),
    payload.find({ collection: 'projects', sort: 'order', limit: 100 }),
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
    <PageShell site={site} footerAbout={footerAbout}>
      <div className="h-6" />
      <ProjectsSection projects={projects} sectionId="top" showEmptyState />
    </PageShell>
  )
}
