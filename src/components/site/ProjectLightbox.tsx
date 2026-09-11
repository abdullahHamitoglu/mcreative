'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CloseIcon } from './icons'
import type { Dictionary } from '@/i18n/dictionary'

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProjectLightbox({
  images,
  index,
  onClose,
  onNavigate,
  dict,
}: {
  images: string[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
  dict: Pick<Dictionary['projects'], 'lightboxClose' | 'lightboxPrev' | 'lightboxNext'>
}) {
  const [dragStartX, setDragStartX] = useState<number | null>(null)

  const goPrev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate])
  const goNext = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  }, [onClose, goPrev, goNext])

  return (
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.lightboxClose}
          className="absolute top-5 text-white/80 transition-colors hover:text-white"
          style={{ insetInlineEnd: 20 }}
        >
          <CloseIcon size={26} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label={dict.lightboxPrev}
              className="absolute start-3 flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:start-6"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label={dict.lightboxNext}
              className="absolute end-3 flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:end-6"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}

        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-h-[85vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => setDragStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (dragStartX === null) return
            const delta = e.changedTouches[0].clientX - dragStartX
            if (Math.abs(delta) > 50) (delta > 0 ? goPrev : goNext)()
            setDragStartX(null)
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" />
        </motion.div>

        {images.length > 1 && (
          <div className="absolute bottom-5 text-sm text-white/60">
            {index + 1} / {images.length}
          </div>
        )}
      </motion.div>
  )
}
