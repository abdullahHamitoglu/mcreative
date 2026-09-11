import type { Locale } from './locales'
import { ar } from './dictionaries/ar'
import { en } from './dictionaries/en'
import { tr } from './dictionaries/tr'

export interface Dictionary {
  meta: {
    siteDescription: string
  }
  nav: {
    ctaStartProject: string
    openMenu: string
    closeMenu: string
    logoHomeLabel: string
  }
  hero: {
    pillServices: string
    pillAbout: string
    pillContact: string
    formTitle: string
    fieldName: string
    fieldEmail: string
    fieldService: string
    fieldDescription: string
    submit: string
    errorRequired: string
    errorEmail: string
    successNote: string
    /** Template containing the literal token "{name}" — interpolated client-side since it can't cross the server/client boundary as a function. */
    mailtoSubjectTemplate: string
    mailtoNameLabel: string
    mailtoEmailLabel: string
    mailtoServiceLabel: string
    mailtoDescriptionLabel: string
    mailtoDescriptionHeading: string
    emptyValue: string
  }
  services: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
  }
  offers: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
  }
  markets: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
    emptyTitle: string
    emptyDescription: string
    clientLabel: string
    teamLabel: string
    backToAll: string
    lightboxClose: string
    lightboxPrev: string
    lightboxNext: string
  }
  aboutTeaser: {
    eyebrow: string
    viewAll: string
  }
  process: {
    eyebrow: string
  }
  founders: {
    eyebrow: string
    title: string
  }
  footer: {
    /** Word order for "About {siteName}" differs by language (e.g. Turkish puts it after), so this is a function, not a fixed prefix. */
    aboutHeading: (siteName: string) => string
    socialInstagram: string
    socialLinkedin: string
    socialWhatsapp: string
    socialEmail: string
  }
  notFound: {
    projectTitle: string
    projectDescription: string
    backHome: string
  }
}

const dictionaries: Record<Locale, Dictionary> = { ar, en, tr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ar
}
