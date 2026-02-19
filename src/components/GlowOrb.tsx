import { cn } from '@/lib/utils'

interface GlowOrbProps {
  color?: 'cyan' | 'violet'
  size?: string
  className?: string
}

export default function GlowOrb({ color = 'cyan', size = '600px', className }: GlowOrbProps) {
  return (
    <div
      className={cn('absolute rounded-full pointer-events-none animate-glow-pulse', className)}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background:
          color === 'cyan'
            ? 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
