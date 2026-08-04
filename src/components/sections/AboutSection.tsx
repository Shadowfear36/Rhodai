'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { STATS } from '@/lib/constants'
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations'
import { SkillSphere } from '@/components/three'

const terminalLines = [
  { prompt: '>', command: 'whoami' },
  { output: 'Dylan — Full-stack dev & AI builder' },
  { prompt: '>', command: 'skills' },
  { output: "['Next.js', 'Python', 'FastAPI', 'LLMs', 'SEO']" },
  { prompt: '>', command: 'services' },
  { output: "['Web Design', 'AI Integration', 'Automation']" },
  { prompt: '>', command: 'status' },
  { output: '✓ Available for projects', highlight: true },
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6"
        >
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <Image
                src="/Dylan.jpg"
                alt="Dylan, founder of Rhodai"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
                About Me
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                The Dev Behind <GradientText>Rhodai</GradientText>
              </h2>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed">
            I&apos;m a full-stack developer and AI builder who helps small and medium businesses
            modernize their digital presence — from sleek, fast websites to intelligent automation
            that saves hours every week.
          </p>

          <a
            href="https://www.linkedin.com/in/dylan-rhinehart/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors w-fit"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column: SkillSphere on desktop, terminal on mobile */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Skill sphere — desktop only */}
          <div className="hidden lg:flex items-center justify-center" style={{ height: '360px' }}>
            <SkillSphere />
          </div>

          {/* Terminal card — mobile only */}
          <div className="lg:hidden rounded-xl border border-white/8 bg-[#090912] overflow-hidden shadow-2xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#0d0d1a]">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-slate-600 font-mono">rhodai ~ profile</span>
            </div>

            {/* Terminal body */}
            <div
              className="p-5 space-y-1.5 text-sm font-mono"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {terminalLines.map((line, i) => (
                <div key={i}>
                  {line.prompt ? (
                    <div className="flex gap-2">
                      <span className="text-cyan-500 select-none">{line.prompt}</span>
                      <span className="text-slate-300">{line.command}</span>
                    </div>
                  ) : (
                    <div
                      className={`pl-4 ${
                        line.highlight ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {line.output}
                    </div>
                  )}
                </div>
              ))}
              {/* Cursor */}
              <div className="flex gap-2 pt-1">
                <span className="text-cyan-500 select-none">{'>'}</span>
                <span className="w-2 h-4 bg-cyan-400 animate-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
