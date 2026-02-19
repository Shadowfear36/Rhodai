import { cn } from '@/lib/utils'

interface GradientTextProps {
  className?: string
  children: React.ReactNode
}

export default function GradientText({ className, children }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500',
        className
      )}
    >
      {children}
    </span>
  )
}
