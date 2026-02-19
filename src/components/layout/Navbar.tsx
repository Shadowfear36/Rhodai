'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    // Smooth scroll to section
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md bg-[#050508]/85 border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo showWordmark />

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick('#contact')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-[#050508]/95 border-b border-white/5 md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 pb-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => handleNavClick('#contact')}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
