import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Rhodai handles project inquiries and optional website analytics.',
  alternates: { canonical: '/privacy/' },
  openGraph: { title: 'Privacy | Rhodai', url: '/privacy/' },
}

export default function Privacy() {
  return <main className="privacy-page">
    <Link href="/">← Back to Rhodai</Link>
    <h1>Privacy, in plain language.</h1>
    <p>Rhodai is an independent website design and development business. This page explains how information is used when you visit this website or ask about a project.</p>
    <h2>Project inquiries</h2>
    <p>If you contact me, I use the details you provide to respond and discuss your project. When the contact form is enabled, your name, email address, selected service, and message are sent through Formspree. Email links open your own email application. Please leave sensitive personal information out of your inquiry.</p>
    <p>Inquiry details are kept for correspondence and project administration as needed. You can email <a href="mailto:info@rhodai.ai">info@rhodai.ai</a> to ask about your information or request its deletion.</p>
    <h2>Optional analytics</h2>
    <p>When configured, Google Analytics loads only after you allow analytics. It helps measure page visits, project link clicks, contact link clicks, and successful form submissions. The analytics events added by Rhodai do not include your name, email, or message. Google may process technical information such as device and browser information and use cookies to distinguish visits.</p>
    <p>You can decline analytics or change your choice using the Cookie settings button when analytics is available. Your choice is saved in your browser. Advertising consent is disabled. For more information, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a>.</p>
    <h2>Website hosting and external services</h2>
    <p>The site is hosted on Cloudflare Pages. Hosting providers may process technical request information to deliver and protect the website. Project and social links take you to other websites with their own privacy practices.</p>
    <p>Read the privacy information for <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspree</a> and <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare</a>.</p>
    <h2>Questions?</h2>
    <p>Contact <a href="mailto:info@rhodai.ai">info@rhodai.ai</a>.</p>
  </main>
}
