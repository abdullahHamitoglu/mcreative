import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import type { Locale } from '../i18n/locales'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const LOCALES: Locale[] = ['ar', 'en', 'tr']

async function findOrUploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  altByLocale: Record<Locale, string>,
  relativeFilePath: string,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: altByLocale.ar } },
    limit: 1,
    locale: 'ar',
  })
  const doc =
    existing.docs[0] ??
    (await payload.create({
      collection: 'media',
      filePath: path.resolve(dirname, relativeFilePath),
      locale: 'ar',
      data: { alt: altByLocale.ar },
    }))
  // Write every locale explicitly, ar included — a doc found via a pre-localization seed
  // run may hold alt as a plain (unlocalized) string rather than an {ar, en, tr} map.
  for (const locale of LOCALES) {
    await payload.update({ collection: 'media', id: doc.id, locale, data: { alt: altByLocale[locale] } })
  }
  return doc
}

// ─── Site Settings ──────────────────────────────────────────────────────────

// Stable row ids: array fields are shared across locales (only their localized
// subfields vary per locale), so every locale-scoped write must reuse the same
// row id — otherwise each write creates a brand-new row and only the last
// locale written survives. See findOrUploadMedia for the equivalent pattern
// applied to a top-level localized field via a locale-independent lookup key.
const NAV_IDS = ['nav-services', 'nav-offers', 'nav-projects', 'nav-markets', 'nav-about']

const siteSettingsByLocale: Record<Locale, { nav: { id: string; label: string; href: string }[]; footerNote: string }> = {
  ar: {
    nav: [
      { id: NAV_IDS[0], label: 'الخدمات', href: '/services' },
      { id: NAV_IDS[1], label: 'عروضنا', href: '/offers' },
      { id: NAV_IDS[2], label: 'مشاريعنا', href: '/projects' },
      { id: NAV_IDS[3], label: 'الأسواق', href: '/markets' },
      { id: NAV_IDS[4], label: 'من نحن', href: '/about' },
    ],
    footerNote: 'M Creative. جميع الحقوق محفوظة.',
  },
  en: {
    nav: [
      { id: NAV_IDS[0], label: 'Services', href: '/services' },
      { id: NAV_IDS[1], label: 'Offers', href: '/offers' },
      { id: NAV_IDS[2], label: 'Projects', href: '/projects' },
      { id: NAV_IDS[3], label: 'Markets', href: '/markets' },
      { id: NAV_IDS[4], label: 'About', href: '/about' },
    ],
    footerNote: 'M Creative. All rights reserved.',
  },
  tr: {
    nav: [
      { id: NAV_IDS[0], label: 'Hizmetler', href: '/services' },
      { id: NAV_IDS[1], label: 'Tekliflerimiz', href: '/offers' },
      { id: NAV_IDS[2], label: 'Projelerimiz', href: '/projects' },
      { id: NAV_IDS[3], label: 'Pazarlar', href: '/markets' },
      { id: NAV_IDS[4], label: 'Hakkımızda', href: '/about' },
    ],
    footerNote: 'M Creative. Tüm hakları saklıdır.',
  },
}

// ─── Homepage ───────────────────────────────────────────────────────────────

const homepageByLocale: Record<
  Locale,
  {
    hero: { kicker: string; englishTagline: string; subtitleLine1: string; subtitleLine2: string }
    statement: { quote: string; highlight: string; cite: string }
    footerAbout: string
  }
