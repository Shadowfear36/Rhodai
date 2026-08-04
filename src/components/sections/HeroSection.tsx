'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import GradientText from '@/components/ui/GradientText'
import GlowOrb from '@/components/GlowOrb'
import { NeuralNetwork } from '@/components/three'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — Web Design, AI Integration & Software Integration Services"
    >
      {/* Three.js Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <NeuralNetwork />
      </div>
      {/* Subtle violet tint orb */}
      <GlowOrb color="violet" size="600px" className="bottom-0 right-0 opacity-25" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12"
      >
        {/* Availability badge */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          <Badge variant="green" className="text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for New Projects
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Build Smarter.{' '}
          <GradientText>Grow Faster.</GradientText>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Custom web design & SEO, AI integration, and software automation —
          everything your business needs to grow, in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('#services')}
          >
            View Services
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection('#contact')}
          >
            Book a Free Call
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '30+', label: 'Projects Delivered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => scrollToSection('#services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer animate-float"
        aria-label="Scroll to services"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </section>
  )
}
