'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import ProcessStep from '@/components/ProcessStep'
import { PROCESS_STEPS } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="process" className="py-24">
      {/* Divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Section header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-16"
      >
        <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
          The Process
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          How It <GradientText>Works</GradientText>
        </h2>
        <p className="mt-4 text-slate-400 max-w-lg mx-auto">
          A simple, transparent process from first call to launch day — and beyond.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStep
            key={step.step}
            step={step}
            index={index}
            isLast={index === PROCESS_STEPS.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
