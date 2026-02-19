'use client'

import { motion } from 'framer-motion'
import { Target, Check } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/GlowOrb'
import { RadarScan } from '@/components/three'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const topFeatures = [
  'We build & deploy LeadFinder inside your own infrastructure',
  'AI automatically discovers, audits & scores prospects',
  'Integrated directly into your outreach workflow or CRM',
]

export default function LeadFinderSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <GlowOrb color="violet" size="600px" className="top-1/2 left-1/4 opacity-50" />
      <GlowOrb color="cyan" size="400px" className="top-1/2 right-1/4 opacity-40" />

      <SectionWrapper className="py-24">
        {/* Gradient border card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          {/* Inner gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-5"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-violet-400" />
                </div>
                <Badge variant="violet">Proprietary Technology</Badge>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Your Own Pipeline.{' '}
                <GradientText>Fully Automated.</GradientText>
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed">
                LeadFinder is the AI prospecting engine I built to run my own business. Instead of
                selling you leads, we deploy a custom version of it <em>inside your business</em> —
                configured for your niche, plugged into your workflow, and running automatically
                from day one. You own it completely.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-2.5">
                {topFeatures.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Your Own LeadFinder
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Radar visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-6"
            >
              {/* Radar canvas */}
              <div
                className="relative w-full max-w-xs mx-auto"
                style={{ height: '280px' }}
              >
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)',
                  }}
                />
                <RadarScan />
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-500 text-center font-mono">
                LeadFinder — scanning for prospects
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