> = {
  ar: {
    hero: {
      kicker: 'وكالة إبداعية واستراتيجية مقرها تركيا',
      englishTagline: "It's Time To Live Creatively",
      subtitleLine1: 'نحوّل فهم المشروع والسوق إلى هوية ومحتوى وإنتاج وتسويق،',
      subtitleLine2: 'ضمن خطة واضحة ومسؤولية محددة عن التنفيذ والقياس.',
    },
    statement: {
      quote: 'لا ننافس على أقل سعر؛ نبيع فهماً وقراراً وتنفيذاً متقناً، بنطاق وأتعاب واضحين.',
      highlight: 'نبيع فهماً وقراراً وتنفيذاً متقناً',
      cite: 'موقف M Creative السعري',
    },
    footerAbout:
      'شريك إبداعي واستراتيجي للعلامات العربية الطموحة — نربط الفهم بالتنفيذ، ضمن خطة واضحة ومسؤولية محددة عن النتائج.',
  },
  en: {
    hero: {
      kicker: 'A creative and strategic agency based in Turkey',
      englishTagline: "It's Time To Live Creatively",
      subtitleLine1: 'We turn project and market understanding into identity, content, production, and marketing,',
      subtitleLine2: 'within a clear plan and defined accountability for execution and measurement.',
    },
    statement: {
      quote: "We don't compete on the lowest price; we sell understanding, decisiveness, and polished execution, with a clear scope and fees.",
      highlight: 'we sell understanding, decisiveness, and polished execution',
      cite: "M Creative's Pricing Position",
    },
    footerAbout:
      'A creative and strategic partner for ambitious Arab brands — connecting understanding with execution, within a clear plan and defined accountability for results.',
  },
  tr: {
    hero: {
      kicker: 'Türkiye merkezli yaratıcı ve stratejik bir ajans',
      englishTagline: "It's Time To Live Creatively",
      subtitleLine1: 'Proje ve pazar anlayışını kimlik, içerik, üretim ve pazarlamaya dönüştürüyoruz,',
      subtitleLine2: 'net bir plan ve uygulama ile ölçümde belirlenmiş sorumluluk çerçevesinde.',
    },
    statement: {
      quote: "En düşük fiyatla rekabet etmiyoruz; anlayış, kararlılık ve özenli uygulama satıyoruz — net bir kapsam ve ücretle.",
      highlight: 'anlayış, kararlılık ve özenli uygulama satıyoruz',
      cite: "M Creative'in Fiyatlandırma Yaklaşımı",
    },
    footerAbout:
      "Hırslı Arap markaları için yaratıcı ve stratejik bir ortak — anlayışı uygulamaya bağlıyoruz, net bir plan ve sonuçlar için belirlenmiş sorumlulukla.",
  },
}

// ─── About Page ─────────────────────────────────────────────────────────────

const PROCESS_IDS = ['process-before', 'process-during', 'process-after']
const FOUNDER_IDS = ['founder-abdulmumin', 'founder-abdullah']

const aboutByLocale: Record<
  Locale,
  {
    heroTitle: string
    heroSubtitle: string
    story: string
    processIntro: { title: string; description: string }
    process: { id: string; stepLabel: string; title: string; description: string }[]
    founders: { id: string; name: string; role: string }[]
  }
