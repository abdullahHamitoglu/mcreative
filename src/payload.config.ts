import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Offers } from './collections/Offers'
import { Markets } from './collections/Markets'
import { Projects } from './collections/Projects'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'
import { AboutPage } from './globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const env = process.env as Record<string, string | undefined>

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/logo',
        Icon: '/components/admin/icon',
      },
    },
    meta: {
      title: 'M Creative — Admin',
      description: 'M Creative content admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/assets/brand/logo-icon.svg',
        },
      ],
    },
  },
  collections: [Users, Media, Services, Offers, Markets, Projects],
  globals: [SiteSettings, Homepage, AboutPage],
  localization: {
    locales: [
      { label: 'العربية', code: 'ar', rtl: true },
      { label: 'English', code: 'en' },
      { label: 'Türkçe', code: 'tr' },
    ],
    defaultLocale: 'ar',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET || '',
  email: nodemailerAdapter({
    defaultFromAddress: env.EMAIL_FROM_ADDRESS || 'no-reply@mcreative.example',
    defaultFromName: env.EMAIL_FROM_NAME || 'M Creative',
    ...(env.SMTP_HOST
      ? {
          transportOptions: {
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT || 587),
            secure: env.SMTP_SECURE === 'true',
            ...(env.SMTP_USER && env.SMTP_PASS
              ? { auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } }
              : {}),
          },
        }
      : {}),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: env.DATABASE_URI || '',
  }),
})
