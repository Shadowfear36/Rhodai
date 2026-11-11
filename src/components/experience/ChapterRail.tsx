'use client'

import { useEffect, useRef, useState } from 'react'
import { CHAPTERS, CHAPTER_DEPTH, LAST_CHAPTER, readChapter } from './store'

/** Fixed side rail showing where you are in the journey. Works with or without WebGL. */
export default function ChapterRail() {
  const [active, setActive] = useState(0)
  const fill = useRef<HTMLSpanElement>(null)
  const depth = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const c = Math.min(readChapter(), LAST_CHAPTER)
      if (fill.current) fill.current.style.transform = `scaleY(${c / LAST_CHAPTER})`
      if (depth.current) depth.current.textContent = String(Math.round(c * CHAPTER_DEPTH * 10)).padStart(4, '0')
      setActive(Math.min(LAST_CHAPTER, Math.floor(c + 0.35)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const jump = (i: number) => {
    const section = document.querySelectorAll<HTMLElement>('main > section')[i]
    if (i === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    else section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="chapter-rail" aria-label="Page sections">
      <span className="rail-depth" aria-hidden="true">
        DEPTH <span ref={depth}>0000</span>m
      </span>
      <div className="rail-track">
        <span className="rail-fill" ref={fill} />
        {CHAPTERS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === active ? 'rail-stop is-active' : i < active ? 'rail-stop is-past' : 'rail-stop'}
            style={{ top: `${(i / LAST_CHAPTER) * 100}%` }}
            onClick={() => jump(i)}
            aria-current={i === active ? 'true' : undefined}
          >
            <span className="rail-label">
              <i>{String(i).padStart(2, '0')}</i> {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