> = {
  ar: {
    heroTitle: 'من نحن',
    heroSubtitle: 'شريك إبداعي واستراتيجي للعلامات العربية الطموحة، مقره تركيا.',
    story:
      'M Creative وكالة إبداعية واستراتيجية مقرها تركيا، يقودها فريق مؤسس يجمع بين الخبرة الإبداعية والتنفيذية.\nنعمل بنطاق واضح، ومسؤولية محددة عن التنفيذ، وتسعير شفاف — لا وعود مبالغ فيها، بل نظام عمل يستحق الثقة.\nنبدأ من علاقات المؤسسين والعرب في تركيا كسوق أول، ونوسّع بثبات كلما أثبتت كل مرحلة نفسها قبل الانتقال للتالية.',
    processIntro: {
      title: 'الاحتراف شيء تراه، لا مجرد وعد',
      description: 'وضوح قبل التنفيذ، وقيادة واحدة أثناء العمل، وصدق بعد التسليم.',
    },
    process: [
      { id: PROCESS_IDS[0], stepLabel: 'قبل التنفيذ', title: 'موجز واضح', description: 'مشكلة، جمهور، هدف، اتجاه إبداعي، ومقياس نجاح متفق عليه قبل البدء.' },
      { id: PROCESS_IDS[1], stepLabel: 'أثناء العمل', title: 'قيادة ومراجعات محددة', description: 'قائد مشروع واحد، جدول اعتماد، ونسخ موثقة، مع موافقة صريحة قبل أي توسع بالنطاق.' },
      { id: PROCESS_IDS[2], stepLabel: 'بعد التسليم', title: 'مراجعة صادقة', description: 'مراجعة لما تحقق وما لم يتحقق، دون نسب كل نتيجة إلى التصميم وحده.' },
    ],
    // name is shared (non-localized) across locales — kept in Latin transliteration
    // consistently in every locale block so it doesn't flip depending on write order.
    founders: [
      { id: FOUNDER_IDS[0], name: 'Abdulmumin', role: 'الإبداع والهوية' },
      { id: FOUNDER_IDS[1], name: 'Abdullah', role: 'التشغيل والعلاقة التجارية' },
    ],
  },
  en: {
    heroTitle: 'About Us',
    heroSubtitle: 'A creative and strategic partner for ambitious Arab brands, based in Turkey.',
    story:
      "M Creative is a creative and strategic agency based in Turkey, led by a founding team that combines creative and operational expertise.\nWe work with a clear scope, defined accountability for execution, and transparent pricing — no overblown promises, just a system of work that earns trust.\nWe start with our founders' relationships and the Arab community in Turkey as a first market, and expand steadily as each stage proves itself before moving to the next.",
    processIntro: {
      title: 'Professionalism is something you see, not just a promise',
      description: 'Clarity before execution, single ownership during the work, and honesty after delivery.',
    },
    process: [
      { id: PROCESS_IDS[0], stepLabel: 'Before Execution', title: 'A Clear Brief', description: 'Problem, audience, goal, creative direction, and an agreed success metric before starting.' },
      { id: PROCESS_IDS[1], stepLabel: 'During the Work', title: 'Clear Leadership and Reviews', description: 'A single project lead, an approval schedule, documented versions, and explicit sign-off before any scope expansion.' },
      { id: PROCESS_IDS[2], stepLabel: 'After Delivery', title: 'An Honest Review', description: "Reviewing what was achieved and what wasn't, without attributing every result to design alone." },
    ],
    founders: [
      { id: FOUNDER_IDS[0], name: 'Abdulmumin', role: 'Creative & Identity' },
      { id: FOUNDER_IDS[1], name: 'Abdullah', role: 'Operations & Client Relations' },
    ],
  },
  tr: {
    heroTitle: 'Hakkımızda',
    heroSubtitle: 'Türkiye merkezli, hırslı Arap markaları için yaratıcı ve stratejik bir ortak.',
    story:
      'M Creative, yaratıcı ve operasyonel uzmanlığı bir araya getiren bir kurucu ekip tarafından yönetilen, Türkiye merkezli yaratıcı ve stratejik bir ajanstır.\nNet bir kapsamla, uygulama için belirlenmiş sorumlulukla ve şeffaf fiyatlandırmayla çalışıyoruz — abartılı vaatler değil, güven kazanan bir çalışma sistemi sunuyoruz.\nKurucularımızın ilişkileriyle ve Türkiye\'deki Arap topluluğuyla ilk pazar olarak başlıyor, her aşama bir öncekini kanıtladıkça istikrarla büyüyoruz.',
    processIntro: {
      title: 'Profesyonellik bir vaat değil, gördüğünüz bir şeydir',
      description: 'Uygulamadan önce netlik, çalışma sırasında tek sorumluluk ve teslimattan sonra dürüstlük.',
    },
    process: [
      { id: PROCESS_IDS[0], stepLabel: 'Uygulamadan Önce', title: 'Net Bir Brief', description: 'Başlamadan önce sorun, hedef kitle, amaç, yaratıcı yön ve üzerinde anlaşılan bir başarı ölçütü.' },
      { id: PROCESS_IDS[1], stepLabel: 'Çalışma Sırasında', title: 'Net Liderlik ve İncelemeler', description: 'Tek bir proje lideri, onay takvimi, belgelenmiş sürümler ve kapsam genişlemesinden önce açık onay.' },
      { id: PROCESS_IDS[2], stepLabel: 'Teslimattan Sonra', title: 'Dürüst Bir Değerlendirme', description: 'Nelerin başarıldığını ve nelerin başarılamadığını, her sonucu yalnızca tasarıma bağlamadan değerlendirmek.' },
    ],
    founders: [
      { id: FOUNDER_IDS[0], name: 'Abdulmumin', role: 'Yaratıcılık ve Kimlik' },
      { id: FOUNDER_IDS[1], name: 'Abdullah', role: 'Operasyon ve Müşteri İlişkileri' },
    ],
  },
}

