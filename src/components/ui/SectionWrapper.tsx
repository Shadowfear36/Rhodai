import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export default function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24', className)}
    >
      {children}
    </section>
  )
}
