import type { CollectionConfig } from 'payload'

export const Markets: CollectionConfig = {
  slug: 'markets',
  labels: { singular: 'سوق', plural: 'الأسواق' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stage', 'order'],
    description: 'خارطة الأسواق التي تعمل بها M Creative — تظهر في صفحة الأسواق',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'stage', type: 'text', required: true, localized: true, admin: { description: 'مثال: البداية' } },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'ترتيب الظهور — الأصغر يظهر أولاً' },
    },
  ],
}
