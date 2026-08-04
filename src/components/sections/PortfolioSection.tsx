'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { PORTFOLIO_ITEMS } from '@/lib/constants'
import { fadeInUp, scaleIn } from '@/lib/animations'

export default function PortfolioSection() {
  return (
    <SectionWrapper id="portfolio">
      {/* Section header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14"
      >
        <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
          Our Work
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Recent <GradientText>Portfolio</GradientText>
        </h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          A few of the sites we&apos;ve designed and shipped for real businesses.
        </p>
      </motion.div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1 }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
              <Card glow={item.accent} className="h-full p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-lg font-semibold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      item.accent === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                    }`}
                  />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant={item.accent}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
