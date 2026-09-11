import React from 'react'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { R } from './tokens'
import type { FounderItem } from './types'

export function FoundersSection({ founders }: { founders: FounderItem[] }) {
  if (!founders.length) return null

  return (
    <section id="founders" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <SectionHeader eyebrow="فريقنا" title="من يقود M Creative" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.08}>
              <div
                className="flex h-full flex-col items-center gap-3 p-8 text-center sm:flex-row sm:items-start sm:text-start"
                style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
              >
                <div className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full" style={{ background: 'rgba(81,141,229,0.15)' }}>
                  {f.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.photoUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="m-0 text-xl font-bold text-white">{f.name}</h3>
                  <p className="m-0 mt-1 text-sm font-semibold text-[#518de5]">{f.role}</p>
                  {f.bio && <p className="m-0 mt-2 text-sm leading-relaxed text-[#9aa0ab]">{f.bio}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
