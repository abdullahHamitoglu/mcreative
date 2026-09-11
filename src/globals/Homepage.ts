import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home Page',
  admin: {
    description:
      'محتوى المقدمة والموقف السعري فقط — الخدمات والعروض والأسواق ومشاريعنا لها أقسام (Collections) منفصلة، ومن نحن لها صفحة منفصلة',
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
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', localized: true, defaultValue: 'وكالة إبداعية واستراتيجية مقرها تركيا' },
                { name: 'title', type: 'text', defaultValue: 'M Creative', admin: { description: 'اسم العلامة — نفس القيمة بكل اللغات عادةً' } },
                { name: 'englishTagline', type: 'text', localized: true, defaultValue: "It's Time To Live Creatively" },
                { name: 'subtitleLine1', type: 'text', localized: true, defaultValue: 'نحوّل فهم المشروع والسوق إلى هوية ومحتوى وإنتاج وتسويق،' },
                { name: 'subtitleLine2', type: 'text', localized: true, defaultValue: 'ضمن خطة واضحة ومسؤولية محددة عن التنفيذ والقياس.' },
                {
                  name: 'visual',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'صورة/بانر المقدمة — اتركه فارغاً لعدم عرض صورة' },
                },
              ],
            },
          ],
        },
        {
          label: 'الموقف السعري',
          fields: [
            {
              name: 'statement',
              type: 'group',
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  localized: true,
                  defaultValue: 'لا ننافس على أقل سعر؛ نبيع فهماً وقراراً وتنفيذاً متقناً، بنطاق وأتعاب واضحين.',
                },
                { name: 'highlight', type: 'text', localized: true, defaultValue: 'نبيع فهماً وقراراً وتنفيذاً متقناً' },
                { name: 'cite', type: 'text', localized: true, defaultValue: 'موقف M Creative السعري' },
              ],
            },
          ],
        },
        {
          label: 'الفوتر',
          fields: [
            {
              name: 'footerAbout',
              type: 'textarea',
              localized: true,
              defaultValue:
                'شريك إبداعي واستراتيجي للعلامات العربية الطموحة — نربط الفهم بالتنفيذ، ضمن خطة واضحة ومسؤولية محددة عن النتائج.',
            },
          ],
        },
      ],
    },
  ],
}
