import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'service', plural: 'services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    description: 'خدمات M Creative — تظهر في صفحة الخدمات وفي معاينة الصفحة الرئيسية',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'strategy',
      options: [
        { label: 'استراتيجية', value: 'strategy' },
        { label: 'أنظمة/هوية', value: 'identity' },
        { label: 'إنتاج بصري', value: 'visual' },
        { label: 'تسويق', value: 'marketing' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'ترتيب الظهور — الأصغر يظهر أولاً' },
    },
  ],
}
