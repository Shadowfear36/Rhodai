'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { ServiceIcon3D } from '@/components/three'
import { scaleIn } from '@/lib/animations'
import type { Service } from '@/types'

type Shape = 'sphere' | 'icosahedron' | 'torus' | 'octahedron'

const SHAPE_MAP: Record<string, Shape> = {
  'web-design': 'sphere',
  'ai-integration': 'icosahedron',
  'software-integration': 'torus',
  'lead-generation': 'octahedron',
}

const COLOR_MAP: Record<string, string> = {
  cyan: '#06b6d4',
  violet: '#8b5cf6',
}

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: -dy * 6, y: dx * 6 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const shape = SHAPE_MAP[service.id] || 'sphere'
  const color = COLOR_MAP[service.accent] || '#06b6d4'

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease',
          transformStyle: 'preserve-3d',
        }}
        className="h-full"
      >
        <Card
          glow={service.accent}
          className="h-full p-6 flex flex-col gap-4 group"
        >
          {/* 3D Icon */}
          <div className="flex items-center justify-start">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                service.accent === 'cyan'
                  ? 'bg-cyan-500/5 border border-cyan-500/20'
                  : 'bg-violet-500/5 border border-violet-500/20'
              }`}
            >
              <ServiceIcon3D shape={shape} color={color} />
            </div>
          </div>

          {/* Title + badge */}
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3
                className="text-lg font-semibold text-white leading-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {service.title}
              </h3>
              {service.badge && (
                <Badge variant="violet" className="flex-shrink-0 text-[10px]">
                  {service.badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
          </div>

          {/* Feature list */}
          <ul className="mt-auto space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                <Check
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    service.accent === 'cyan' ? 'text-cyan-500' : 'text-violet-500'
                  }`}
                />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  )
}
