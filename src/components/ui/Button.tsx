'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
  className?: string
  children: React.ReactNode
}

const variantClasses = {
  primary:
    'bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border border-cyan-500 hover:border-cyan-400',
  secondary:
    'bg-transparent border border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500',
  ghost:
    'bg-transparent border border-transparent text-slate-300 hover:text-white hover:border-white/10 hover:bg-white/5',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-3 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  href,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]',
    variantClasses[variant],
    sizeClasses[size],
    (loading || disabled) && 'opacity-60 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
