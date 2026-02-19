'use client'

import { motion } from 'framer-motion'
import { Mail, Clock, Zap } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import Card from '@/components/ui/Card'
import ContactForm from '@/components/ContactForm'
import GlowOrb from '@/components/GlowOrb'
import { fadeInUp, slideInRight, staggerContainer } from '@/lib/animations'

const infoCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@rhodai.ai',
    sub: 'Best for detailed inquiries',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '< 24 hours',
    sub: 'Mon–Fri, business hours',
  },
  {
    icon: Zap,
    label: 'Availability',
    value: 'Open for projects',
    sub: 'Taking new clients now',
    highlight: true,
  },
]

export default function ContactSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <GlowOrb color="cyan" size="500px" className="top-1/2 left-0 opacity-30" />

      <SectionWrapper id="contact" className="py-24">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Let&apos;s Build <GradientText>Something</GradientText>
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours
            to schedule a free discovery call.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form — takes up 3 columns */}
          <div className="lg:col-span-3">
            <Card className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </div>

          {/* Info cards — takes up 2 columns */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {infoCards.map((card) => (
              <motion.div key={card.label} variants={slideInRight}>
                <Card
                  glow={card.highlight ? 'cyan' : undefined}
                  className={`p-5 ${card.highlight ? 'border-cyan-500/20' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        card.highlight
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-0.5">{card.label}</p>
                      <p
                        className={`text-sm font-semibold ${
                          card.highlight ? 'text-cyan-400' : 'text-white'
                        }`}
                      >
                        {card.value}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}
