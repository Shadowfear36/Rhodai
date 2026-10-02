'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ANALYTICS_CONFIGURED, CONSENT_KEY, GA_ID } from '@/lib/analytics'

type Choice = 'granted' | 'denied' | null

export default function Analytics() {
  const [choice, setChoice] = useState<Choice>(null)
  const [showSettings, setShowSettings] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!ANALYTICS_CONFIGURED) return
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(CONSENT_KEY)
        if (saved === 'granted' || saved === 'denied') setChoice(saved)
        else setShowSettings(true)
      } catch { setShowSettings(true) }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!ANALYTICS_CONFIGURED || choice !== 'granted') return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer?.push(args) })
    if (!document.getElementById('rhodai-google-tag')) {
      window.gtag('consent', 'default', {
        analytics_storage: 'granted', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      })
      window.gtag('js', new Date())
      window.gtag('config', GA_ID, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: `${window.location.origin}${pathname}`,
        page_referrer: document.referrer ? new URL(document.referrer).origin : '',
      })
      const script = document.createElement('script')
      script.id = 'rhodai-google-tag'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)
    }
    // Exclude query strings and hashes from page URLs.
    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
      page_referrer: document.referrer ? new URL(document.referrer).origin : '',
      send_to: GA_ID,
    })
  }, [choice, pathname])

  function save(next: Exclude<Choice, null>) {
    try { localStorage.setItem(CONSENT_KEY, next) } catch { /* Session choice still works. */ }
    setChoice(next)
    setShowSettings(false)
    if (next === 'denied' && window.gtag) {
      // Disable measurement before reloading to unload the Google tag completely.
      Object.assign(window, { [`ga-disable-${GA_ID}`]: true })
      window.gtag('consent', 'update', { analytics_storage: 'denied' })
      const domains = ['', window.location.hostname, `.${window.location.hostname}`]
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim()
        if (name === '_ga' || name.startsWith('_ga_')) {
          domains.forEach((domain) => {
            document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`
          })
        }
      })
      window.location.reload()
    }
  }

  if (!ANALYTICS_CONFIGURED) return null
  return <>
    <button className="cookie-settings" onClick={() => setShowSettings(true)}>Cookie settings</button>
    {showSettings && <aside className="cookie-banner" aria-label="Analytics preferences">
      <div><strong>A little insight. Your choice.</strong><p>With your permission, Google Analytics helps me understand which pages and projects people find useful. You can change your choice anytime. <a href="/privacy/">Privacy details</a></p></div>
      <div className="cookie-actions"><button onClick={() => save('denied')}>Decline</button><button onClick={() => save('granted')}>Allow analytics</button></div>
    </aside>}
  </>
}
