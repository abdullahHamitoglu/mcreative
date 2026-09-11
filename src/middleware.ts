import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales'

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
}

/** Best-effort locale pick from the browser's Accept-Language header, falling back to the default. */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (!header) return DEFAULT_LOCALE

  const preferred = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase())
  for (const lang of preferred) {
    const short = lang.slice(0, 2)
    const match = LOCALES.find((locale) => locale === short)
    if (match) return match
  }
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathnameHasLocale(pathname)) return NextResponse.next()

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Everything except Next internals, Payload's own routes (admin/api), and static assets.
  matcher: ['/((?!_next|admin|api|assets|favicon.ico|.*\\..*).*)'],
}
