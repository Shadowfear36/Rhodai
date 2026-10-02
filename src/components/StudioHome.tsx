'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Check, Menu, X } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { trackEvent } from '@/lib/analytics'

const projects = [
  { id: 'seqhort', name: 'Sequoia Horticultural Products', category: 'AGRICULTURE / BUSINESS WEBSITE', image: '/SeqHortScreenShot.webp', url: 'https://www.seqhort.com', color: 'sage', headline: 'An established business. A fresh digital presence.', description: 'A website for a bulk bark and mulch supplier, bringing its products and business information together in a clear, approachable experience.' },
  { id: 'blairelectric', name: 'Blair Electric Services', category: 'TRADES / BUSINESS WEBSITE', image: '/BlairElectricScreenShot.webp', url: 'https://blairelectric.pages.dev', color: 'sand', headline: 'Making a skilled local business easy to discover.', description: 'A website introducing an electrical contractor’s services to agricultural, commercial, and industrial customers in California’s Central Valley.' },
  { id: 'waterspectrum', name: 'WaterSpectrum', category: 'MUSIC / CREATIVE WEBSITE', image: '/WaterSpectrumScreenShot.webp', url: 'https://waterspectrum.us', color: 'lavender', headline: 'A digital home with its own creative energy.', description: 'A website for a music production collective, bringing beats, studio sessions, mixing, and mastering into one distinctive online presence.' },
]

const faqs = [
  ['What kind of businesses do you work with?', 'I build websites for small and growing businesses, from local service providers to creative brands. If you need a new site or your current one no longer represents your business, let’s talk.'],
  ['How much does a website cost?', 'Website projects start from $500. The final quote depends on the number of pages, content, and features you need. We agree on the scope and price before work begins.'],
  ['Can you redesign my existing website?', 'Yes. We can review what is working, what feels outdated, and what your customers need. From there, I’ll recommend a focused update or a complete redesign.'],
  ['Will my website work on phones?', 'Yes. Mobile layouts are part of the design from the beginning, along with clear navigation, readable content, and accessible interactions.'],
  ['What if I don’t have the content ready?', 'We can start with your existing materials and an outline of your services. I can help shape the page structure and draft copy; you review the business details before launch.'],
  ['Can you help with AI or software integrations?', 'Yes. Chatbots, connected tools, and custom automations can be scoped as additional work when they solve a useful problem for your business.'],
]

function Brand() {
  return <Link className="studio-brand" href="/" aria-label="Rhodai home"><svg width="30" height="34" viewBox="0 0 30 34" fill="none" aria-hidden="true"><path d="M15 2 28 9.5v15L15 32 2 24.5v-15L15 2Z" stroke="currentColor" strokeWidth="2"/><path d="M15 8v9m0 0 8 5m-8-5-8 5" stroke="currentColor" strokeWidth="2"/><circle cx="15" cy="17" r="3" fill="currentColor"/></svg><span>rhodai<span className="brand-period">.</span></span></Link>
}

function ProjectLink({ id, url, children, className }: { id: string; url: string; children: React.ReactNode; className?: string }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackEvent('project_click', id)}>{children}</a>
}

