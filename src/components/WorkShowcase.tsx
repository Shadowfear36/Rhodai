'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MousePointer2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export type Project = {
  id: string
  name: string
  category: string
  url: string
  /** Hostname shown in the browser bar, when it differs from the link (e.g. a pre-launch domain). */
  displayHost?: string
  /** Full-page capture, 1200px wide. */
  capture: string
  captureHeight: number
  accent: string
  headline: string
  description: string
  tags: string
}

export const projects: Project[] = [
  {
    id: 'djkid',
    name: 'DJ K.I.D',
    category: 'MUSIC / ARTIST WEBSITE',
    url: 'https://thedjkid.com',
    capture: '/work/djkid-full.webp',
    captureHeight: 5000,
    accent: '#ff5a1f',
    headline: 'A multi-platinum artist, built into a world.',
    description:
      'An artist website for a multi-platinum producer, engineer, and touring DJ. Bookings, services, credits, stories, and an official merch shop come together in one bold, video-led experience.',
    tags: 'Artist brand / Video hero / Bookings / Merch shop',
  },
  {
    id: 'holycross',
    name: 'Holy Cross Anglican Church',
    category: 'COMMUNITY / CHURCH WEBSITE',
    url: 'https://holycrossac-dev.pages.dev/',
    displayHost: 'holycrossac.org',
    capture: '/work/holycross-full.webp',
    captureHeight: 2790,
    accent: '#b91c1c',
    headline: 'A historic tradition, warmly welcoming.',
    description:
      'A website for an Anglo-Catholic parish in Sanger, California, helping visitors find Sunday worship, learn the parish’s story, and connect with the community, with a 3D Jerusalem cross at its heart.',
    tags: '3D hero / Worship info / Community / Giving',
  },
  {
    id: 'seqhort',
    name: 'Sequoia Horticultural Products',
    category: 'AGRICULTURE / BUSINESS WEBSITE',
    url: 'https://www.seqhort.com',
    capture: '/work/seqhort-full.webp',
    captureHeight: 2857,
    accent: '#16a34a',
    headline: 'An established business. A fresh digital presence.',
    description:
      'A website for a bulk bark and mulch supplier, bringing its products and business information together in a clear, approachable experience.',
    tags: 'Product catalog / Quote requests / Calculators',
  },
  {
    id: 'blairelectric',
    name: 'Blair Electric Services',
    category: 'TRADES / BUSINESS WEBSITE',
    url: 'https://blairelectric.pages.dev',
    capture: '/work/blair-full.webp',
    captureHeight: 2622,
    accent: '#6366f1',
    headline: 'Making a skilled local business easy to discover.',
    description:
      'A website introducing an electrical contractor’s services to agricultural, commercial, and industrial customers in California’s Central Valley.',
    tags: 'Service pages / Local SEO / Quote requests',
  },
  {
    id: 'waterspectrum',
    name: 'WaterSpectrum',
    category: 'MUSIC / CREATIVE WEBSITE',
    url: 'https://waterspectrum.us',
    capture: '/work/waterspectrum-full.webp',
    captureHeight: 5000,
    accent: '#0ea5e9',
    headline: 'A digital home with its own creative energy.',
    description:
      'A website for a music production collective founded by DJ K.I.D, bringing beats, studio sessions, mixing, and mastering into one distinctive online presence.',
    tags: 'Beat store / Studio services / Featured projects',
  },
]

const CAPTURE_WIDTH = 1200
const hostOf = (p: Project) => p.displayHost ?? new URL(p.url).hostname

/**
 * Interactive portfolio: pick a project, then move the pointer up and down the
 * tilted browser (or drag the slider) to scrub through the whole live site.
 * Idle previews drift on their own so the section feels alive.
 */
