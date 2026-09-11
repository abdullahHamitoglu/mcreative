'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { SpotlightCard } from './SpotlightCard'
import { R } from './tokens'
import type { ProjectListItem } from './types'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/locales'

function groupByCategory(projects: ProjectListItem[]): { category: string | null; items: ProjectListItem[] }[] {
  const groups: { category: string | null; items: ProjectListItem[] }[] = []
  const indexByCategory = new Map<string, number>()

  for (const p of projects) {
    const key = p.category?.trim() || null
    if (key === null) {
      groups.push({ category: null, items: [p] })
      continue
    }
    const existingIndex = indexByCategory.get(key)
    if (existingIndex === undefined) {
      indexByCategory.set(key, groups.length)
      groups.push({ category: key, items: [p] })
    } else {
      groups[existingIndex].items.push(p)
    }
  }
  return groups
}

export function ProjectsListSection({
  projects,
  dict,
  locale,
}: {
  projects: ProjectListItem[]
  dict: Dictionary['projects']
  locale: Locale
}) {
  const groups = groupByCategory(projects)

  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-8">
      {groups.map((group, gi) => (
        <div key={group.category ?? `ungrouped-${gi}`} className="flex flex-col gap-4">
          {group.category && (
            <div
              className="sticky top-4 z-20 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-xl"
              style={{ borderRadius: R.pill, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.13)' }}
            >
              {group.category}
              <span className="text-xs font-normal text-[#9aa0ab]">{group.items.length}</span>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.05, 0.25)}>
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
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="m-0 text-lg font-bold text-white text-nowrap whitespace-nowrap overflow-hidden text-ellipsis">{p.title}</h3>
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
        </div>
      ))}
    </div>
  )
}
