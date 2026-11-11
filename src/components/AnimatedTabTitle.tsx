'use client'

import { useEffect } from 'react'

const RESTING_TITLE = 'Rhodai | Website Design'
const TITLES = ['Rhodai | Design.', 'Rhodai | Build.', 'Rhodai | Grow.']
const STEP_MS = 1000
const DURATION_MS = STEP_MS * TITLES.length * 2

export default function AnimatedTabTitle() {
  useEffect(() => {
    const originalTitle = document.title
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: ReturnType<typeof setTimeout> | undefined

    function settle() {
      clearTimeout(timer)
      timer = undefined
      document.title = RESTING_TITLE
    }

    function play() {
      settle()
      if (reducedMotion.matches) return
      const startedAt = Date.now()

      function tick() {
        const elapsed = Date.now() - startedAt
        if (elapsed >= DURATION_MS) {
          settle()
          return
        }
        document.title = TITLES[Math.floor(elapsed / STEP_MS) % TITLES.length]
        // Use elapsed time so background timer throttling cannot extend the loop.
        timer = setTimeout(tick, Math.min(STEP_MS, DURATION_MS - elapsed))
      }

      tick()
    }

    function onVisibilityChange() {
      if (document.hidden) play()
      else settle()
    }

    function onMotionChange() {
      if (reducedMotion.matches) settle()
    }

    play()
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onMotionChange)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onMotionChange)
      if (document.title === RESTING_TITLE || TITLES.includes(document.title)) {
        document.title = originalTitle
      }
    }
  }, [])

  return null
}
