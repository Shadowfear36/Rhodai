'use client'

import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID
const empty = { name: '', email: '', service: '', message: '', website: '' }

export default function ContactForm() {
  const [data, setData] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({})

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || !FORM_ID) return
    const next: typeof errors = {}
    if (data.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = 'Please enter a valid email address.'
    if (!data.service) next.service = 'Please choose an option.'
    if (data.message.trim().length < 20) next.message = 'Tell me a little more (at least 20 characters).'
    setErrors(next)
    if (Object.keys(next).length || data.website) return
    setStatus('loading')
    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name.trim(), email: data.email.trim(), service: data.service, message: data.message.trim() }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      trackEvent('generate_lead', 'website_inquiry')
      setData(empty)
    } catch { setStatus('error') }
  }

  if (!FORM_ID) return <div className="contact-fallback"><p className="eyebrow">START A CONVERSATION</p><h3>Every good website<br/>starts with a hello.</h3><p>Email me about your business, your current website (if you have one), and what you’d like to change.</p><a className="studio-button button-cyan" href="mailto:info@rhodai.ai?subject=Website%20project%20inquiry" onClick={() => trackEvent('email_click', 'inquiry_fallback')}>Let’s talk about your website <ArrowUpRight size={18}/></a><p className="form-note">Prefer to keep it simple? A few sentences are plenty to get started.</p></div>

  if (status === 'success') return <div className="form-success" role="status"><CheckCircle size={40}/><h3>Thanks for saying hello.</h3><p>Your message has been sent. I’ll be in touch to talk through your project.</p><button className="text-link" onClick={() => setStatus('idle')}>Send another message <ArrowUpRight size={18}/></button></div>

  return <form className="studio-form" onSubmit={submit} noValidate>
    <div className="form-two-columns">{[['name', 'Your name', 'Alex Smith'], ['email', 'Email address', 'you@yourbusiness.com']].map(([name, label, placeholder]) => <div className="form-field" key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} type={name === 'email' ? 'email' : 'text'} value={data[name as 'name' | 'email']} onChange={change} autoComplete={name} placeholder={placeholder} required aria-invalid={!!errors[name as 'name' | 'email']} aria-describedby={errors[name as 'name' | 'email'] ? `${name}-error` : undefined}/>{errors[name as 'name' | 'email'] && <p id={`${name}-error`} className="field-error">{errors[name as 'name' | 'email']}</p>}</div>)}</div>
    <div className="form-field"><label htmlFor="service">What can I help with?</label><select id="service" name="service" value={data.service} onChange={change} required aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Choose an option</option><option value="new-website">A new website</option><option value="website-redesign">A website redesign</option><option value="ai-integration">AI or software integration</option><option value="other">Something else / not sure yet</option></select>{errors.service && <p id="service-error" className="field-error">{errors.service}</p>}</div>
    <div className="form-field"><label htmlFor="message">A little about your project</label><textarea id="message" name="message" rows={5} value={data.message} onChange={change} placeholder="What does your business do, and what would you like your website to do better?" required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}/>{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}</div>
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" value={data.website} onChange={change} tabIndex={-1} autoComplete="off"/></div>
    {status === 'error' && <p className="field-error" role="alert">Your message couldn’t be sent. Please try again or <a href="mailto:info@rhodai.ai">email me directly</a>.</p>}
    <button className="studio-button button-cyan" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <>Sending <Loader2 size={18} className="animate-spin"/></> : <>Let’s talk about your website <ArrowUpRight size={18}/></>}</button><p className="form-note">Your details are used to respond to your inquiry. <a href="/privacy/">Privacy details</a></p>
  </form>
}
