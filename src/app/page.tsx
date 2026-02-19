import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import AboutSection from '@/components/sections/AboutSection'
import LeadFinderSection from '@/components/sections/LeadFinderSection'
import PricingSection from '@/components/sections/PricingSection'
import FaqSection from '@/components/sections/FaqSection'
import ContactSection from '@/components/sections/ContactSection'
import JsonLd from '@/components/JsonLd'

export default function Home() {
  return (
    <>
      <JsonLd />
      {/* Skip to main content — accessibility + SEO */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <AboutSection />
        <LeadFinderSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
