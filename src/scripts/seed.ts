import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding M Creative content…')

  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'M Creative — نمط العلامة التجريدي' } },
    limit: 1,
  })

  const heroVisual =
    existingMedia.docs[0] ??
    (await payload.create({
      collection: 'media',
      filePath: path.resolve(dirname, '../../M-Creative-Brand-Assets/m-creative-abstract-logo-pattern.svg'),
      data: { alt: 'M Creative — نمط العلامة التجريدي' },
    }))

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
        { label: 'الخدمات', href: '#services' },
        { label: 'عروضنا', href: '#offers' },
        { label: 'منهجنا', href: '#process' },
        { label: 'الأسواق', href: '#markets' },
        { label: 'من نحن', href: '#about' },
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
      servicesHeadline: { line1: 'لنصنع', line2: 'مشروعك بإبداع' },
      services: [
        { title: 'الاستراتيجية', description: 'فهم المشكلة، وتحديد التموضع والرسائل والأولويات قبل أي تنفيذ.', icon: 'strategy' },
        { title: 'الهوية والأنظمة', description: 'بناء أو تطوير هوية بصرية متكاملة وأدلة استخدام واضحة.', icon: 'identity' },
        { title: 'الإنتاج البصري', description: 'تصميم وتصوير ومحتوى بصري يعكس الهوية بجودة احترافية.', icon: 'visual' },
        { title: 'التسويق', description: 'تخطيط الحملات وإدارتها الرقمية بما يخدم أهداف العلامة.', icon: 'marketing' },
      ],
      offers: [
        {
          index: '01',
          title: 'تشخيص واستراتيجية',
          whatBuys: 'فهم المشكلة والتموضع والرسائل والأولويات، في وثيقة قرار واضحة.',
          scopeNote: 'وثيقة قرار؛ لا يشمل التنفيذ تلقائياً',
        },
        {
          index: '02',
          title: 'إطلاق أو تطوير علامة',
          whatBuys: 'هوية وأصول ومحتوى وإنتاج لحملة محددة، بمراحل واعتمادات واضحة.',
          scopeNote: 'مخرجات ومراحل واعتمادات مسعّرة',
        },
        {
          index: '03',
          title: 'شراكة إبداعية مستمرة',
          whatBuys: 'تخطيط وإنتاج وتحسين دوري لعلامتك على امتداد الوقت.',
          scopeNote: 'قدرة عمل محددة؛ ليست طلبات مفتوحة',
        },
      ],
      process: [
        { stepLabel: 'قبل التنفيذ', title: 'موجز واضح', description: 'مشكلة، جمهور، هدف، اتجاه إبداعي، ومقياس نجاح متفق عليه قبل البدء.' },
        { stepLabel: 'أثناء العمل', title: 'قيادة ومراجعات محددة', description: 'قائد مشروع واحد، جدول اعتماد، ونسخ موثقة، مع موافقة صريحة قبل أي توسع بالنطاق.' },
        { stepLabel: 'بعد التسليم', title: 'مراجعة صادقة', description: 'مراجعة لما تحقق وما لم يتحقق، دون نسب كل نتيجة إلى التصميم وحده.' },
      ],
      marketsHeadline: {
        title: 'نبدأ من تركيا، ونوسّع بثبات',
        description: 'ترتيب دخول مدروس، لا ترتيب لحجم الأسواق — كل مرحلة تُبنى على إثبات المرحلة التي قبلها.',
      },
      markets: [
        { stage: 'البداية', title: 'العرب في تركيا', description: 'علاقات المؤسسين وعرض محدد لشريحة واحدة، قبل أي توسع.' },
        { stage: 'التوسع المدروس', title: 'سوق عربي واحد', description: 'خدمات قابلة للتسليم عن بعد، بعد إثبات البيع والتوطين والتحصيل.' },
        { stage: 'فرصة مشروطة', title: 'سوريا', description: 'عملاء وشركات محددون ضمن شروط دفع وتحقق واضحة.' },
        { stage: 'مسار لاحق', title: 'العملاء الأتراك', description: 'عرض ومحتوى محليان تحت العلامة الحالية، عند نضوج الطلب المتكرر.' },
      ],
      about: {
        title: 'من نحن',
        description:
          'M Creative وكالة إبداعية واستراتيجية مقرها تركيا، يقودها فريق مؤسس يجمع بين الخبرة الإبداعية والتنفيذية. نعمل بنطاق واضح، ومسؤولية محددة عن التنفيذ، وتسعير شفاف — لا وعود مبالغ فيها، بل نظام عمل يستحق الثقة.',
        founders: [
          { name: 'عبدالمؤمن', role: 'الإبداع والهوية' },
          { name: 'عبدالله', role: 'التشغيل والعلاقة التجارية' },
        ],
      },
      footerAbout:
        'شريك إبداعي واستراتيجي للعلامات العربية الطموحة — نربط الفهم بالتنفيذ، ضمن خطة واضحة ومسؤولية محددة عن النتائج.',
    },
  })

  payload.logger.info('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
