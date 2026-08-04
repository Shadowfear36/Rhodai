export interface Service {
  id: string
  title: string
  description: string
  icon: string
  accent: 'cyan' | 'violet'
  features: string[]
  badge?: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  url: string
  image: string
  video: string
  tags: string[]
  accent: 'cyan' | 'violet'
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface FormData {
  name: string
  email: string
  service: string
  message: string
}
