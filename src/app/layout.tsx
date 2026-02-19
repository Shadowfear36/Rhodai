import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rhodai.ai'),

  title: {
    default: 'Rhodai | Web Design, AI Integration & Lead Generation',
    template: '%s | Rhodai',
  },
  description:
    'Rhodai builds fast, conversion-optimized websites, integrates AI into your business workflows, connects your software tools, and deploys automated lead generation systems. Modern digital solutions for growing businesses.',

  keywords: [
    'web design',
    'web design services',
    'SEO services',
    'AI integration',
    'AI business automation',
    'software integration',
    'lead generation service',
    'freelance web developer',
    'Next.js developer',
    'custom website design',
    'AI chatbot integration',
    'CRM integration',
    'digital marketing',
    'small business website',
    'conversion rate optimization',
  ],

  authors: [{ name: 'Dylan', url: 'https://rhodai.ai' }],
  creator: 'Dylan',
  publisher: 'Rhodai',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://rhodai.ai',
  },

  openGraph: {
    title: 'Rhodai | Web Design, AI Integration & Lead Generation',
    description:
      'Fast websites, AI integrations, software automation, and AI-powered lead generation. Everything your business needs to scale.',
    url: 'https://rhodai.ai',
    siteName: 'Rhodai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rhodai — Web Design, AI Integration & Lead Generation',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rhodai | Web Design, AI Integration & Lead Generation',
    description: 'Smart websites. Intelligent integrations. Automated growth.',
    images: ['/og-image.png'],
    creator: '@rhodai',
    site: '@rhodai',
  },

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#050508" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050508] text-slate-50 antialiased">{children}</body>
    </html>
  )
}
