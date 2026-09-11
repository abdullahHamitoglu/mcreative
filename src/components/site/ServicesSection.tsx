'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { ArrowIcon, SERVICE_ICONS } from './icons'
import { R } from './tokens'
import type { HomepageData } from './types'

export function ServicesSection({
  headline,
  services,
}: {
  headline: HomepageData['servicesHeadline']
  services: HomepageData['services']
}) {
  return (
    <section id="services" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-5 lg:flex-row lg:items-stretch">
        <Reveal className="flex-1">
          <div
            className="relative flex h-full min-h-[260px] flex-col justify-between gap-6 overflow-hidden p-8"
            style={{
              borderRadius: R.card,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* The services-banner graphic already shows "Strategy / Systems / Visual / Marketing" as
                colorful pills — used here as a dimmed full-bleed background so its own labels read as
                texture behind our Arabic copy, instead of competing with it. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/assets/brand/services-banner.svg)' }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, rgba(8,8,10,0.88), rgba(8,8,10,0.72))' }}
            />
            <div className="relative">
              <p className="m-0 text-[clamp(30px,4.4vw,42px)] font-bold leading-[1.2] text-white">
                {headline.line1}
                <br />
                {headline.line2}
              </p>
            </div>
            <a
              href="#start-project"
              className="relative inline-flex w-fit items-center gap-3 px-6 py-3 text-lg font-bold text-white transition-opacity hover:opacity-85"
              style={{ borderRadius: 33, background: 'rgba(255,255,255,0.1)' }}
            >
              اطلب خدمة
              <ArrowIcon size={16} />
            </a>
          </div>
        </Reveal>

        <div className="grid flex-[1.4] grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon] ?? SERVICE_ICONS.strategy
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-3.5 p-[18px]"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: R.card }}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl" style={{ background: 'rgba(81,141,229,0.12)' }}>
                      <Icon color="#518de5" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 self-center">
                      <p className="m-0 text-xl font-bold text-white">{s.title}</p>
                      <p className="m-0 line-clamp-2 text-xs leading-relaxed text-[#9aa0ab]">{s.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
