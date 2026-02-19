import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'cyan' | 'violet' | 'green' | 'default'
  className?: string
  children: React.ReactNode
}

const variantClasses = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  default: 'bg-white/5 text-slate-400 border-white/10',
}

export default function Badge({
  variant = 'default',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
