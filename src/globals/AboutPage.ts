import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    description: 'محتوى صفحة "من نحن" التفصيلية — القصة، منهج العمل، والمؤسسون',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'المقدمة',
          fields: [
            { name: 'heroTitle', type: 'text', localized: true, defaultValue: 'من نحن' },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
              defaultValue: 'شريك إبداعي واستراتيجي للعلامات العربية الطموحة',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'قصتنا',
          fields: [
            {
              name: 'story',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: 'فقرة أو أكثر — استخدم سطراً فارغاً للفصل بين الفقرات' },
            },
          ],
        },
        {
          label: 'منهجنا',
          fields: [
            {
              name: 'processIntro',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true, defaultValue: 'الاحتراف شيء تراه، لا مجرد وعد' },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  defaultValue: 'وضوح قبل التنفيذ، وقيادة واحدة أثناء العمل، وصدق بعد التسليم.',
                },
              ],
            },
            {
              name: 'process',
              type: 'array',
              labels: { singular: 'خطوة', plural: 'خطوات' },
              minRows: 1,
              fields: [
                { name: 'stepLabel', type: 'text', required: true, localized: true, admin: { description: 'مثال: قبل التنفيذ' } },
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', required: true, localized: true },
              ],
            },
          ],
        },
        {
          label: 'المؤسسون',
          fields: [
            {
              name: 'founders',
              type: 'array',
              labels: { singular: 'مؤسس', plural: 'مؤسسون' },
              fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'الاسم — نفس القيمة بكل اللغات' } },
                { name: 'role', type: 'text', required: true, localized: true },
                { name: 'bio', type: 'textarea', localized: true, admin: { description: 'نبذة مختصرة (اختياري)' } },
                { name: 'photo', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
