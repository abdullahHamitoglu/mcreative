import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'إعدادات الموقع',
  admin: {
    description: 'اسم الشركة، بيانات التواصل، وروابط التواصل الاجتماعي',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'M Creative',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'التواصل',
      fields: [
        { name: 'email', type: 'email', admin: { description: 'البريد المستخدم في نموذج التواصل' } },
        {
          name: 'whatsapp',
          type: 'text',
          admin: { description: 'رقم واتساب مع رمز الدولة، بدون علامة + أو مسافات — مثال: 905xxxxxxxxx' },
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      label: 'التواصل الاجتماعي',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          admin: { description: 'رابط كامل — مثال: https://instagram.com/mcreative', placeholder: 'https://instagram.com/username' },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: { description: 'رابط كامل — مثال: https://linkedin.com/company/mcreative', placeholder: 'https://linkedin.com/company/name' },
        },
      ],
    },
    {
      name: 'nav',
      type: 'array',
      label: 'روابط القائمة',
      labels: { singular: 'رابط', plural: 'روابط' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true, admin: { description: 'مثال: /services — بدون بادئة اللغة، تُضاف تلقائياً' } },
      ],
    },
    {
      name: 'footerNote',
      type: 'text',
      localized: true,
      admin: { description: 'نص حقوق النشر — سيتم إلحاق السنة تلقائياً' },
      defaultValue: 'M Creative. جميع الحقوق محفوظة.',
    },
  ],
}
