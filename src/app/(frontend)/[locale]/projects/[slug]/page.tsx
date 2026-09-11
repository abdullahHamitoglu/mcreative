import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { Reveal } from '@/components/site/Reveal'
import { ProjectGallery } from '@/components/site/ProjectGallery'
import { R } from '@/components/site/tokens'
import { getShellData } from '@/lib/site-data'
import { mediaUrl } from '@/lib/payload-helpers'
import { isLocale, type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { ProjectDetail } from '@/components/site/types'

export const dynamic = 'force-dynamic'

async function getProject(slug: string, locale: Locale) {
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, locale })
  return res.docs[0] ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const project = await getProject(slug, locale)
  if (!project) return { title: dict.notFound.projectTitle }
  return { title: project.title, description: project.summary }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const [{ site, footerAbout }, projectDoc] = await Promise.all([getShellData(locale), getProject(slug, locale)])

  if (!projectDoc) notFound()

  const project: ProjectDetail = {
    id: projectDoc.id,
    slug: projectDoc.slug,
    title: projectDoc.title,
    client: projectDoc.client ?? undefined,
    category: projectDoc.category ?? undefined,
    summary: projectDoc.summary,
    description: projectDoc.description,
    coverImageUrl: mediaUrl(projectDoc.coverImage, 'full'),
    galleryUrls: (projectDoc.gallery ?? []).map((g) => mediaUrl(g.image, 'full')).filter((u): u is string => Boolean(u)),
    team: (projectDoc.team ?? []).map((t) => ({ name: t.name, role: t.role })),
  }

  const descriptionParagraphs = project.description.split('\n').map((p) => p.trim()).filter(Boolean)
  const stackedImages = [project.coverImageUrl, ...project.galleryUrls].filter((u): u is string => Boolean(u))

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <section id="top" className="relative z-10 px-5 pt-6 pb-8 sm:px-8">
        <div className="mx-auto max-w-[1152px]">
          <a
            href={`/${locale}/projects`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#7d818c] transition-colors hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="ltr:-scale-x-100">
              <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {dict.projects.backToAll}
          </a>
          <Reveal>
            {project.category && (
              <span
                className="mb-3 inline-flex items-center px-3 py-1 text-xs font-semibold text-white"
                style={{ borderRadius: R.pill, background: '#518de5' }}
              >
                {project.category}
              </span>
            )}
            <h1 className="m-0 text-[clamp(28px,4.4vw,44px)] font-extrabold leading-[1.15] text-white">{project.title}</h1>
            {project.client && (
              <p className="mt-2 mb-0 text-sm text-[#7d818c]">
                {dict.projects.clientLabel}: {project.client}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {stackedImages.length > 0 && (
        <section className="relative z-10 px-5 pb-10 sm:px-8">
          <ProjectGallery images={stackedImages} title={project.title} dict={dict.projects} />
        </section>
      )}

      <section className="relative z-10 px-5 pb-10 sm:px-8">
        <div className="mx-auto flex max-w-[1152px] flex-col gap-5 lg:flex-row">
          {descriptionParagraphs.length > 0 && (
            <Reveal className="flex-[1.6]">
              <div
                className="flex h-full flex-col gap-4 p-9"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                {descriptionParagraphs.map((p, i) => (
                  <p key={i} className="m-0 text-[15px] leading-[1.9] text-[#b0b0b8]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          )}

          {project.team.length > 0 && (
            <Reveal className="flex-1" delay={0.06}>
              <div
                className="flex h-full flex-col gap-4 p-7"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <p className="m-0 text-sm font-bold text-[#518de5]">{dict.projects.teamLabel}</p>
                <div className="flex flex-col gap-3">
                  {project.team.map((member, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      <span className="text-sm font-semibold text-white">{member.name}</span>
                      <span className="text-xs text-[#9aa0ab]">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageShell>
  )
}
