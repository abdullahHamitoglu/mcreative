import React from 'react'
import type { Metadata } from 'next'
import { Alexandria, Montserrat } from 'next/font/google'
import './globals.css'

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  variable: '--font-alexandria',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'M Creative | وكالة إبداعية واستراتيجية',
    template: '%s | M Creative',
  },
  description:
    'M Creative وكالة إبداعية واستراتيجية مقرها تركيا، تربط فهم المشروع والسوق بالهوية والمحتوى والإنتاج والتسويق.',
  icons: { icon: '/assets/brand/logo-icon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