export default function WorkShowcase() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  const stage = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const scrubber = useRef<HTMLInputElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const motionState = useRef({ activeId: projects[0].id, target: 0, current: 0, hovering: false, tiltX: 0, tiltY: 0, fine: true, reduced: false, idleStart: 0 })

  // Reset the scroll position whenever the project changes.
  useEffect(() => {
    const s = motionState.current
    s.activeId = projects[active].id
    s.target = 0
    s.current = 0
    s.idleStart = performance.now()
    if (scrubber.current) scrubber.current.value = '0'
  }, [active])

  useEffect(() => {
    const s = motionState.current
    s.fine = window.matchMedia('(pointer: fine)').matches
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let visible = false
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(tick)
    })
    if (stage.current) io.observe(stage.current)

    function tick(now: number) {
      frame = 0
      const vp = viewport.current
      const st = stage.current
      // Look the active page up each frame: during a project switch the old one
      // is still animating out, and refs to it go stale when it unmounts.
      const img = vp?.querySelector<HTMLElement>(`[data-scroll="${s.activeId}"]`)
      if (!vp || !img || !st) {
        if (visible) frame = requestAnimationFrame(tick)
        return
      }
      const max = Math.max(0, img.offsetHeight - vp.clientHeight)

      if (!s.hovering && !s.reduced && now > s.idleStart) {
        // Idle drift: ease down the page and back. Touch screens have no hover,
        // so they tour the whole page; desktop teases the top third.
        const t = Math.max(0, (now - s.idleStart) / 1000 - 1.5)
        s.target = s.fine ? ((1 - Math.cos(t * 0.35)) / 2) * 0.35 : (1 - Math.cos(t * 0.16)) / 2
      }
      s.current += (s.target - s.current) * (s.reduced ? 1 : 0.09)
      img.style.transform = `translate3d(0, ${-s.current * max}px, 0)`
      if (progress.current) progress.current.style.transform = `scaleY(${s.current})`
      if (scrubber.current && document.activeElement !== scrubber.current) scrubber.current.value = String(Math.round(s.current * 1000))
      const rx = s.hovering ? s.tiltY : 0
      const ry = s.hovering ? s.tiltX : 0
      st.style.setProperty('--rx', `${rx * -5}deg`)
      st.style.setProperty('--ry', `${ry * 7}deg`)
      if (visible) frame = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const s = motionState.current
    s.hovering = true
    // Leave a little dead zone at top and bottom so the ends are easy to reach.
    s.target = Math.min(1, Math.max(0, (y - 0.08) / 0.84))
    s.tiltX = x * 2 - 1
    s.tiltY = y * 2 - 1
  }, [])

  const onPointerLeave = useCallback(() => {
    const s = motionState.current
    s.hovering = false
    s.idleStart = performance.now() + 2500
    s.target = s.current
  }, [])

  const onScrub = (e: React.FormEvent<HTMLInputElement>) => {
    const s = motionState.current
    s.target = Number(e.currentTarget.value) / 1000
    // Hold the chosen position for a while before the idle drift resumes.
    s.idleStart = performance.now() + 6000
  }

  const select = (i: number) => {
    if (i === active) return
    setActive(i)
    trackEvent('project_preview', projects[i].id)
  }

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (i + delta + projects.length) % projects.length
    select(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="showcase" style={{ '--project-accent': project.accent } as React.CSSProperties}>
      <div className="showcase-list" role="tablist" aria-label="Selected projects" aria-orientation="vertical">
        {projects.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            role="tab"
            id={`project-tab-${p.id}`}
            aria-selected={i === active}
            aria-controls="project-panel"
            tabIndex={i === active ? 0 : -1}
            className={i === active ? 'showcase-tab is-active' : 'showcase-tab'}
            style={{ '--tab-accent': p.accent } as React.CSSProperties}
            onClick={() => select(i)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span className="tab-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="tab-text">
              <span className="tab-name">{p.name}</span>
              <span className="tab-category">{p.category}</span>
            </span>
          </button>
        ))}
        <p className="showcase-hint">
          <MousePointer2 size={14} aria-hidden="true" /> Move over the preview to scroll the site
        </p>
      </div>

      <div className="showcase-main" role="tabpanel" id="project-panel" aria-labelledby={`project-tab-${project.id}`}>
        <div className="showcase-stage" ref={stage} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <div className="showcase-glow" aria-hidden="true" />
          <div className="showcase-browser">
            <div className="browser-chrome">
              <span />
              <span />
              <span />
              <small>{hostOf(project)}</small>
            </div>
            <div className="showcase-viewport" ref={viewport}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={project.id}
                  className="showcase-image"
                  initial={{ opacity: 0, y: 40, rotateX: -8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="showcase-scroll" data-scroll={project.id}>
                    <Image
                      src={project.capture}
                      alt={`Full page of the ${project.name} website`}
                      width={CAPTURE_WIDTH}
                      height={project.captureHeight}
                      sizes="(max-width: 760px) 92vw, 60vw"
                      priority={active === 0}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <a
              className="showcase-visit"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('project_click', project.id)}
            >
              Visit site <ArrowUpRight size={16} />
            </a>
          </div>
          <span className="showcase-progress" aria-hidden="true">
            <span ref={progress} />
          </span>
        </div>
        <label className="showcase-scrub">
          <span>Drag to explore the page</span>
          <input
            ref={scrubber}
            type="range"
            min={0}
            max={1000}
            defaultValue={0}
            onInput={onScrub}
            aria-label={`Scroll through the ${project.name} website preview`}
          />
        </label>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            className="showcase-info"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="eyebrow">{project.category}</p>
              <h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('project_click', project.id)}>
                  {project.name}
                </a>
              </h3>
              <p className="project-headline">{project.headline}</p>
            </div>
            <div>
              <p className="project-description">{project.description}</p>
              <span className="service-tags">{project.tags}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