// ─── Services / Offers / Markets ────────────────────────────────────────────

type ServiceIcon = 'strategy' | 'identity' | 'visual' | 'marketing'

const servicesByLocale: Record<Locale, { title: string; description: string; icon: ServiceIcon; order: number }[]> = {
  ar: [
    { title: 'الاستراتيجية', description: 'فهم المشكلة، وتحديد التموضع والرسائل والأولويات قبل أي تنفيذ.', icon: 'strategy', order: 1 },
    { title: 'الهوية والأنظمة', description: 'بناء أو تطوير هوية بصرية متكاملة وأدلة استخدام واضحة.', icon: 'identity', order: 2 },
    { title: 'الإنتاج البصري', description: 'تصميم وتصوير ومحتوى بصري يعكس الهوية بجودة احترافية.', icon: 'visual', order: 3 },
    { title: 'التسويق', description: 'تخطيط الحملات وإدارتها الرقمية بما يخدم أهداف العلامة.', icon: 'marketing', order: 4 },
  ],
  en: [
    { title: 'Strategy', description: 'Understanding the problem, and defining positioning, messaging, and priorities before any execution.', icon: 'strategy', order: 1 },
    { title: 'Identity & Systems', description: 'Building or developing a complete visual identity with clear usage guidelines.', icon: 'identity', order: 2 },
    { title: 'Visual Production', description: 'Design, photography, and visual content that reflect the identity with professional quality.', icon: 'visual', order: 3 },
    { title: 'Marketing', description: "Planning and managing digital campaigns that serve the brand's goals.", icon: 'marketing', order: 4 },
  ],
  tr: [
    { title: 'Strateji', description: 'Herhangi bir uygulamadan önce sorunu anlamak; konumlandırma, mesajlaşma ve öncelikleri belirlemek.', icon: 'strategy', order: 1 },
    { title: 'Kimlik ve Sistemler', description: 'Eksiksiz bir görsel kimlik oluşturmak veya geliştirmek ve net kullanım kılavuzları hazırlamak.', icon: 'identity', order: 2 },
    { title: 'Görsel Üretim', description: 'Kimliği profesyonel kalitede yansıtan tasarım, fotoğrafçılık ve görsel içerik.', icon: 'visual', order: 3 },
    { title: 'Pazarlama', description: 'Markanın hedeflerine hizmet eden dijital kampanyaların planlanması ve yönetimi.', icon: 'marketing', order: 4 },
  ],
}

