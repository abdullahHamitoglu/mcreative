import { getPayload } from 'payload'
import config from '@payload-config'
import { normalizeUrl, rowId } from './payload-helpers'
import type { SiteSettingsData } from '@/components/site/types'

/** Site settings + footer copy — every page needs both to render the shared Navbar/Footer shell. */
export async function getShellData(): Promise<{ site: SiteSettingsData; footerAbout: string }> {
  const payload = await getPayload({ config })

  const [siteSettings, homepage] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'homepage' }),
  ])

  const site: SiteSettingsData = {
    siteName: siteSettings.siteName || 'M Creative',
    contact: {
      email: siteSettings.contact?.email ?? undefined,
      whatsapp: siteSettings.contact?.whatsapp ?? undefined,
    },
    socials: {
      instagram: normalizeUrl(siteSettings.socials?.instagram),
      linkedin: normalizeUrl(siteSettings.socials?.linkedin),
    },
    nav: (siteSettings.nav ?? []).map((n, i) => ({ id: rowId(n.id, 'nav', i), label: n.label, href: n.href })),
    footerNote: siteSettings.footerNote || 'M Creative. جميع الحقوق محفوظة.',
  }

  return { site, footerAbout: homepage.footerAbout || '' }
}
