// JSON-LD Structured Data for Google Rich Results
// Renders as <script type="application/ld+json"> in the page head

const SITE_URL = 'https://rhodai.ai'

// 1. Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Rhodai',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.svg`,
    width: 200,
    height: 60,
  },
  description:
    'Rhodai provides web design, AI integration, software integration, and lead generation services to help businesses grow online.',
  sameAs: [
    'https://twitter.com/rhodai',
    'https://linkedin.com/company/rhodai',
    'https://github.com/rhodai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@rhodai.ai',
    contactType: 'customer service',
    availableLanguage: 'English',
    hoursAvailable: 'Mo-Fr 09:00-18:00',
  },
}

// 2. WebSite Schema (enables Google Sitelinks Search Box)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Rhodai',
  description: 'Smart websites. Intelligent integrations. Automated growth.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
}

// 3. WebPage Schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'Rhodai | Web Design, AI Integration & Lead Generation',
  description:
    'Rhodai builds fast websites, integrates AI, connects software tools, and delivers targeted leads. Modern digital solutions for growing businesses.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
    ],
  },
}

// 4. Person Schema (About section)
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dylan',
  jobTitle: 'Full-Stack Developer & AI Builder',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  url: SITE_URL,
  sameAs: [
    'https://linkedin.com/in/dylan',
    'https://github.com/dylan',
  ],
  knowsAbout: [
    'Web Design',
    'Search Engine Optimization',
    'Artificial Intelligence',
    'Machine Learning',
    'Next.js',
    'Python',
    'FastAPI',
    'Lead Generation',
    'Software Integration',
  ],
}

// 5. Professional Services Schema
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rhodai Services',
  description: 'Digital services offered by Rhodai',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-web-design`,
        name: 'Web Design & SEO',
        description:
          'Conversion-optimized, responsive websites built for speed, performance, and search engine visibility. Includes on-page SEO, Core Web Vitals optimization, and Google Analytics setup.',
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Web Design and SEO',
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer',
          price: '500',
          priceCurrency: 'USD',
          description: 'Custom website design starting from $500',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-ai-integration`,
        name: 'AI Integration',
        description:
          'Embed large language models, AI chatbots, and intelligent automation into your existing products and business workflows. Services include ChatGPT/Claude API integration, custom AI agents, RAG pipelines, and local LLM deployment.',
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'AI Integration and Automation',
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer',
          price: '1500',
          priceCurrency: 'USD',
          description: 'AI integration services starting from $1,500/month',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-software-integration`,
        name: 'Software Integration',
        description:
          'Connect your business tools through REST and GraphQL APIs, Zapier/Make.com workflows, CRM integrations, custom middleware, and third-party platform connectors.',
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Software Integration',
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-lead-generation`,
        name: 'Automated Lead Generation System',
        description:
          'We build and deploy a custom AI-powered lead generation system inside your business, based on the proprietary LeadFinder engine. It automatically discovers, audits, and scores prospects in your niche and feeds them into your outreach workflow — fully automated and owned by you.',
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Lead Generation Automation',
        areaServed: 'Worldwide',
      },
    },
  ],
}

// 6. HowTo Schema (Process steps — excellent for rich results)
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Rhodai Works: From Discovery to Launch',
  description:
    'The simple, transparent process for working with Rhodai on your web design, AI integration, or lead generation project.',
  totalTime: 'P2W',
  supply: [],
  tool: [],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Discovery Call',
      text: 'We learn your goals, current tech stack, and challenges in a focused 30-minute call.',
      url: `${SITE_URL}/#process`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Strategy & Proposal',
      text: 'You receive a clear plan with defined scope, timeline, and transparent pricing. No surprises.',
      url: `${SITE_URL}/#process`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Build & Integrate',
      text: "We build fast and keep you updated with weekly check-ins throughout the project.",
      url: `${SITE_URL}/#process`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Launch & Grow',
      text: 'Go live with confidence. We stay available post-launch for questions and continued iterations.',
      url: `${SITE_URL}/#process`,
    },
  ],
}

// 7. FAQ Schema (excellent for Google featured snippets)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Rhodai offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rhodai offers four core services: Web Design & SEO (custom responsive websites optimized for search), AI Integration (embedding LLMs and chatbots into your business), Software Integration (connecting your tools via APIs and automation platforms), and Automated Lead Generation — where we build and deploy a custom AI-powered prospecting system inside your business using the proprietary LeadFinder engine.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website design starts from $500 for a custom 5-page responsive website with SEO setup. Growth packages including AI integration and a custom LeadFinder deployment start from $1,500. Enterprise solutions are priced on a custom quote basis. All projects start with a free discovery call.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is LeadFinder and how does it work for my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "LeadFinder is a proprietary AI-powered prospecting engine built by Rhodai. Rather than delivering leads manually, Rhodai deploys a custom version of the system inside your own infrastructure — configured for your industry and target cities. It automatically discovers businesses, audits their websites, scores them with AI, and feeds qualified prospects into your outreach workflow. You own it outright with no ongoing fees.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary by scope. A standard website typically takes 1–3 weeks. AI integrations and software integrations range from 1–6 weeks depending on complexity. The process starts with a free 30-minute discovery call.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer post-launch support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All projects include 30 days of post-launch support. Growth and Enterprise plans include ongoing monthly support, maintenance, and continuous improvements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you integrate AI into my existing business tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Rhodai specializes in integrating AI into existing workflows, including ChatGPT and Claude API integrations, custom AI agents, knowledge base RAG pipelines, CRM AI automation, and local LLM deployment for privacy-sensitive businesses.',
      },
    },
  ],
}

export default function JsonLd() {
  const schemas = [
    organizationSchema,
    websiteSchema,
    webPageSchema,
    personSchema,
    servicesSchema,
    howToSchema,
    faqSchema,
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
