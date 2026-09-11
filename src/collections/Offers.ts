import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'offer', plural: 'offers' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'index', 'order'],
    description: 'عروض M Creative — تظهر في صفحة العروض وفي معاينة الصفحة الرئيسية',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'index', type: 'text', required: true, admin: { description: 'مثال: 01 — نفس القيمة بكل اللغات' } },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'whatBuys', type: 'textarea', required: true, localized: true, label: 'ماذا يشتري العميل؟' },
    { name: 'scopeNote', type: 'text', required: true, localized: true, label: 'حدود النطاق' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'ترتيب الظهور — الأصغر يظهر أولاً' },
    },
  ],
}
