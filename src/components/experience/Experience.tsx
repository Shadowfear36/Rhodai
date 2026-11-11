'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const World = dynamic(() => import('./World'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Mounts the 3D world once the page is idle. Visitors who prefer reduced
 * motion, or whose browser has no WebGL, keep the static site.
 */
export default function Experience() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = () => setEnabled(!motion.matches && supportsWebGL())
    const onMotionChange = () => setEnabled(!motion.matches && supportsWebGL())
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 300)
    motion.addEventListener('change', onMotionChange)
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return enabled ? (
    <World
      onFail={() => {
        document.documentElement.classList.remove('has-3d')
        setEnabled(false)
      }}
    />
  ) : null
}
