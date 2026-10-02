export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
export const ANALYTICS_CONFIGURED = /^G-[A-Z0-9]+$/.test(GA_ID)
export const CONSENT_KEY = 'rhodai-analytics-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function analyticsAllowed() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted'
  } catch {
    return false
  }
}

// Only send predefined labels. Never send form values or visitor identifiers.
export function trackEvent(
  name: 'contact_click' | 'project_click' | 'email_click' | 'generate_lead',
  label: string,
) {
  if (!ANALYTICS_CONFIGURED || !analyticsAllowed()) return
  window.gtag?.('event', name, { content_id: label, send_to: GA_ID })
}
