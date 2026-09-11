import React from 'react'
import { Reveal } from './Reveal'
import { SectionHeader, ViewAllLink } from './SectionHeader'
import { CheckCircleIcon } from './icons'
import { R } from './tokens'
import type { OfferItem } from './types'

export function OffersSection({
  offers,
  viewAllHref,
  sectionId = 'offers',
}: {
  offers: OfferItem[]
  viewAllHref?: string
  sectionId?: string
}) {
  if (!offers.length) return null

  return (
    <section id={sectionId} className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <SectionHeader
          eyebrow="عروضنا"
          title="ثلاثة عروض مفهومة"
          description="كل عرض له نطاق ومخرجات محددة سلفاً — لا مفاجآت في التسليم أو التسعير."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.06}>
              <article
                className="flex h-full flex-col gap-3.5 p-[30px]"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <span className="text-[13px] font-bold tracking-[0.08em] text-[#518de5]">{o.index}</span>
                <h3 className="m-0 text-[21px] font-bold text-white">{o.title}</h3>
                <p className="m-0 flex-1 text-sm leading-[1.75] text-[#b0b0b8]">{o.whatBuys}</p>
                <div className="flex items-start gap-2 border-t pt-3.5 text-[12.5px] leading-relaxed text-[#9aa0ab]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <span className="mt-0.5 shrink-0 text-[#c3d830]">
                    <CheckCircleIcon />
                  </span>
                  <span>{o.scopeNote}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {viewAllHref && <ViewAllLink href={viewAllHref} label="كل العروض" />}
      </div>
    </section>
  )
}
