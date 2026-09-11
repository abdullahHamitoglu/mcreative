'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { SectionHeader, ViewAllLink } from './SectionHeader'
import { SERVICE_ICONS } from './icons'
import { R } from './tokens'
import type { ServiceItem } from './types'
import type { Dictionary } from '@/i18n/dictionary'

export function ServicesSection({
  services,
  dict,
  viewAllHref,
  sectionId = 'services',
}: {
  services: ServiceItem[]
  dict: Dictionary['services']
  viewAllHref?: string
  sectionId?: string
}) {
  if (!services.length) return null

  return (
    <section id={sectionId} className="relative z-10 overflow-hidden px-5 py-10 sm:px-8">
      {/* services-banner already shows "Strategy / Systems / Visual / Marketing" as colorful pills —
          used here as a dimmed full-section backdrop so its own labels read as texture. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.strategy
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-3.5 p-4.5"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: R.card }}
                >
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl" style={{ background: 'rgba(81,141,229,0.12)' }}>
                    <Icon color="#518de5" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <p className="m-0 text-xl font-bold text-white">{s.title}</p>
                    <p className="m-0 text-xs leading-relaxed text-[#9aa0ab]">{s.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {viewAllHref && <ViewAllLink href={viewAllHref} label={dict.viewAll} />}
      </div>
    </section>
  )
}
