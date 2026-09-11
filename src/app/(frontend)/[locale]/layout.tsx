import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Alexandria, Montserrat } from 'next/font/google'
import { LOCALES, isLocale, isRtl, type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import '../globals.css'

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  variable: '--font-alexandria',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)

  return {
    title: {
      default: 'M Creative',
      template: '%s | M Creative',
    },
    description: dict.meta.siteDescription,
    icons: { icon: '/assets/brand/logo-icon.svg' },
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const rtl = isRtl(locale)
  const bodyFontVar = locale === 'ar' ? 'var(--font-alexandria)' : 'var(--font-montserrat)'

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      className={`${alexandria.variable} ${montserrat.variable}`}
      style={{ '--font-sans': bodyFontVar } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  )
}