export default function StudioHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="studio">
    <a className="studio-skip" href="#main-content">Skip to content</a>
    <header className="studio-header"><div className="studio-container nav-inner"><Brand />
      <nav id="studio-navigation" className={menuOpen ? 'studio-nav is-open' : 'studio-nav'} aria-label="Main navigation">
        {[['Work', '#work'], ['Services', '#services'], ['About', '#about']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => { setMenuOpen(false); trackEvent('contact_click', 'navigation') }}>Let’s talk <ArrowUpRight size={16}/></a>
      </nav><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="studio-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div></header>
    <main id="main-content">
      <section className="studio-hero"><div className="studio-container hero-layout">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> INDEPENDENT WEB DESIGN & DEVELOPMENT</p><h1>Your business.<br/>Its next <span className="serif-accent">big move.</span></h1><p className="hero-description">Custom websites that look the part, tell your story, and make it easier for customers to choose you.</p><a className="studio-button button-cyan" href="#contact" onClick={() => trackEvent('contact_click', 'hero')}>Let’s build your website <ArrowUpRight size={20}/></a><a className="hero-work-link" href="#work">See the work <ArrowDown size={16}/></a></div>
        <div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <svg className="hero-monogram" viewBox="0 0 400 430" fill="none"><defs><linearGradient id="studio-mark" x1="40" y1="50" x2="360" y2="370" gradientUnits="userSpaceOnUse"><stop stopColor="#67e8f9"/><stop offset=".55" stopColor="#06b6d4"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs><path d="M200 35 355 125v180l-155 90L45 305V125L200 35Z" stroke="url(#studio-mark)" strokeWidth="2"/><path d="M200 67 327 141v148l-127 74-127-74V141l127-74Z" stroke="url(#studio-mark)" strokeWidth="24"/><path d="M200 116v99m0 0 86 50m-86-50-86 50" stroke="url(#studio-mark)" strokeWidth="22" strokeLinecap="round"/><circle cx="200" cy="215" r="28" fill="url(#studio-mark)"/><circle cx="200" cy="116" r="16" fill="#67e8f9"/><circle cx="286" cy="265" r="16" fill="#a78bfa"/><circle cx="114" cy="265" r="16" fill="#22d3ee"/></svg>
          <span className="art-note note-top">GOOD DESIGN.<br/>REAL PURPOSE.</span><span className="art-note note-bottom">DESIGNED TO CONNECT ↗</span><div className="art-coordinates">RH / 01</div>
        </div>
      </div><div className="studio-container hero-bottom"><span>Thoughtful design. Built around you.</span><span>WEB DESIGN <i/> DEVELOPMENT <i/> SEO</span><a href="#work" aria-label="Explore selected work"><ArrowDown size={20}/></a></div></section>
      <section id="work" className="studio-work section-alt"><div className="studio-container">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Different businesses.<br/><span className="serif-accent">Distinctive websites.</span></h2></div><p>A few digital homes I’ve built.<br/>Each with a story of its own.</p></div>
        <div className="project-grid">{projects.map((project, i) => <article className={`project project-${project.color} ${i === 0 ? 'project-featured' : ''}`} key={project.id}>
          <ProjectLink id={project.id} url={project.url} className="project-image-link"><div className="project-image-stage"><div className="browser-chrome"><span/><span/><span/><small>{new URL(project.url).hostname}</small></div><div className="project-image"><Image src={project.image} alt={`${project.name} website design`} fill sizes={i === 0 ? '(max-width: 760px) 90vw, 85vw' : '(max-width: 760px) 90vw, 42vw'} className="project-screenshot"/></div><span className="project-open"><ArrowUpRight size={24}/></span></div></ProjectLink>
          <div className="project-info"><div><p className="eyebrow">{project.category}</p><h3><ProjectLink id={project.id} url={project.url}>{project.name}</ProjectLink></h3><p className="project-headline">{project.headline}</p></div><p className="project-description">{project.description}</p></div>
        </article>)}</div>
        <div className="more-work"><p>Also exploring what software can do.</p><ProjectLink id="statsync" url="https://sportsync.rhodai.ai/">STATSYNC <ArrowUpRight size={16}/></ProjectLink><ProjectLink id="vmux" url="https://github.com/Shadowfear36/vmux">vmux <ArrowUpRight size={16}/></ProjectLink><ProjectLink id="seghiero" url="https://github.com/Shadowfear36/SegHiero">SegHiero <ArrowUpRight size={16}/></ProjectLink></div>
      </div></section>
      <section id="services" className="studio-services"><div className="studio-container"><div className="section-heading"><div><p className="eyebrow">02 / WHAT I CAN HELP WITH</p><h2>A better website.<br/><span className="serif-accent">A stronger first impression.</span></h2></div><p>From a fresh start to a thoughtful redesign,<br/>let’s make your next step a good one.</p></div>
        <div className="service-rows">{[
          ['01', 'Website design', 'A website that feels like your business.', 'Clear structure, thoughtful layouts, and a visual identity that helps people understand who you are and what you offer.', 'Custom design / Website redesigns / Content direction'],
          ['02', 'Development & SEO', 'Good looks. Solid foundations.', 'Responsive development, fast-loading pages, and on-page search foundations. Built to work just as well on a phone as on a desktop.', 'Responsive builds / On-page SEO / Analytics setup'],
          ['03', 'A little more possibility', 'Make your website work harder.', 'Need your tools connected, an AI assistant, or a custom feature? We can scope the right addition around an actual business need.', 'AI integrations / Connected software / Automation'],
        ].map(([number, title, subtitle, description, tags]) => <article className="service-row" key={number}><span className="service-number">{number}</span><h3>{title}</h3><div><h4>{subtitle}</h4><p>{description}</p><span className="service-tags">{tags}</span></div><ArrowUpRight className="service-arrow" size={26}/></article>)}</div>
      </div></section>
      <section id="about" className="studio-about section-alt"><div className="studio-container about-layout"><div className="portrait-wrap"><Image src="/Dylan.jpg" alt="Dylan, the designer and developer behind Rhodai" fill sizes="(max-width: 760px) 90vw, 38vw" className="founder-portrait"/><span className="portrait-caption">THE PERSON BEHIND THE PIXELS ↗</span></div><div className="about-copy"><p className="eyebrow">03 / HELLO, I’M DYLAN</p><h2>Your website.<br/><span className="serif-accent">My personal attention.</span></h2><p>I’m the designer and developer behind Rhodai. I help small and growing businesses build an online presence they’re proud to share.</p><p>You work directly with the person building your site. We talk through what you need, make a clear plan, and turn it into something that feels right for your business.</p><a className="text-link" href="https://www.linkedin.com/in/dylan-rhinehart/" target="_blank" rel="noopener noreferrer">Meet me on LinkedIn <ArrowUpRight size={18}/></a><div className="about-principles"><span><Check size={16}/> Direct communication</span><span><Check size={16}/> Clear project scope</span><span><Check size={16}/> Thoughtful execution</span></div></div></div></section>
      <section id="process" className="studio-process"><div className="studio-container"><p className="eyebrow">04 / FROM IDEA TO ONLINE</p><h2>A clear path to<br/><span className="serif-accent">your new website.</span></h2><div className="process-grid">{[
        ['01', 'Let’s talk', 'Tell me about your business, your current site, and where you want to go.'],
        ['02', 'Make a plan', 'We agree on the pages, content, features, timeline, and price before the build begins.'],
        ['03', 'Bring it to life', 'I design and develop your site, with your feedback at the key stages.'],
        ['04', 'Launch with care', 'We review the details, check the mobile experience, and get your new site online.'],
      ].map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
      <section id="pricing" className="studio-investment section-alt"><div className="studio-container investment-layout"><div><p className="eyebrow">05 / A CLEAR STARTING POINT</p><h2>Big on care.<br/><span className="serif-accent">Clear on cost.</span></h2><p>Website projects start from <strong>$500</strong>. Your quote is based on the pages, content, and features you need, with a scope we agree on together.</p><a className="studio-button button-dark" href="#contact" onClick={() => trackEvent('contact_click', 'investment')}>Tell me what you need <ArrowUpRight size={20}/></a></div><div className="investment-details"><p className="eyebrow">THE FOUNDATIONS</p>{['Custom design for your business', 'Responsive desktop and mobile layouts', 'On-page SEO setup', 'Contact form and analytics setup', '30-day post-launch support'].map(text => <p key={text}><Check size={18}/>{text}</p>)}<small>Additional pages, integrations, and ongoing support are scoped separately.</small></div></div></section>
      <section id="faq" className="studio-faq section-alt"><div className="studio-container faq-layout"><div><p className="eyebrow">A FEW GOOD QUESTIONS</p><h2>Before we<br/><span className="serif-accent">get started.</span></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
      <section id="contact" className="studio-contact"><div className="studio-container contact-layout"><div><p className="eyebrow"><span className="status-dot"/> LET’S MAKE SOMETHING GOOD</p><h2>Ready for<br/><span className="serif-accent">what’s next?</span></h2><p>Tell me a little about your business and the website you have in mind. We’ll figure out a good next step together.</p><a className="contact-email" href="mailto:info@rhodai.ai" onClick={() => trackEvent('email_click', 'contact')}>info@rhodai.ai <ArrowUpRight size={20}/></a></div><ContactForm /></div></section>
    </main>
    <footer className="studio-footer"><div className="studio-container"><div className="footer-top"><Brand/><p>Independent design.<br/>A little more human.</p><a href="#main-content">Back to top ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rhodai</span><span>WEB DESIGN & DEVELOPMENT</span><a href="/privacy/">Privacy</a></div></div></footer>
  </div>
}
