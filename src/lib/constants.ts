import type { Service, ProcessStep, Stat, NavLink, PricingTier, PortfolioItem } from '@/types'

export const SITE_NAME = 'Rhodai'
export const SITE_TAGLINE = 'Smart websites. Intelligent integrations. Automated growth.'
export const SITE_URL = 'https://rhodai.ai'

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design & SEO',
    description:
      'Conversion-optimized websites built for speed, search visibility, and real business results.',
    icon: 'Globe',
    accent: 'cyan',
    features: [
      'Custom responsive design',
      'Core Web Vitals optimized',
      'On-page SEO & schema markup',
      'Google Analytics setup',
      'CMS integration (if needed)',
    ],
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description:
      'Embed LLMs, chatbots, and intelligent automation into your existing products and workflows.',
    icon: 'Sparkles',
    accent: 'violet',
    features: [
      'ChatGPT / Claude API integration',
      'Custom AI agents & assistants',
      'RAG pipelines & knowledge bases',
      'AI-powered content generation',
      'Local LLM deployment',
    ],
  },
  {
    id: 'software-integration',
    title: 'Software Integration',
    description:
      'Connect your tools. CRMs, APIs, webhooks, and automation platforms bridged seamlessly.',
    icon: 'GitMerge',
    accent: 'cyan',
    features: [
      'REST & GraphQL API integrations',
      'Zapier / Make.com workflows',
      'CRM & data pipeline setup',
      'Custom middleware & webhooks',
      'Third-party platform connectors',
    ],
  },
]

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'seqhort',
    title: 'Sequoia Horticultural Products',
    description:
      'A bulk bark and mulch supplier serving landscape architects and commercial growers across the Western U.S. since 1982.',
    url: 'https://www.seqhort.com',
    image: '/SeqHortScreenShot.png',
    video: '/SeqHortRecording.mp4',
    tags: ['Web Design', 'Agriculture'],
    accent: 'cyan',
  },
  {
    id: 'blairelectric',
    title: 'Blair Electric Services',
    description:
      'A licensed electrical contractor serving agricultural, commercial, and industrial clients across California’s Central Valley.',
    url: 'https://blairelectric.pages.dev',
    image: '/BlairElectricScreenShot.png',
    video: '/BlairElectricRecording.mp4',
    tags: ['Web Design', 'Contracting'],
    accent: 'violet',
  },
  {
    id: 'waterspectrum',
    title: 'WaterSpectrum',
    description:
      'A music production collective offering premium beats, studio sessions, mixing, and mastering for artists.',
    url: 'https://waterspectrum.us',
    image: '/WaterSpectrumScreenShot.png',
    video: '/WaterSpectrumRecording.mp4',
    tags: ['Web Design', 'Music'],
    accent: 'cyan',
  },
  {
    id: 'statsync',
    title: 'STATSYNC',
    description:
      'A real-time sports statistics platform that syncs live game data into a clean, fast dashboard for teams and fans.',
    url: 'https://sportsync.rhodai.ai/',
    video: '/STATSYNCRecording.mp4',
    poster: '/STATSYNCPoster.jpg',
    tags: ['Web Design', 'Sports Tech'],
    accent: 'violet',
  },
  {
    id: 'vmux',
    title: 'vmux',
    description:
      'An open-source Windows terminal multiplexer built for running multiple AI coding agents in parallel — split panes, persistent workspaces, and git worktrees for isolated agent branches, built with Tauri, React, and Rust.',
    url: 'https://github.com/Shadowfear36/vmux',
    icon: 'SquareTerminal',
    tags: ['Open Source', 'Rust', 'Tauri'],
    accent: 'cyan',
  },
  {
    id: 'seghiero',
    title: 'SegHiero',
    description:
      'An open-source PyTorch framework for hierarchical semantic segmentation — predicting fine, coarse, and super-coarse labels together with ResNet + DeepLabV3+ backbones and hierarchy-aware loss functions.',
    url: 'https://github.com/Shadowfear36/SegHiero',
    icon: 'Layers',
    tags: ['Open Source', 'Python', 'PyTorch'],
    accent: 'violet',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery Call',
    description:
      'We learn your goals, current stack, and challenges in a focused 30-minute call.',
  },
  {
    step: '02',
    title: 'Strategy & Proposal',
    description:
      'A clear plan with defined scope, timeline, and transparent pricing. No surprises.',
  },
  {
    step: '03',
    title: 'Build & Integrate',
    description:
      'We build fast and keep you updated. Weekly check-ins, no radio silence.',
  },
  {
    step: '04',
    title: 'Launch & Grow',
    description:
      'Go live with confidence. We stay available post-launch for questions and iterations.',
  },
]

export const STATS: Stat[] = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: 'From $500',
    description: 'Perfect for businesses that need a solid web presence fast.',
    features: [
      'Custom website design (up to 5 pages)',
      'Mobile responsive & fast',
      'On-page SEO setup',
      'Contact form + Google Analytics',
      '30-day post-launch support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: 'From $1,500',
    description: 'For businesses ready to scale with AI and automation.',
    features: [
      'Everything in Starter',
      'AI chatbot or assistant integration',
      'Software / CRM integration',
      'Ongoing feature enhancements',
      'Monthly performance reporting',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom Quote',
    description: 'Full-stack solutions tailored to complex needs.',
    features: [
      'Everything in Growth',
      'Custom AI agent development',
      'Multi-system automation builds',
      'Dedicated ongoing retainer',
      'Priority support & SLA',
    ],
    cta: "Let's Talk",
  },
]
