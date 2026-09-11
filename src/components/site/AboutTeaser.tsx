import React from 'react'
import { Reveal } from './Reveal'
import { ViewAllLink } from './SectionHeader'
import { R } from './tokens'
import type { Dictionary } from '@/i18n/dictionary'

export function AboutTeaser({ story, dict, aboutHref }: { story: string; dict: Dictionary['aboutTeaser']; aboutHref: string }) {
  const firstParagraph = story.split('\n').find((p) => p.trim().length > 0) ?? story

  return (
    <section id="about" className="relative z-10 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-[1152px]">
        <Reveal>
          <div
            className="flex flex-col items-center gap-4 p-10 text-center"
            style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
          >
            <span className="text-[15px] font-bold text-[#518de5]">{dict.eyebrow}</span>
            <p className="m-0 max-w-[70ch] text-[15px] leading-[1.9] text-[#b0b0b8]">{firstParagraph}</p>
            <ViewAllLink href={aboutHref} label={dict.viewAll} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
