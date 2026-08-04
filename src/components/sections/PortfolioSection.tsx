'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Layers, SquareTerminal, type LucideIcon } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { PORTFOLIO_ITEMS } from '@/lib/constants'
import { fadeInUp, scaleIn } from '@/lib/animations'
import type { PortfolioItem } from '@/types'

const ICON_MAP: Record<string, LucideIcon> = {
  SquareTerminal,
  Layers,
}

function PortfolioMedia({
  item,
  videoRef,
  isPlaying,
}: {
  item: PortfolioItem
  videoRef: React.RefObject<HTMLVideoElement | null>
  isPlaying: boolean
}) {
  // Icon-only placeholder — open source projects with no live screenshot
  if (item.icon) {
    const Icon = ICON_MAP[item.icon]
    return (
      <div
        className={`relative w-full aspect-[16/9] overflow-hidden border-b border-white/5 flex items-center justify-center ${
          item.accent === 'cyan' ? 'bg-cyan-500/5' : 'bg-violet-500/5'
        }`}
        style={{
          backgroundImage:
            item.accent === 'cyan'
              ? 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
      >
        <Icon
          className={`w-14 h-14 ${item.accent === 'cyan' ? 'text-cyan-400/70' : 'text-violet-400/70'}`}
          strokeWidth={1.5}
        />
      </div>
    )
  }

  // Video with no static screenshot — poster shows frame one until played
  if (item.video && !item.image) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/5">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
    )
  }

  // Screenshot with a video overlay that fades in while playing
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/5">
      {item.image && (
        <Image
          src={item.image}
          alt={`${item.title} website screenshot`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top"
        />
      )}
      {item.video && (
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const isGithub = item.url.includes('github.com')
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = () => {
    const video = videoRef.current
    if (!video) return
    setIsPlaying(true)
    video.currentTime = 0
    video.play().catch(() => {})
  }

  const stop = () => {
    const video = videoRef.current
    if (!video) return
    setIsPlaying(false)
    video.pause()
    video.currentTime = 0
  }

  // On touch devices there's no hover, so play/pause the video as it scrolls
  // into and out of view instead.
  useEffect(() => {
    if (!item.video) return
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (supportsHover) return

    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
        } else {
          stop()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.video])

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1 }}
    >
      <a
        ref={cardRef}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
        onMouseEnter={item.video ? play : undefined}
        onMouseLeave={item.video ? stop : undefined}
      >
        <Card glow={item.accent} className="h-full overflow-hidden flex flex-col gap-4">
          <PortfolioMedia item={item} videoRef={videoRef} isPlaying={isPlaying} />

          <div className="p-6 pt-0 flex flex-col gap-4 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-lg font-semibold text-white leading-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {item.title}
              </h3>
              {isGithub ? (
                <Github
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    item.accent === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                  }`}
                />
              ) : (
                <ArrowUpRight
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    item.accent === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                  }`}
                />
              )}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>

            <div className="mt-auto flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant={item.accent}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  )
}

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
          A mix of client sites we&apos;ve shipped and open-source tools we&apos;ve built.
        </p>
      </motion.div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <PortfolioCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
