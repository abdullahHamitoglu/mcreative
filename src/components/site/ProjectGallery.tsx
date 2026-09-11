'use client'

import React, { useState } from 'react'
import { Reveal } from './Reveal'
import { ProjectLightbox } from './ProjectLightbox'
import { R } from './tokens'
import type { Dictionary } from '@/i18n/dictionary'

export function ProjectGallery({
  images,
  title,
  dict,
}: {
  images: string[]
  title: string
  dict: Pick<Dictionary['projects'], 'lightboxClose' | 'lightboxPrev' | 'lightboxNext'>
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!images.length) return null

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden">
        {images.map((url, i) => (
          <Reveal key={`${url}-${i}`} delay={Math.min(i * 0.04, 0.3)} className="overflow-hidden">
            <button type="button" onClick={() => setOpenIndex(i)} className="block w-full cursor-zoom-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={title} className="h-auto w-full" />
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <ProjectLightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} dict={dict} />
      )}
    </>
  )
}
