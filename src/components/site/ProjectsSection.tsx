'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { SectionHeader, ViewAllLink } from './SectionHeader'
import { SpotlightCard } from './SpotlightCard'
import { R } from './tokens'
import type { ProjectListItem } from './types'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/locales'

export function ProjectsSection({
  projects,
  dict,
  locale,
  viewAllHref,
  sectionId = 'projects',
  showEmptyState = false,
}: {
  projects: ProjectListItem[]
  dict: Dictionary['projects']
  locale: Locale
  viewAllHref?: string
  sectionId?: string
  /** Homepage teaser hides itself when empty; the dedicated /projects page shows a friendly message instead. */
  showEmptyState?: boolean
}) {
  if (!projects.length && !showEmptyState) return null

  return (
    <section id={sectionId} className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        {!projects.length && (
          <div
            className="mx-auto flex max-w-[520px] flex-col items-center gap-2 p-9 text-center"
            style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
          >
            <p className="m-0 text-base font-bold text-white">{dict.emptyTitle}</p>
            <p className="m-0 text-sm leading-relaxed text-[#9aa0ab]">{dict.emptyDescription}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <SpotlightCard style={{ borderRadius: R.card }}>
                <motion.a
                  href={`/${locale}/projects/${p.slug}`}
                  whileHover={{ y: -5 }}
                  className="flex h-full flex-col overflow-hidden border border-transparent transition-colors hover:border-[#518de5]/30"
                  style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)' }}
                >
                  <div className="relative h-[190px] w-full shrink-0 bg-black/20">
                    {p.coverImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.coverImageUrl} alt="" className="h-full w-full object-cover" />
                    )}
                    {p.category && (
                      <span
                        className="absolute top-4 inline-flex items-center px-3 py-1 text-xs font-semibold text-white"
                        style={{ insetInlineStart: 16, borderRadius: R.pill, background: '#518de5' }}
                      >
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="m-0 text-lg font-bold text-white">{p.title}</h3>
                    <p className="m-0 line-clamp-2 text-sm leading-relaxed text-[#9aa0ab]">{p.summary}</p>
                    {p.client && (
                      <p className="m-0 mt-auto pt-2 text-xs text-[#7d818c]">
                        {dict.clientLabel}: {p.client}
                      </p>
                    )}
                  </div>
                </motion.a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {viewAllHref && <ViewAllLink href={viewAllHref} label={dict.viewAll} />}
      </div>
    </section>
  )
}
