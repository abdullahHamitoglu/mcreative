export interface NavLink {
  id: string
  label: string
  href: string
}

export interface SiteSettingsData {
  siteName: string
  contact: { email?: string; whatsapp?: string }
  socials: { instagram?: string; linkedin?: string }
  nav: NavLink[]
  footerNote: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: 'strategy' | 'identity' | 'visual' | 'marketing'
}

export interface OfferItem {
  id: string
  index: string
  title: string
  whatBuys: string
  scopeNote: string
}

export interface ProcessItem {
  id: string
  stepLabel: string
  title: string
  description: string
}

export interface MarketItem {
  id: string
  stage: string
  title: string
  description: string
}

export interface FounderItem {
  id: string
  name: string
  role: string
}

export interface HomepageData {
  hero: {
    kicker: string
    title: string
    englishTagline: string
    subtitleLine1: string
    subtitleLine2: string
    visualUrl?: string
  }
  statement: {
    quote: string
    highlight: string
    cite: string
  }
  servicesHeadline: { line1: string; line2: string }
  services: ServiceItem[]
  offers: OfferItem[]
  process: ProcessItem[]
  marketsHeadline: { title: string; description: string }
  markets: MarketItem[]
  about: {
    title: string
    description: string
    founders: FounderItem[]
  }
  footerAbout: string
}
