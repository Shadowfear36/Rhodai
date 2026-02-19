'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1500,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * (value - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
