import type { Dictionary } from '../dictionary'

export const en: Dictionary = {
  meta: {
    siteDescription:
      'M Creative is a creative and strategic agency based in Turkey, connecting project and market understanding with identity, content, production, and marketing.',
  },
  nav: {
    ctaStartProject: 'Start Your Project',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    logoHomeLabel: 'Home',
  },
  hero: {
    pillServices: 'Services',
    pillAbout: 'About',
    pillContact: 'Contact',
    formTitle: 'Request a Consultation or Project',
    fieldName: 'Name',
    fieldEmail: 'Email',
    fieldService: 'Service needed',
    fieldDescription: 'A short brief about your project',
    submit: 'Send Request',
    errorRequired: 'Please fill in your name and email.',
    errorEmail: 'Please enter a valid email address.',
    successNote: 'Your email app will open to send the request.',
    mailtoSubjectTemplate: 'Project request from {name}',
    mailtoNameLabel: 'Name',
    mailtoEmailLabel: 'Email',
    mailtoServiceLabel: 'Service needed',
    mailtoDescriptionLabel: 'Project description',
    mailtoDescriptionHeading: 'Project description:',
    emptyValue: '—',
  },
  services: {
    eyebrow: 'Services',
    title: "Let's Build Your Project Creatively",
    description: 'Four core services covering the brand journey from strategy to marketing.',
    viewAll: 'All Services',
  },
  offers: {
    eyebrow: 'Our Offers',
    title: 'Three Clear Offers',
    description: 'Each offer has a predefined scope and deliverables — no surprises in delivery or pricing.',
    viewAll: 'All Offers',
  },
  markets: {
    eyebrow: 'Markets',
    title: 'Starting in Turkey, Expanding Steadily',
    description: 'A deliberate market-entry sequence, not a ranking by market size — each stage is built on proof from the one before it.',
    viewAll: 'All Markets',
  },
  projects: {
    eyebrow: 'Our Work',
    title: 'Projects We Have Delivered',
    description: 'Examples of M Creative projects — with the team behind each one.',
    viewAll: 'All Projects',
    emptyTitle: 'No projects published yet',
    emptyDescription: "We're documenting our first projects — check back soon.",
    clientLabel: 'Client',
    teamLabel: 'Team behind this project',
    backToAll: 'All Projects',
  },
  aboutTeaser: {
    eyebrow: 'About Us',
    viewAll: 'Learn more about us',
  },
  process: {
    eyebrow: 'Our Process',
  },
  founders: {
    eyebrow: 'Our Team',
    title: 'Who Leads M Creative',
  },
  footer: {
    aboutHeading: (siteName: string) => `About ${siteName}`,
    socialInstagram: 'Instagram',
    socialLinkedin: 'LinkedIn',
    socialWhatsapp: 'WhatsApp',
    socialEmail: 'Email',
  },
  notFound: {
    projectTitle: 'Project not found',
    projectDescription: 'This project is unavailable or has been removed.',
    backHome: 'Back to home',
  },
}
