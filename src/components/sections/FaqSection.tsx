'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const faqs = [
  {
    question: 'What services does Rhodai offer?',
    answer:
      'Rhodai offers four core services: Web Design & SEO (custom responsive websites optimized for search), AI Integration (embedding LLMs and chatbots into your business), Software Integration (connecting your tools via APIs and automation platforms), and Automated Lead Generation — where we build and deploy a custom AI-powered prospecting system inside your business.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Website design starts from $500 for a custom 5-page responsive website with SEO setup. Growth packages including AI integration and a custom LeadFinder deployment start from $1,500. Enterprise solutions are priced on a custom quote basis. All projects start with a free discovery call.',
  },
  {
    question: 'What is LeadFinder and how does it work for my business?',
    answer:
      "LeadFinder is an AI-powered prospecting engine built by Rhodai. Rather than delivering leads to you manually, we deploy a custom version of the system inside your own infrastructure — configured for your industry and target cities. It automatically discovers businesses, audits their websites, scores them with AI, and feeds qualified prospects into your outreach workflow. You own it outright with no ongoing fees to us.",
  },
  {
    question: 'Do I own the systems you build for me?',
    answer:
      'Yes, completely. Every website, integration, or lead generation system we build is handed over to you at the end of the project. There are no lock-ins, no proprietary platforms that hold your data hostage, and no recurring fees payable to Rhodai unless you choose an ongoing support retainer.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Timelines vary by scope. A standard website typically takes 1–3 weeks. AI integrations and software integrations range from 1–6 weeks depending on complexity. A full LeadFinder deployment typically takes 2–4 weeks including configuration and testing. Every project starts with a free 30-minute discovery call where we set a realistic timeline.',
  },
  {
    question: 'Can you integrate AI into my existing business tools?',
    answer:
      'Absolutely. We specialize in integrating AI into existing workflows — including ChatGPT and Claude API integrations, custom AI agents, knowledge base RAG pipelines, CRM automation, and local LLM deployment for privacy-sensitive businesses.',
  },
]

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06 }}
      itemScope
      itemType="https://schema.org/Question"
    >
      <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0a0a12] hover:border-white/8 transition-colors duration-200">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span
            className="text-sm sm:text-base font-medium text-white group-hover:text-cyan-100 transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            itemProp="name"
          >
            {question}
          </span>
          <span className={`flex-shrink-0 transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <div className="px-6 pb-5 pt-0">
                <div className="h-px bg-white/5 mb-4" />
                <p className="text-sm text-slate-400 leading-relaxed" itemProp="text">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14"
      >
        <motion.p variants={fadeInUp} className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">
          FAQ
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Frequently Asked <GradientText>Questions</GradientText>
        </motion.h2>
        <motion.p variants={fadeInUp} className="mt-4 text-slate-400 max-w-lg mx-auto">
          Everything you need to know before we get started.
        </motion.p>
      </motion.div>

      {/* FAQ list */}
      <div
        className="max-w-3xl mx-auto space-y-3"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
