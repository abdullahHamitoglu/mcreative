import React from 'react'
import { Reveal } from './Reveal'

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mx-auto mb-10 flex max-w-[640px] flex-col items-center gap-3 text-center">
      <span className="text-[15px] font-bold text-[#518de5]">{eyebrow}</span>
      <h2 className="m-0 text-[clamp(26px,4vw,36px)] font-extrabold text-white">{title}</h2>
      {description && <p className="m-0 text-[15px] leading-relaxed text-[#9aa0ab]">{description}</p>}
    </Reveal>
  )
}

export function ViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="mx-auto mt-8 flex w-fit items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
      style={{ borderRadius: 999, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {label}
      <svg width="14" height="11" viewBox="0 0 18 14" fill="none" aria-hidden="true">
        <path d="M16.5 7H1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6.5 1.5L1.5 7L6.5 12.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
