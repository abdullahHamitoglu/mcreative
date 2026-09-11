import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'
import type { Locale } from '../i18n/locales'

const LOCALES: Locale[] = ['ar', 'en', 'tr']

interface ManifestImage {
  localPath: string
  alt: string
  filename: string
}

interface ManifestProject {
  slug: string
  title: Record<string, string>
  description: Record<string, string>
  featured: boolean
  category: Record<string, string>
  images: ManifestImage[]
}

async function findOrUploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  image: ManifestImage,
): Promise<{ id: string | number }> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: image.alt } },
    limit: 1,
    locale: 'ar',
  })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({
    collection: 'media',
    filePath: image.localPath,
    locale: 'ar',
    data: { alt: image.alt },
  })
}

async function importProjects() {
  const manifestPath = process.env.MANIFEST_PATH
  if (!manifestPath) throw new Error('Set MANIFEST_PATH to the moumin_import_manifest.json path')

  const manifest: ManifestProject[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const payload = await getPayload({ config })

  payload.logger.info(`Importing ${manifest.length} projects from moumin-designer…`)

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i]
    payload.logger.info(`[${i + 1}/${manifest.length}] ${entry.slug}`)

    const uploaded: { id: string | number }[] = []
    for (const image of entry.images) {
      uploaded.push(await findOrUploadMedia(payload, image))
    }
    const [coverImage, ...galleryImages] = uploaded
    if (!coverImage) {
      payload.logger.warn(`Skipping ${entry.slug} — no images`)
      continue
    }

    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: entry.slug } },
      limit: 1,
      locale: 'ar',
    })

    const baseData = {
      slug: entry.slug,
      coverImage: String(coverImage.id),
      gallery: galleryImages.map((g) => ({ image: String(g.id) })),
      featured: entry.featured,
      order: i,
    }

    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'projects',
        locale: 'ar',
        data: {
          ...baseData,
          title: entry.title.ar,
          category: entry.category.ar,
          summary: entry.description.ar,
          description: entry.description.ar,
        },
      }))

    await payload.update({ collection: 'projects', id: doc.id, locale: 'ar', data: baseData })

    for (const locale of LOCALES) {
      await payload.update({
        collection: 'projects',
        id: doc.id,
        locale,
        data: {
          title: entry.title[locale],
          category: entry.category[locale],
          summary: entry.description[locale],
          description: entry.description[locale],
        },
      })
    }
  }

  payload.logger.info('Import complete.')
  process.exit(0)
}

importProjects().catch((err) => {
  console.error(err)
  process.exit(1)
})
