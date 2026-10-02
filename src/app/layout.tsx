import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

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
    default: 'Rhodai | Custom Website Design & Development',
    template: '%s | Rhodai',
  },
  description:
    'Custom website design and development for small and growing businesses. Work directly with Dylan to build a responsive website with thoughtful design and SEO foundations.',

  keywords: [
    'web design',
    'web design services',
    'SEO services',
    'AI integration',
    'AI business automation',
    'software integration',
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
    canonical: '/',
  },

  openGraph: {
    title: 'Rhodai | Custom Website Design & Development',
    description:
      'Your business. Its next big move. Custom websites with thoughtful design, responsive development, and SEO foundations.',
    url: 'https://rhodai.ai',
    siteName: 'Rhodai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1672,
        height: 941,
        alt: 'Rhodai — Custom Website Design & Development',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rhodai | Custom Website Design & Development',
    description: 'Thoughtful website design and development for growing businesses.',
    images: ['/og-image.png'],
    creator: '@rhodai_',
    site: '@rhodai_',
  },

  icons: {
    apple: '/apple-touch-icon.png',
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  category: 'technology',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
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
      <body>{children}<Analytics /></body>
    </html>
  )
}
