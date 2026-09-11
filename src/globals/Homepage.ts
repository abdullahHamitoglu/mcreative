import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'الصفحة الرئيسية',
  admin: {
    description: 'كل محتوى الصفحة الرئيسية — من المقدمة حتى الفوتر',
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
                { name: 'kicker', type: 'text', defaultValue: 'وكالة إبداعية واستراتيجية مقرها تركيا' },
                { name: 'title', type: 'text', defaultValue: 'M Creative' },
                { name: 'englishTagline', type: 'text', defaultValue: "It's Time To Live Creatively" },
                { name: 'subtitleLine1', type: 'text', defaultValue: 'نحوّل فهم المشروع والسوق إلى هوية ومحتوى وإنتاج وتسويق،' },
                { name: 'subtitleLine2', type: 'text', defaultValue: 'ضمن خطة واضحة ومسؤولية محددة عن التنفيذ والقياس.' },
                {
                  name: 'visual',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'صورة/بانر المقدمة — اتركه فارغاً لاستخدام بانر العلامة الافتراضي' },
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
                  defaultValue: 'لا ننافس على أقل سعر؛ نبيع فهماً وقراراً وتنفيذاً متقناً، بنطاق وأتعاب واضحين.',
                },
                { name: 'highlight', type: 'text', defaultValue: 'نبيع فهماً وقراراً وتنفيذاً متقناً' },
                { name: 'cite', type: 'text', defaultValue: 'موقف M Creative السعري' },
              ],
            },
          ],
        },
        {
          label: 'الخدمات',
          fields: [
            {
              name: 'servicesHeadline',
              type: 'group',
              fields: [
                { name: 'line1', type: 'text', defaultValue: 'لنصنع' },
                { name: 'line2', type: 'text', defaultValue: 'مشروعك بإبداع' },
              ],
            },
            {
              name: 'services',
              type: 'array',
              labels: { singular: 'خدمة', plural: 'خدمات' },
              minRows: 1,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
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
              ],
            },
          ],
        },
        {
          label: 'عروضنا',
          fields: [
            {
              name: 'offers',
              type: 'array',
              labels: { singular: 'عرض', plural: 'عروض' },
              minRows: 1,
              fields: [
                { name: 'index', type: 'text', required: true, admin: { description: 'مثال: 01' } },
                { name: 'title', type: 'text', required: true },
                { name: 'whatBuys', type: 'textarea', required: true },
                { name: 'scopeNote', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'منهجنا',
          fields: [
            {
              name: 'process',
              type: 'array',
              labels: { singular: 'خطوة', plural: 'خطوات' },
              minRows: 1,
              fields: [
                { name: 'stepLabel', type: 'text', required: true, admin: { description: 'مثال: قبل التنفيذ' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'الأسواق',
          fields: [
            {
              name: 'marketsHeadline',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'نبدأ من تركيا، ونوسّع بثبات' },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue: 'ترتيب دخول مدروس، لا ترتيب لحجم الأسواق — كل مرحلة تُبنى على إثبات المرحلة التي قبلها.',
                },
              ],
            },
            {
              name: 'markets',
              type: 'array',
              labels: { singular: 'سوق', plural: 'أسواق' },
              minRows: 1,
              fields: [
                { name: 'stage', type: 'text', required: true, admin: { description: 'مثال: البداية' } },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'من نحن',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'من نحن' },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'founders',
                  type: 'array',
                  labels: { singular: 'مؤسس', plural: 'مؤسسون' },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                  ],
                },
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
              defaultValue:
                'شريك إبداعي واستراتيجي للعلامات العربية الطموحة — نربط الفهم بالتنفيذ، ضمن خطة واضحة ومسؤولية محددة عن النتائج.',
            },
          ],
        },
      ],
    },
  ],
}
