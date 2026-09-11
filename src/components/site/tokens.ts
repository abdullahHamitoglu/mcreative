/**
 * Shared design constants for the M Creative homepage.
 * Palette sourced from M-Creative-Brand-Assets/m-creative-color-palette.svg.
 */

export const BLUE_DEEP = '#0d52bf'
export const BLUE = '#518de5'
export const LIME = '#c3d830'
export const ICE = '#f3f8ff'

/** Corner radii used throughout the design. */
export const R = { card: 40, inner: 24, pill: 999 } as const

export const GRADIENT_BRAND = `linear-gradient(135deg, ${BLUE_DEEP} 0%, ${BLUE} 55%, ${LIME} 100%)`

export const GLASS = 'rgba(255, 255, 255, 0.07)'
export const GLASS_STRONG = 'rgba(255, 255, 255, 0.1)'
export const GLASS_BORDER = 'rgba(255, 255, 255, 0.11)'
export const GLASS_BORDER_SOFT = 'rgba(255, 255, 255, 0.08)'

export const TEXT_MUTE = '#9aa0ab'
export const TEXT_FAINT = '#7d818c'

export const FONT_AR = 'var(--font-alexandria), sans-serif'
export const FONT_EN = 'var(--font-montserrat), sans-serif'
