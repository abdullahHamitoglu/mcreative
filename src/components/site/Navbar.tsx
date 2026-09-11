'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FONT_EN, R } from './tokens'
import { CloseIcon, MenuIcon } from './icons'
import type { NavLink } from './types'

export function Navbar({ siteName, nav }: { siteName: string; nav: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const openBtnRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    focusable?.[0]?.focus()

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeydown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  }, [open, close])

  useEffect(() => {
    if (!open) openBtnRef.current?.focus()
  }, [open])

  return (
    <nav className="relative z-50 flex items-center justify-between px-5 py-5 sm:px-8">
      <a href="#top" className="inline-flex items-center gap-2.5" aria-label={`${siteName} — الصفحة الرئيسية`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/logo-icon.svg" alt="" className="h-9 w-9 rounded-[10px]" />
        <span style={{ fontFamily: FONT_EN }} className="text-lg font-bold text-white">
          {siteName}
        </span>
      </a>

      <div className="hidden md:flex items-center gap-2">
        {nav.map((l) => (
          <a
            key={l.id}
            href={l.href}
            className="px-4 py-2 text-[15px] text-white/60 transition-colors hover:text-white"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#start-project"
          className="ms-2 inline-flex h-[46px] items-center gap-2 px-[22px] font-bold text-white transition-[filter] hover:brightness-110"
          style={{
            background: 'rgba(255,255,255,0.13)',
            border: '1.5px solid rgba(255,255,255,0.16)',
            borderRadius: R.pill,
          }}
        >
          ابدأ مشروعك
        </a>
      </div>

      <button
        ref={openBtnRef}
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center text-white md:hidden"
        aria-label="فتح القائمة"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <MenuIcon />
      </button>

      {/*
        The outer container always stays mounted with pointer-events toggled by `open`,
        instead of being conditionally rendered — AnimatePresence only defers unmount for
        motion elements that are its *direct* children, so a plain wrapper div around the
        animated backdrop/panel would never actually unmount after closing, leaving an
        invisible full-viewport backdrop that swallows every click on the page.
      */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[100] md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <AnimatePresence>
          {open && (
            <React.Fragment key="mobile-menu-content">
              <motion.div
                key="backdrop"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />
              <motion.div
                key="panel"
                ref={panelRef}
                className="absolute top-0 bottom-0 end-0 flex w-[78%] max-w-[320px] flex-col gap-2 p-6"
                style={{ background: '#0c0b0a', borderInlineStart: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/brand/logo-icon.svg" alt="" className="h-8 w-8 rounded-lg" />
                    <span style={{ fontFamily: FONT_EN }} className="text-base font-bold text-white">
                      {siteName}
                    </span>
                  </span>
                  <button type="button" onClick={close} className="text-white" aria-label="إغلاق القائمة">
                    <CloseIcon />
                  </button>
                </div>
                {nav.map((l) => (
                  <a
                    key={l.id}
                    href={l.href}
                    onClick={close}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-[#ccc] transition-colors hover:bg-white/[0.06]"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#start-project"
                  onClick={close}
                  className="mt-2 inline-flex w-fit items-center gap-2 px-5 py-3 text-base font-bold text-white transition-[filter] hover:brightness-110"
                  style={{
                    background: 'rgba(255,255,255,0.13)',
                    border: '1.5px solid rgba(255,255,255,0.16)',
                    borderRadius: R.pill,
                  }}
                >
                  ابدأ مشروعك
                </a>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
