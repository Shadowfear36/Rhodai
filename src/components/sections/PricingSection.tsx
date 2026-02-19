'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { PRICING_TIERS } from '@/lib/constants'
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function PricingSection() {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <SectionWrapper id="pricing" className="py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14"
      >
        <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
          Pricing
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Simple, <GradientText>Transparent</GradientText> Pricing
        </h2>
        <p className="mt-4 text-slate-400 max-w-lg mx-auto">
          No hidden fees. No long-term lock-in. Pick a tier or reach out for a custom quote.
        </p>
      </motion.div>

      {/* Pricing cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {PRICING_TIERS.map((tier) => (
          <motion.div key={tier.name} variants={scaleIn}>
            <div
              className={`relative h-full rounded-xl border p-6 flex flex-col gap-5 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-cyan-500/5 to-violet-500/5 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.08)]'
                  : 'bg-[#0a0a12] border-white/5 hover:border-white/10'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="cyan">Most Popular</Badge>
                </div>
              )}

              {/* Tier info */}
              <div>
                <h3
                  className="text-lg font-semibold text-white mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {tier.name}
                </h3>
                <div
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {tier.price}
                </div>
                <p className="text-sm text-slate-500">{tier.description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Features */}
              <ul className="flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                size="md"
                className="w-full justify-center"
                onClick={scrollToContact}
              >
                {tier.highlighted ? 'Get Started' : "Let's Talk"}
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom note */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-sm text-slate-600 mt-8"
      >
        All projects include a free discovery call. Prices are guidelines — final quotes depend on scope.
      </motion.p>
    </SectionWrapper>
  )
}
