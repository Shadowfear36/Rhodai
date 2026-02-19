'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import type { ProcessStep as ProcessStepType } from '@/types'

interface ProcessStepProps {
  step: ProcessStepType
  index: number
  isLast: boolean
}

export default function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-4 flex-1"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.15 }}
    >
      <div className="flex md:flex-col items-center gap-4 w-full md:w-auto">
        {/* Step content */}
        <div className="flex-1 md:flex-none">
          <div
            className="text-3xl font-bold font-mono text-cyan-500/60 mb-2 leading-none"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {step.step}
          </div>
          <h3
            className="text-base font-semibold text-white mb-1.5"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {step.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">
            {step.description}
          </p>
        </div>

        {/* Connector line — shown on desktop between steps */}
        {!isLast && (
          <div className="hidden md:block flex-1 h-px mt-4 bg-gradient-to-r from-cyan-500/30 via-violet-500/20 to-transparent min-w-[40px]" />
        )}
      </div>
    </motion.div>
  )
}
