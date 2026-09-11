import React from 'react'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { R } from './tokens'
import type { AboutPageData } from './types'
import type { Dictionary } from '@/i18n/dictionary'

export function ProcessSection({
  intro,
  process,
  dict,
}: {
  intro: AboutPageData['processIntro']
  process: AboutPageData['process']
  dict: Dictionary['process']
}) {
  if (!process.length) return null

  return (
    <section id="process" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <SectionHeader eyebrow={dict.eyebrow} title={intro.title} description={intro.description} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                className="flex h-full flex-col items-center gap-3 p-6 text-center"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <span className="text-xs font-bold tracking-[0.1em] text-[#c3d830]">{p.stepLabel}</span>
                <h3 className="m-0 text-base font-bold text-white">{p.title}</h3>
                <p className="m-0 text-[13px] leading-[1.75] text-[#b0b0b8]">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
