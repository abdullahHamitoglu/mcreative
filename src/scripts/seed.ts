import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function findOrUploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  alt: string,
  relativeFilePath: string,
) {
  const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({
    collection: 'media',
    filePath: path.resolve(dirname, relativeFilePath),
    data: { alt },
  })
}

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding M Creative content…')

  const heroVisual = await findOrUploadMedia(
    payload,
    'M Creative — نمط العلامة التجريدي',
    '../../M-Creative-Brand-Assets/m-creative-abstract-logo-pattern.svg',
  )

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'M Creative',
      contact: {
        email: 'hello@mcreative.example',
        whatsapp: '',
      },
      socials: {
        instagram: '',
        linkedin: '',
      },
      nav: [
        { label: 'الخدمات', href: '/services' },
        { label: 'عروضنا', href: '/offers' },
        { label: 'مشاريعنا', href: '/projects' },
        { label: 'الأسواق', href: '/markets' },
        { label: 'من نحن', href: '/about' },
      ],
      footerNote: 'M Creative. جميع الحقوق محفوظة.',
    },
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        kicker: 'وكالة إبداعية واستراتيجية مقرها تركيا',
        title: 'M Creative',
        englishTagline: "It's Time To Live Creatively",
        subtitleLine1: 'نحوّل فهم المشروع والسوق إلى هوية ومحتوى وإنتاج وتسويق،',
        subtitleLine2: 'ضمن خطة واضحة ومسؤولية محددة عن التنفيذ والقياس.',
        visual: heroVisual.id,
      },
      statement: {
        quote: 'لا ننافس على أقل سعر؛ نبيع فهماً وقراراً وتنفيذاً متقناً، بنطاق وأتعاب واضحين.',
        highlight: 'نبيع فهماً وقراراً وتنفيذاً متقناً',
        cite: 'موقف M Creative السعري',
      },
      footerAbout:
        'شريك إبداعي واستراتيجي للعلامات العربية الطموحة — نربط الفهم بالتنفيذ، ضمن خطة واضحة ومسؤولية محددة عن النتائج.',
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroTitle: 'من نحن',
      heroSubtitle: 'شريك إبداعي واستراتيجي للعلامات العربية الطموحة، مقره تركيا.',
      story:
        'M Creative وكالة إبداعية واستراتيجية مقرها تركيا، يقودها فريق مؤسس يجمع بين الخبرة الإبداعية والتنفيذية.\nنعمل بنطاق واضح، ومسؤولية محددة عن التنفيذ، وتسعير شفاف — لا وعود مبالغ فيها، بل نظام عمل يستحق الثقة.\nنبدأ من علاقات المؤسسين والعرب في تركيا كسوق أول، ونوسّع بثبات كلما أثبتت كل مرحلة نفسها قبل الانتقال للتالية.',
      processIntro: {
        title: 'الاحتراف شيء تراه، لا مجرد وعد',
        description: 'وضوح قبل التنفيذ، وقيادة واحدة أثناء العمل، وصدق بعد التسليم.',
      },
      process: [
        { stepLabel: 'قبل التنفيذ', title: 'موجز واضح', description: 'مشكلة، جمهور، هدف، اتجاه إبداعي، ومقياس نجاح متفق عليه قبل البدء.' },
        { stepLabel: 'أثناء العمل', title: 'قيادة ومراجعات محددة', description: 'قائد مشروع واحد، جدول اعتماد، ونسخ موثقة، مع موافقة صريحة قبل أي توسع بالنطاق.' },
        { stepLabel: 'بعد التسليم', title: 'مراجعة صادقة', description: 'مراجعة لما تحقق وما لم يتحقق، دون نسب كل نتيجة إلى التصميم وحده.' },
      ],
      founders: [
        { name: 'عبدالمؤمن', role: 'الإبداع والهوية' },
        { name: 'عبدالله', role: 'التشغيل والعلاقة التجارية' },
      ],
    },
  })

  const services = [
    { title: 'الاستراتيجية', description: 'فهم المشكلة، وتحديد التموضع والرسائل والأولويات قبل أي تنفيذ.', icon: 'strategy', order: 1 },
    { title: 'الهوية والأنظمة', description: 'بناء أو تطوير هوية بصرية متكاملة وأدلة استخدام واضحة.', icon: 'identity', order: 2 },
    { title: 'الإنتاج البصري', description: 'تصميم وتصوير ومحتوى بصري يعكس الهوية بجودة احترافية.', icon: 'visual', order: 3 },
    { title: 'التسويق', description: 'تخطيط الحملات وإدارتها الرقمية بما يخدم أهداف العلامة.', icon: 'marketing', order: 4 },
  ] as const

  for (const service of services) {
    const existing = await payload.find({ collection: 'services', where: { title: { equals: service.title } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'services', data: service })
  }

  const offers = [
    {
      index: '01',
      title: 'تشخيص واستراتيجية',
      whatBuys: 'فهم المشكلة والتموضع والرسائل والأولويات، في وثيقة قرار واضحة.',
      scopeNote: 'وثيقة قرار؛ لا يشمل التنفيذ تلقائياً',
      order: 1,
    },
    {
      index: '02',
      title: 'إطلاق أو تطوير علامة',
      whatBuys: 'هوية وأصول ومحتوى وإنتاج لحملة محددة، بمراحل واعتمادات واضحة.',
      scopeNote: 'مخرجات ومراحل واعتمادات مسعّرة',
      order: 2,
    },
    {
      index: '03',
      title: 'شراكة إبداعية مستمرة',
      whatBuys: 'تخطيط وإنتاج وتحسين دوري لعلامتك على امتداد الوقت.',
      scopeNote: 'قدرة عمل محددة؛ ليست طلبات مفتوحة',
      order: 3,
    },
  ]

  for (const offer of offers) {
    const existing = await payload.find({ collection: 'offers', where: { title: { equals: offer.title } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'offers', data: offer })
  }

  const markets = [
    { stage: 'البداية', title: 'العرب في تركيا', description: 'علاقات المؤسسين وعرض محدد لشريحة واحدة، قبل أي توسع.', order: 1 },
    { stage: 'التوسع المدروس', title: 'سوق عربي واحد', description: 'خدمات قابلة للتسليم عن بعد، بعد إثبات البيع والتوطين والتحصيل.', order: 2 },
    { stage: 'فرصة مشروطة', title: 'سوريا', description: 'عملاء وشركات محددون ضمن شروط دفع وتحقق واضحة.', order: 3 },
    { stage: 'مسار لاحق', title: 'العملاء الأتراك', description: 'عرض ومحتوى محليان تحت العلامة الحالية، عند نضوج الطلب المتكرر.', order: 4 },
  ]

  for (const market of markets) {
    const existing = await payload.find({ collection: 'markets', where: { title: { equals: market.title } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'markets', data: market })
  }

  payload.logger.info(
    'Seed complete. Note: the "مشاريعنا" (Projects) collection was left empty on purpose — add real projects with real client/team credit from /admin rather than seeding placeholder case studies.',
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
