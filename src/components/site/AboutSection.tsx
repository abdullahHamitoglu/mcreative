import React from 'react'
import { Reveal } from './Reveal'
import { R } from './tokens'
import type { HomepageData } from './types'

export function AboutSection({ about }: { about: HomepageData['about'] }) {
  return (
    <section id="about" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-6 lg:flex-row lg:items-center">
        <Reveal className="h-[220px] w-[220px] max-w-[70%] shrink-0 self-center lg:h-[260px] lg:w-[260px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand/logo-lime-square.svg"
            alt=""
            className="h-full w-full object-cover"
            style={{ borderRadius: R.card }}
          />
        </Reveal>
        <Reveal className="flex-1" delay={0.06}>
          <div
            className="flex h-full flex-col gap-3.5 p-9 text-center lg:text-start"
            style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
          >
            <h2 className="m-0 text-[clamp(24px,3.4vw,30px)] font-extrabold text-white">{about.title}</h2>
            <p className="m-0 max-w-[60ch] text-[15px] leading-[1.9] text-[#b0b0b8]">{about.description}</p>
            {about.founders.length > 0 && (
              <div className="mt-1.5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {about.founders.map((f) => (
                  <span
                    key={f.id}
                    className="inline-flex items-center px-[17px] py-[9px] text-[13px] font-medium text-white"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: R.pill }}
                  >
                    {f.name} — {f.role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
