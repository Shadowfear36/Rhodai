import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://rhodai.ai/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://rhodai.ai/privacy/', changeFrequency: 'yearly', priority: 0.2 },
  ]
}
