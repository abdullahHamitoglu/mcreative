'use client'

import React, { useState } from 'react'
import { ArrowIcon, BriefcaseIcon, MessageIcon, UserIcon } from './icons'
import { R } from './tokens'
import { Reveal } from './Reveal'
import type { HomepageData } from './types'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/locales'

interface FormState {
  name: string
  email: string
  service: string
  description: string
}

const EMPTY_FORM: FormState = { name: '', email: '', service: '', description: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function HeroSection({
  hero,
  contactEmail,
  dict,
  locale,
}: {
  hero: HomepageData['hero']
  contactEmail?: string
  dict: Dictionary['hero']
  locale: Locale
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [note, setNote] = useState('')

  const onField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name || !email) {
      setNote(dict.errorRequired)
      return
    }
    if (!EMAIL_PATTERN.test(email)) {
      setNote(dict.errorEmail)
      return
    }

    const subject = encodeURIComponent(dict.mailtoSubjectTemplate.replace('{name}', name))
    const bodyLines = [
      `${dict.mailtoNameLabel}: ${name}`,
      `${dict.mailtoEmailLabel}: ${email}`,
      `${dict.mailtoServiceLabel}: ${form.service.trim() || dict.emptyValue}`,
      '',
      dict.mailtoDescriptionHeading,
      form.description.trim() || dict.emptyValue,
    ]
    const body = encodeURIComponent(bodyLines.join('\n'))
    window.location.href = `mailto:${contactEmail || 'hello@mcreative.example'}?subject=${subject}&body=${body}`
    setNote(dict.successNote)
  }

  const pills = [
    { label: dict.pillServices, href: `/${locale}/services`, icon: <BriefcaseIcon /> },
    { label: dict.pillAbout, href: `/${locale}/about`, icon: <UserIcon /> },
    { label: dict.pillContact, href: '#start-project', icon: <MessageIcon /> },
  ]

  const fields: { key: keyof FormState; placeholder: string; type: string }[] = [
    { key: 'name', placeholder: dict.fieldName, type: 'text' },
    { key: 'email', placeholder: dict.fieldEmail, type: 'email' },
    { key: 'service', placeholder: dict.fieldService, type: 'text' },
  ]

  return (
    <section id="top" className="relative z-10 px-5 pt-2 pb-12 sm:px-8">
      <div className="mx-auto flex max-w-[1152px] flex-col items-stretch gap-7 lg:flex-row lg:items-start">

        <Reveal className="flex min-w-0 flex-1 flex-col gap-3 py-3 text-center lg:text-start" delay={0.05}>
          <p className="text-base text-white/55">{hero.kicker}</p>
          <h1 className="m-0 text-[clamp(36px,6vw,50px)] font-extrabold leading-[1.1] text-[#c3d830]">
            {hero.title}
            <span
              className="mt-1.5 block text-[0.34em] font-semibold tracking-wide text-[#518de5]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {hero.englishTagline}
            </span>
          </h1>
          <div className="mx-auto max-w-[46ch] text-[17px] leading-relaxed text-[#518de5] lg:mx-0">
            <p className="m-0">{hero.subtitleLine1}</p>
            <p>{hero.subtitleLine2}</p>
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {pills.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="inline-flex items-center gap-1.5 px-[17px] py-[9px] text-[13px] font-medium text-white transition-colors hover:bg-white/20"
                style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: R.pill }}
              >
                {p.icon}
                {p.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="w-full shrink-0 lg:w-[360px]" delay={0.1}>
          <form
            id="start-project"
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-3.5 p-7"
            style={{
              borderRadius: R.card,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.11)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
            }}
          >
            <p className="m-0 text-[17px] font-bold text-white">{dict.formTitle}</p>

            {fields.map((f) => (
              <div key={f.key} className="group relative">
                <label htmlFor={`field-${f.key}`} className="sr-only">
                  {f.placeholder}
                </label>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full transition-[border-color,box-shadow] group-focus-within:border-[#518de5] group-focus-within:shadow-[0_0_0_3px_rgba(81,141,229,0.3)]"
                  style={{ border: '1px solid rgba(81,141,229,0.3)' }}
                />
                <input
                  id={`field-${f.key}`}
                  type={f.type}
                  value={form[f.key]}
                  onChange={onField(f.key)}
                  placeholder={f.placeholder}
                  required={f.key !== 'service'}
                  className="relative h-[46px] w-full rounded-full bg-white/5 px-[21px] text-sm text-white outline-none placeholder:text-white/25"
                  style={{ borderRadius: R.pill }}
                />
              </div>
            ))}

            <div className="group relative">
              <label htmlFor="field-description" className="sr-only">
                {dict.fieldDescription}
              </label>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-[border-color,box-shadow] group-focus-within:border-[#518de5] group-focus-within:shadow-[0_0_0_3px_rgba(81,141,229,0.3)]"
                style={{ borderRadius: R.inner, border: '1px solid rgba(81,141,229,0.3)' }}
              />
              <textarea
                id="field-description"
                value={form.description}
                onChange={onField('description')}
                placeholder={dict.fieldDescription}
                rows={3}
                className="relative w-full resize-none bg-white/5 px-[21px] py-3.5 text-sm text-white outline-none placeholder:text-white/25"
                style={{ borderRadius: R.inner }}
              />
            </div>

            <button
              type="submit"
              className="relative flex h-[50px] w-full items-center justify-center gap-2 overflow-hidden font-bold text-[#05131f] transition-transform hover:-translate-y-0.5"
              style={{ borderRadius: R.pill, background: 'linear-gradient(135deg,#0d52bf 0%,#518de5 55%,#c3d830 100%)' }}
            >
              <span>{dict.submit}</span>
              <ArrowIcon color="#05131f" />
            </button>
            <p role="status" aria-live="polite" className="m-0 min-h-[14px] text-center text-[11px] text-[#9aa0ab]">
              {note}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
