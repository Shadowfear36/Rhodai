// Shared, mutable state for the scroll-driven 3D experience.
// Kept outside React so the render loop can read it without re-rendering.

export const CHAPTERS = ['Intro', 'Work', 'Services', 'About', 'Process', 'Pricing', 'FAQ', 'Contact'] as const
export const LAST_CHAPTER = CHAPTERS.length - 1
/** World units the camera travels per chapter. */
export const CHAPTER_DEPTH = 14

export const experience = {
  /** Smoothed chapter position (0 = top of hero, 7 = contact). */
  chapter: 0,
  pointer: { x: 0, y: 0 },
}

/**
 * Maps the scroll position to a continuous chapter value.
 * The probe slides from the top of the viewport (page top) to the bottom
 * (page end), so the value is 0 at the very top and reaches the contact
 * chapter at the very bottom regardless of section heights.
 */
export function readChapter(): number {
  if (typeof window === 'undefined') return 0
  const sections = document.querySelectorAll<HTMLElement>('main > section')
  if (!sections.length) return 0
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
  const probe = window.innerHeight * progress
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect()
    if (probe < rect.bottom) {
      return Math.max(0, i + (probe - rect.top) / Math.max(1, rect.height))
    }
  }
  return LAST_CHAPTER + 0.6
}

/** Deterministic PRNG so the scene is pure across renders and identical on every visit. */
export function seeded(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
