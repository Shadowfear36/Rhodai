'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/constants'
import { slideInLeft } from '@/lib/animations'
import type { FormData, FormStatus } from '@/types'
import { cn } from '@/lib/utils'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

const initialFormData: FormData = {
  name: '',
  email: '',
  service: '',
  message: '',
}

interface FieldError {
  name?: string
  email?: string
  service?: string
  message?: string
}

function validate(data: FormData): FieldError {
  const errors: FieldError = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address'
  if (!data.service) errors.service = 'Please select a service'
  if (!data.message || data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

const inputClasses =
  'w-full bg-[#0a0a12] border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FieldError>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    try {
      if (!FORMSPREE_ID) {
        // Demo mode — simulate success
        await new Promise((r) => setTimeout(r, 1000))
        setStatus('success')
        setFormData(initialFormData)
        return
      }

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData(initialFormData)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Message sent!
          </h3>
          <p className="text-sm text-slate-400">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      variants={slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Dylan"
            value={formData.name}
            onChange={handleChange}
            className={cn(inputClasses, errors.name && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20')}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            className={cn(inputClasses, errors.email && 'border-red-500/50')}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <label htmlFor="service" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={cn(inputClasses, 'cursor-pointer', errors.service && 'border-red-500/50')}
        >
          <option value="" disabled>Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#0a0a12]">
              {s.title}
            </option>
          ))}
          <option value="other" className="bg-[#0a0a12]">Other / Not Sure</option>
        </select>
        {errors.service && <p className="text-xs text-red-400">{errors.service}</p>}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, goals, or what you need help with..."
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClasses, 'resize-none', errors.message && 'border-red-500/50')}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === 'loading'}
        className="w-full justify-center"
      >
        Send Message
      </Button>
    </motion.form>
  )
}
