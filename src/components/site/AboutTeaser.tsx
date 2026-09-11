import React from 'react'
import { Reveal } from './Reveal'
import { ArrowIcon } from './icons'
import { R, GRADIENT_BRAND, BLUE, LIME } from './tokens'
import type { Dictionary } from '@/i18n/dictionary'

export function AboutTeaser({ story, dict, aboutHref }: { story: string; dict: Dictionary['aboutTeaser']; aboutHref: string }) {
  const firstParagraph = story.split('\n').find((p) => p.trim().length > 0) ?? story

  return (
    <section id="about" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <Reveal>
          <div
            className="relative overflow-hidden p-8 sm:p-12 lg:p-14"
            style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 end-[-110px] h-80 w-80 rounded-full opacity-[0.18] blur-[80px]"
              style={{ background: GRADIENT_BRAND }}
            />

            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
              <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-9">
                <span
                  className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold"
                  style={{ background: 'rgba(81,141,229,0.12)', color: BLUE }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                  {dict.eyebrow}
                </span>

                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="hidden shrink-0 lg:block">
                  <defs>
                    <linearGradient id="about-mark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={BLUE} />
                      <stop offset="100%" stopColor={LIME} />
                    </linearGradient>
                  </defs>
                  <rect x="6" y="6" width="34" height="34" rx="12" stroke="url(#about-mark)" strokeWidth="2.4" />
                  <rect x="24" y="24" width="34" height="34" rx="12" fill="url(#about-mark)" opacity="0.85" />
                </svg>
              </div>

              <div className="border-s-2 ps-6 sm:ps-8" style={{ borderColor: 'rgba(81,141,229,0.3)' }}>
                <p className="m-0 max-w-[62ch] text-start text-[clamp(19px,2.6vw,27px)] font-semibold leading-[1.65] text-white">
                  {firstParagraph}
                </p>

                <a
                  href={aboutHref}
                  className="group mt-7 inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
                >
                  {dict.viewAll}
                  <span className="inline-flex transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1">
                    <ArrowIcon size={14} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
