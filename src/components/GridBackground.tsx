import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
}

export default function GridBackground({ className }: GridBackgroundProps) {
  // Inline SVG dot grid as a background-image data URI
  const dotSvg = `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23334155' fill-opacity='0.4'/%3E%3C/svg%3E")`

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: dotSvg, backgroundRepeat: 'repeat' }}
      />
      {/* Radial fade mask — darkens edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #050508 100%)',
        }}
      />
    </div>
  )
}
