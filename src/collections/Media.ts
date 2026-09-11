import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'media'),
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
    ],
    adminThumbnail: ({ doc }): string | false => {
      const docUrl = typeof doc.url === 'string' ? doc.url : ''
      if (doc.mimeType === 'image/svg+xml') return docUrl || false
      if (doc.sizes && typeof doc.sizes === 'object' && 'thumbnail' in doc.sizes) {
        const sizes = doc.sizes as Record<string, { url?: string } | undefined>
        return sizes.thumbnail?.url || docUrl || false
      }
      return docUrl || false
    },
    modifyResponseHeaders({ headers }) {
      if (headers.get('content-type') === 'application/xml') {
        headers.set('content-type', 'image/svg+xml; charset=utf-8')
      }
      return headers
    },
  },
}
