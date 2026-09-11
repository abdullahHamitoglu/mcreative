/** Small inline icon set — kept local instead of an icon library for the handful of one-off glyphs the design needs. */
import React from 'react'

export function ArrowIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M16.5 7H1.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6.5 1.5L1.5 7L6.5 12.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7" />
      <path d="M8.5 12.5l2.3 2.3L16 9.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StrategyIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="0.8" fill={color} />
    </svg>
  )
}

export function IdentityIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function VisualIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke={color} strokeWidth="1.6" />
      <circle cx="8.5" cy="9.5" r="1.5" stroke={color} strokeWidth="1.4" />
      <path d="M4 16l4.5-4.5a1.5 1.5 0 0 1 2.1 0L14 15l1.8-1.8a1.5 1.5 0 0 1 2.1 0L21 16" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function MarketingIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h6v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const SERVICE_ICONS = {
  strategy: StrategyIcon,
  identity: IdentityIcon,
  visual: VisualIcon,
  marketing: MarketingIcon,
} as const

export function BriefcaseIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function UserIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 20c1.6-3.8 4.6-5.7 7.5-5.7s5.9 1.9 7.5 5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function MessageIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 1 1-4.1-7.3L21 3l-1.2 4.2a8.46 8.46 0 0 1 1.2 4.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
