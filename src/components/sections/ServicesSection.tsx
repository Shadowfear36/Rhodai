'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import ServiceCard from '@/components/ServiceCard'
import { SERVICES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      {/* Section header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14"
      >
        <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
          What We Do
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Services Built to <GradientText>Drive Results</GradientText>
        </h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          From your first website to a fully automated lead pipeline — we build and integrate
          the systems that grow your business.
        </p>
      </motion.div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
