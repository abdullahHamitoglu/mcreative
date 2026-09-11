import React from 'react'
import { Reveal } from './Reveal'
import { SectionHeader, ViewAllLink } from './SectionHeader'
import { R } from './tokens'
import type { MarketItem } from './types'

export function MarketsSection({
  markets,
  viewAllHref,
  sectionId = 'markets',
}: {
  markets: MarketItem[]
  viewAllHref?: string
  sectionId?: string
}) {
  if (!markets.length) return null

  return (
    <section id={sectionId} className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <SectionHeader
          eyebrow="الأسواق"
          title="نبدأ من تركيا، ونوسّع بثبات"
          description="ترتيب دخول مدروس، لا ترتيب لحجم الأسواق — كل مرحلة تُبنى على إثبات المرحلة التي قبلها."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {markets.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <div
                className="flex h-full flex-col gap-2.5 p-5"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <span
                  className="inline-flex w-fit items-center px-3 py-[5px] text-[11.5px] font-bold text-[#c3d830]"
                  style={{ borderRadius: R.pill, background: 'rgba(195,216,48,0.14)' }}
                >
                  {m.stage}
                </span>
                <h3 className="mt-1 mb-0 text-lg font-bold text-white">{m.title}</h3>
                <p className="m-0 text-[13px] leading-[1.7] text-[#9aa0ab]">{m.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {viewAllHref && <ViewAllLink href={viewAllHref} label="كل الأسواق" />}
      </div>
    </section>
  )
}