const offersByLocale: Record<Locale, { index: string; title: string; whatBuys: string; scopeNote: string; order: number }[]> = {
  ar: [
    { index: '01', title: 'تشخيص واستراتيجية', whatBuys: 'فهم المشكلة والتموضع والرسائل والأولويات، في وثيقة قرار واضحة.', scopeNote: 'وثيقة قرار؛ لا يشمل التنفيذ تلقائياً', order: 1 },
    { index: '02', title: 'إطلاق أو تطوير علامة', whatBuys: 'هوية وأصول ومحتوى وإنتاج لحملة محددة، بمراحل واعتمادات واضحة.', scopeNote: 'مخرجات ومراحل واعتمادات مسعّرة', order: 2 },
    { index: '03', title: 'شراكة إبداعية مستمرة', whatBuys: 'تخطيط وإنتاج وتحسين دوري لعلامتك على امتداد الوقت.', scopeNote: 'قدرة عمل محددة؛ ليست طلبات مفتوحة', order: 3 },
  ],
  en: [
    { index: '01', title: 'Diagnosis & Strategy', whatBuys: 'Understanding the problem, positioning, messaging, and priorities, in a clear decision document.', scopeNote: 'A decision document; does not automatically include execution', order: 1 },
    { index: '02', title: 'Brand Launch or Development', whatBuys: 'Identity, assets, content, and production for a specific campaign, with clear phases and approvals.', scopeNote: 'Priced deliverables, phases, and approvals', order: 2 },
    { index: '03', title: 'Ongoing Creative Partnership', whatBuys: 'Ongoing planning, production, and refinement for your brand over time.', scopeNote: 'A defined work capacity; not open-ended requests', order: 3 },
  ],
  tr: [
    { index: '01', title: 'Teşhis ve Strateji', whatBuys: 'Sorunu, konumlandırmayı, mesajlaşmayı ve öncelikleri net bir karar belgesinde anlamak.', scopeNote: 'Bir karar belgesi; otomatik olarak uygulamayı içermez', order: 1 },
    { index: '02', title: 'Marka Lansmanı veya Geliştirme', whatBuys: 'Belirli bir kampanya için kimlik, materyaller, içerik ve üretim; net aşamalar ve onaylarla.', scopeNote: 'Fiyatlandırılmış çıktılar, aşamalar ve onaylar', order: 2 },
    { index: '03', title: 'Sürekli Yaratıcı Ortaklık', whatBuys: 'Zaman içinde markanız için sürekli planlama, üretim ve iyileştirme.', scopeNote: 'Tanımlanmış bir çalışma kapasitesi; açık uçlu talepler değil', order: 3 },
  ],
}

const marketsByLocale: Record<Locale, { stage: string; title: string; description: string; order: number }[]> = {
  ar: [
    { stage: 'البداية', title: 'العرب في تركيا', description: 'علاقات المؤسسين وعرض محدد لشريحة واحدة، قبل أي توسع.', order: 1 },
    { stage: 'التوسع المدروس', title: 'سوق عربي واحد', description: 'خدمات قابلة للتسليم عن بعد، بعد إثبات البيع والتوطين والتحصيل.', order: 2 },
    { stage: 'فرصة مشروطة', title: 'سوريا', description: 'عملاء وشركات محددون ضمن شروط دفع وتحقق واضحة.', order: 3 },
    { stage: 'مسار لاحق', title: 'العملاء الأتراك', description: 'عرض ومحتوى محليان تحت العلامة الحالية، عند نضوج الطلب المتكرر.', order: 4 },
  ],
  en: [
    { stage: 'The Start', title: 'Arabs in Turkey', description: "Founders' relationships and a defined offer for a single segment, before any expansion.", order: 1 },
    { stage: 'Deliberate Expansion', title: 'A Single Arab Market', description: 'Remotely deliverable services, after proving sales, localization, and collection.', order: 2 },
    { stage: 'A Conditional Opportunity', title: 'Syria', description: 'Specific clients and companies within clear payment and verification terms.', order: 3 },
    { stage: 'A Later Path', title: 'Turkish Clients', description: 'A local offer and content under the current brand, once recurring demand matures.', order: 4 },
  ],
  tr: [
    { stage: 'Başlangıç', title: 'Türkiye\'deki Araplar', description: 'Kurucuların ilişkileri ve herhangi bir genişlemeden önce tek bir segment için tanımlanmış bir teklif.', order: 1 },
    { stage: 'Bilinçli Genişleme', title: 'Tek Bir Arap Pazarı', description: 'Satış, yerelleştirme ve tahsilatın kanıtlanmasının ardından uzaktan sunulabilen hizmetler.', order: 2 },
    { stage: 'Koşullu Bir Fırsat', title: 'Suriye', description: 'Net ödeme ve doğrulama koşulları çerçevesinde belirli müşteriler ve şirketler.', order: 3 },
    { stage: 'Sonraki Bir Yol', title: 'Türk Müşteriler', description: 'Tekrarlayan talep olgunlaştığında, mevcut marka altında yerel bir teklif ve içerik.', order: 4 },
  ],
}

