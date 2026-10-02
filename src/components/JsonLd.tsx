const site = 'https://rhodai.ai'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${site}/#organization`, name: 'Rhodai', url: site,
        logo: `${site}/RhodaiIconMark.png`,
        description: 'Independent website design and development for small and growing businesses.',
        email: 'info@rhodai.ai',
      },
      {
        '@type': 'WebSite', '@id': `${site}/#website`, name: 'Rhodai', url: site,
        publisher: { '@id': `${site}/#organization` },
      },
      {
        '@type': 'WebPage', '@id': `${site}/#webpage`, url: site,
        name: 'Rhodai | Custom Website Design & Development',
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
      },
      {
        '@type': 'Person', name: 'Dylan', jobTitle: 'Website Designer & Developer',
        worksFor: { '@id': `${site}/#organization` },
        sameAs: ['https://www.linkedin.com/in/dylan-rhinehart/', 'https://github.com/Shadowfear36'],
      },
      {
        '@type': 'Service', name: 'Website Design & Development',
        provider: { '@id': `${site}/#organization` },
        description: 'Custom website design, responsive development, and on-page SEO setup.',
        offers: { '@type': 'Offer', price: '500', priceCurrency: 'USD', description: 'Website projects start from $500. Final quotes depend on scope.' },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
}
