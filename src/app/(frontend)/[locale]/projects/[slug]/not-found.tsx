import React from 'react'
import Link from 'next/link'
import { DEFAULT_LOCALE } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'

// Next.js does not pass dynamic route `params` to not-found.tsx in this version, so the
// locale can't be read from the URL here — render in the site's default locale instead of
// the generic unstyled Next.js 404 fallback.
export default function ProjectNotFound() {
  const locale = DEFAULT_LOCALE
  const dict = getDictionary(locale)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-5 text-center" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="m-0 text-2xl font-extrabold text-white">{dict.notFound.projectTitle}</h1>
      <p className="m-0 max-w-md text-[15px] text-[#9aa0ab]">{dict.notFound.projectDescription}</p>
      <Link href={`/${locale}`} className="mt-2 inline-flex items-center rounded-full bg-[#518de5] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        {dict.notFound.backHome}
      </Link>
    </div>
  )
}