async function seed() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding M Creative content (ar / en / tr)…')

  const heroVisual = await findOrUploadMedia(
    payload,
    {
      ar: 'M Creative — نمط العلامة التجريدي',
      en: 'M Creative — abstract brand pattern',
      tr: 'M Creative — soyut marka deseni',
    },
    '../../M-Creative-Brand-Assets/m-creative-abstract-logo-pattern.svg',
  )

  // Site Settings + Homepage + About Page: same document, one updateGlobal call per locale.
  for (const locale of LOCALES) {
    const s = siteSettingsByLocale[locale]
    await payload.updateGlobal({
      slug: 'site-settings',
      locale,
      data: {
        siteName: 'M Creative',
        contact: { email: 'hello@mcreative.example', whatsapp: '' },
        socials: { instagram: '', linkedin: '' },
        nav: s.nav,
        footerNote: s.footerNote,
      },
    })

    const h = homepageByLocale[locale]
    await payload.updateGlobal({
      slug: 'homepage',
      locale,
      data: {
        hero: { ...h.hero, title: 'M Creative', visual: heroVisual.id },
        statement: h.statement,
        footerAbout: h.footerAbout,
      },
    })

    const a = aboutByLocale[locale]
    await payload.updateGlobal({
      slug: 'about-page',
      locale,
      data: {
        heroTitle: a.heroTitle,
        heroSubtitle: a.heroSubtitle,
        story: a.story,
        processIntro: a.processIntro,
        process: a.process,
        founders: a.founders,
      },
    })
  }

  // Services / Offers / Markets: matched by a locale-independent key (order), then every
  // locale — including ar — is written explicitly via a locale-scoped update. A doc found
  // via a pre-localization seed run may hold its title/description as a plain (unlocalized)
  // string rather than an {ar, en, tr} map, so ar cannot be assumed already-correct just
  // because the doc already exists — it must be (re)written just like en/tr.
  for (let i = 0; i < servicesByLocale.ar.length; i++) {
    const ar = servicesByLocale.ar[i]
    const existing = await payload.find({ collection: 'services', where: { order: { equals: ar.order } }, limit: 1, locale: 'ar' })
    const doc = existing.docs[0] ?? (await payload.create({ collection: 'services', locale: 'ar', data: ar }))
    for (const locale of LOCALES) {
      const t = servicesByLocale[locale][i]
      await payload.update({ collection: 'services', id: doc.id, locale, data: { title: t.title, description: t.description } })
    }
  }

  for (let i = 0; i < offersByLocale.ar.length; i++) {
    const ar = offersByLocale.ar[i]
    const existing = await payload.find({ collection: 'offers', where: { order: { equals: ar.order } }, limit: 1, locale: 'ar' })
    const doc = existing.docs[0] ?? (await payload.create({ collection: 'offers', locale: 'ar', data: ar }))
    for (const locale of LOCALES) {
      const t = offersByLocale[locale][i]
      await payload.update({ collection: 'offers', id: doc.id, locale, data: { title: t.title, whatBuys: t.whatBuys, scopeNote: t.scopeNote } })
    }
  }

  for (let i = 0; i < marketsByLocale.ar.length; i++) {
    const ar = marketsByLocale.ar[i]
    const existing = await payload.find({ collection: 'markets', where: { order: { equals: ar.order } }, limit: 1, locale: 'ar' })
    const doc = existing.docs[0] ?? (await payload.create({ collection: 'markets', locale: 'ar', data: ar }))
    for (const locale of LOCALES) {
      const t = marketsByLocale[locale][i]
      await payload.update({ collection: 'markets', id: doc.id, locale, data: { stage: t.stage, title: t.title, description: t.description } })
    }
  }

  payload.logger.info(
    'Seed complete for ar/en/tr. Note: the "Projects" collection was left empty on purpose — add real projects with real client/team credit from /admin rather than seeding placeholder case studies.',
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
