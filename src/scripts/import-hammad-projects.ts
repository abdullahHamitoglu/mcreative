import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'
import type { Locale } from '../i18n/locales'

const LOCALES: Locale[] = ['ar', 'en', 'tr']

const CATEGORY: Record<Locale, string> = {
  ar: 'تطوير المواقع',
  en: 'Web Development',
  tr: 'Web Geliştirme',
}

interface ManifestImage {
  localPath: string
  alt: string
  filename: string
}

interface ManifestProject {
  slug: string
  title: string
  summary: string
  description: string
  client: string
  liveUrl: string
  featured: boolean
  order: number
  images: ManifestImage[]
}

async function findOrUploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  image: ManifestImage,
): Promise<{ id: string | number }> {
  // Dedup by the local source filename (unique per distinct source media doc — many entries in
  // this dataset share generic alt text like "Safaraq" across genuinely different screenshots,
  // which previously caused unrelated images to collapse into a single uploaded media doc).
  const sourceFilename = path.basename(image.localPath)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: sourceFilename } },
    limit: 1,
    locale: 'ar',
  })
  if (existing.docs[0]) return existing.docs[0]
  const alt = image.alt || image.filename
  return payload.create({
    collection: 'media',
    filePath: image.localPath,
    locale: 'ar',
    data: { alt },
  })
}

async function importProjects() {
  const manifestPath = process.env.MANIFEST_PATH
  if (!manifestPath) throw new Error('Set MANIFEST_PATH to the hammad_import_manifest.json path')

  const manifest: ManifestProject[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const payload = await getPayload({ config })

  // Continue ordering after the existing (moumin-designer) projects rather than colliding with them.
  const existingCount = (await payload.find({ collection: 'projects', limit: 1 })).totalDocs
  const orderOffset = existingCount

  payload.logger.info(`Importing ${manifest.length} projects from abdullahhammad.com…`)

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
      client: entry.client || undefined,
      liveUrl: entry.liveUrl || undefined,
      coverImage: String(coverImage.id),
      gallery: galleryImages.map((g) => ({ image: String(g.id) })),
      featured: entry.featured,
      order: orderOffset + entry.order,
    }

    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'projects',
        locale: 'ar',
        data: {
          ...baseData,
          title: entry.title,
          category: CATEGORY.ar,
          summary: entry.summary,
          description: entry.description,
        },
      }))

    await payload.update({ collection: 'projects', id: doc.id, locale: 'ar', data: baseData })

    for (const locale of LOCALES) {
      await payload.update({
        collection: 'projects',
        id: doc.id,
        locale,
        data: {
          title: entry.title,
          category: CATEGORY[locale],
          summary: entry.summary,
          description: entry.description,
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
