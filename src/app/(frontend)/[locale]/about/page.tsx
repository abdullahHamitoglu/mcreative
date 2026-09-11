import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageShell } from '@/components/site/PageShell'
import { ProcessSection } from '@/components/site/ProcessSection'
import { FoundersSection } from '@/components/site/FoundersSection'
import { Reveal } from '@/components/site/Reveal'
import { R } from '@/components/site/tokens'
import { getShellData } from '@/lib/site-data'
import { mediaUrl, rowId } from '@/lib/payload-helpers'
import { isLocale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/dictionary'
import type { AboutPageData } from '@/components/site/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isLocale(locale) ? locale : 'ar')
  return { title: dict.aboutTeaser.eyebrow, description: dict.meta.siteDescription }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  const payload = await getPayload({ config })
  const [{ site, footerAbout }, aboutPage] = await Promise.all([
    getShellData(locale),
    payload.findGlobal({ slug: 'about-page', locale }),
  ])

  const data: AboutPageData = {
    heroTitle: aboutPage.heroTitle || dict.aboutTeaser.eyebrow,
    heroSubtitle: aboutPage.heroSubtitle || '',
    heroImageUrl: mediaUrl(aboutPage.heroImage),
    story: aboutPage.story || '',
    processIntro: {
      title: aboutPage.processIntro?.title || '',
      description: aboutPage.processIntro?.description || '',
    },
    process: (aboutPage.process ?? []).map((p, i) => ({
      id: rowId(p.id, 'process', i),
      stepLabel: p.stepLabel,
      title: p.title,
      description: p.description,
    })),
    founders: (aboutPage.founders ?? []).map((f, i) => ({
      id: rowId(f.id, 'founder', i),
      name: f.name,
      role: f.role,
      bio: f.bio ?? undefined,
      photoUrl: mediaUrl(f.photo),
    })),
  }

  const storyParagraphs = data.story.split('\n').map((p) => p.trim()).filter(Boolean)

  return (
    <PageShell site={site} footerAbout={footerAbout} dict={dict} locale={locale}>
      <section id="top" className="relative z-10 px-5 pt-6 pb-10 sm:px-8">
        <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-6 lg:flex-row lg:items-stretch">
          {data.heroImageUrl && (
            <Reveal className="h-[260px] w-[260px] max-w-[70%] shrink-0 self-center overflow-hidden rounded-3xl lg:h-[320px] lg:w-[320px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroImageUrl} alt="" className="h-full w-full object-cover" />
            </Reveal>
          )}
          <Reveal className="flex flex-1 flex-col items-center justify-center gap-3 text-center lg:items-start lg:text-start" delay={0.05}>
            <span className="text-[15px] font-bold text-[#518de5]">{dict.aboutTeaser.eyebrow}</span>
            <h1 className="m-0 text-[clamp(30px,4.6vw,46px)] font-extrabold leading-[1.15] text-white">{data.heroTitle}</h1>
            {data.heroSubtitle && <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed text-[#9aa0ab]">{data.heroSubtitle}</p>}
          </Reveal>
        </div>
      </section>

      {storyParagraphs.length > 0 && (
        <section className="relative z-10 px-5 pb-10 sm:px-8">
          <Reveal className="mx-auto max-w-[1152px]">
            <div
              className="flex flex-col gap-4 p-9"
              style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
            >
              {storyParagraphs.map((p, i) => (
                <p key={i} className="m-0 max-w-[80ch] text-[15px] leading-[1.9] text-[#b0b0b8]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <ProcessSection intro={data.processIntro} process={data.process} dict={dict.process} />
      <FoundersSection founders={data.founders} dict={dict.founders} />
    </PageShell>
  )
}
