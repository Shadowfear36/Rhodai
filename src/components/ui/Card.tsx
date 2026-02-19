import { cn } from '@/lib/utils'

interface CardProps {
  glow?: 'cyan' | 'violet'
  glass?: boolean
  className?: string
  children: React.ReactNode
}

export default function Card({ glow, glass, className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-300',
        glass
          ? 'backdrop-blur-sm bg-white/[0.02] border-white/8'
          : 'bg-[#0a0a12] border-white/5',
        glow === 'cyan' && 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]',
        glow === 'violet' &&
          'hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]',
        className
      )}
    >
      {children}
    </div>
  )
}
