import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'مشروع', plural: 'مشاريعنا' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'order'],
    description: 'المشاريع المنفذة — كل مشروع له صفحة تفصيلية خاصة به',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'يُستخدم في رابط صفحة المشروع — أحرف لاتينية وشرطات فقط، مثال: hzaya-brand' },
    },
    { name: 'client', type: 'text', admin: { description: 'اسم العميل (اختياري)' } },
    { name: 'category', type: 'text', admin: { description: 'مثال: هوية بصرية، تسويق رقمي' } },
    { name: 'summary', type: 'textarea', required: true, label: 'ملخص قصير', admin: { description: 'يظهر في بطاقة المشروع بقائمة المشاريع' } },
    { name: 'description', type: 'textarea', required: true, label: 'الوصف الكامل', admin: { description: 'يظهر في صفحة المشروع التفصيلية' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'gallery',
      type: 'array',
      label: 'صور إضافية',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'team',
      type: 'array',
      label: 'فريق العمل على المشروع',
      labels: { singular: 'عضو', plural: 'أعضاء' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'يظهر في معاينة المشاريع بالصفحة الرئيسية' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'ترتيب الظهور — الأصغر يظهر أولاً' },
    },
  ],
}
