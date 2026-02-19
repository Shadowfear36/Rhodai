'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  showWordmark?: boolean
  className?: string
}

export default function Logo({ size = 36, showWordmark = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* SVG Icon — Hexagon with animated neural grid */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="logo-svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexagon border — draws itself in on mount */}
        <polygon
          points="20,2 35.5,11 35.5,29 20,38 4.5,29 4.5,11"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="logo-hex"
        />

        {/* Grid line 1 — top node to center */}
        <line
          x1="20" y1="4" x2="20" y2="20"
          stroke="url(#logoGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="logo-line logo-line-1"
        />
        {/* Grid line 2 — right node to center */}
        <line
          x1="33.5" y1="12" x2="20" y2="20"
          stroke="url(#logoGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="logo-line logo-line-2"
        />
        {/* Grid line 3 — left node to center */}
        <line
          x1="6.5" y1="28" x2="20" y2="20"
          stroke="url(#logoGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="logo-line logo-line-3"
        />

        {/* Center node — pulses */}
        <circle cx="20" cy="20" r="3" fill="url(#logoGrad)" className="logo-center" filter="url(#logoGlow)" />

        {/* Outer nodes — each pings in sequence */}
        <circle cx="20" cy="4" r="2" fill="#06b6d4" opacity="0.9" className="logo-node logo-node-1" />
        <circle cx="33.5" cy="12" r="2" fill="#8b5cf6" opacity="0.9" className="logo-node logo-node-2" />
        <circle cx="6.5" cy="28" r="2" fill="#06b6d4" opacity="0.9" className="logo-node logo-node-3" />

        {/* Subtle rotating outer ring — only visible on hover */}
        <circle
          cx="20" cy="20" r="18"
          fill="none"
          stroke="url(#logoGrad2)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          className="logo-orbit"
          opacity="0"
        />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className="text-lg font-bold tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          <span className="text-white">Rho</span>
          <span className="text-cyan-400">dai</span>
        </span>
      )}

      {/* Logo animation styles */}
      <style>{`
        /* Hex border draw-in on load */
        .logo-hex {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: logo-draw-hex 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }
        @keyframes logo-draw-hex {
          to { stroke-dashoffset: 0; }
        }

        /* Lines draw from outer node inward */
        .logo-line {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
        }
        .logo-line-1 { animation: logo-draw-line 0.4s ease-out 0.7s forwards; }
        .logo-line-2 { animation: logo-draw-line 0.4s ease-out 0.85s forwards; }
        .logo-line-3 { animation: logo-draw-line 0.4s ease-out 1.0s forwards; }
        @keyframes logo-draw-line {
          to { stroke-dashoffset: 0; }
        }

        /* Center node scales in with a pulse */
        .logo-center {
          transform-origin: 20px 20px;
          transform: scale(0);
          animation: logo-center-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.1s forwards,
                     logo-pulse 3s ease-in-out 1.5s infinite;
        }
        @keyframes logo-center-in {
          to { transform: scale(1); }
        }
        @keyframes logo-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* Outer nodes ping in after lines */
        .logo-node {
          transform-origin: center;
          transform: scale(0);
          opacity: 0;
        }
        .logo-node-1 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.75s forwards; }
        .logo-node-2 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s forwards; }
        .logo-node-3 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.05s forwards; }
        @keyframes logo-node-in {
          to { transform: scale(1); opacity: 0.9; }
        }

        /* Repeating "ping" effect on outer nodes — staggered */
        .logo-node-1 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.75s forwards,
                                  logo-node-ping 4s ease-in-out 1.5s infinite; }
        .logo-node-2 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s forwards,
                                  logo-node-ping 4s ease-in-out 2.1s infinite; }
        .logo-node-3 { animation: logo-node-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.05s forwards,
                                  logo-node-ping 4s ease-in-out 2.7s infinite; }
        @keyframes logo-node-ping {
          0%, 70%, 100% { opacity: 0.9; r: 2; }
          35% { opacity: 0.5; r: 2.5; }
        }

        /* Orbit ring — spins in on hover */
        .logo-svg:hover .logo-orbit {
          opacity: 0.4;
          animation: logo-orbit-spin 3s linear infinite;
          transition: opacity 0.3s ease;
        }
        @keyframes logo-orbit-spin {
          from { transform-origin: 20px 20px; transform: rotate(0deg); }
          to   { transform-origin: 20px 20px; transform: rotate(360deg); }
        }

        /* Hex border brightens on hover */
        .logo-svg:hover .logo-hex {
          stroke: url(#logoGrad2);
          filter: url(#logoGlow);
          transition: filter 0.2s;
        }

        /* Lines glow on hover */
        .logo-svg:hover .logo-line {
          filter: url(#logoGlow);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .logo-hex,
          .logo-line,
          .logo-center,
          .logo-node {
            animation: none !important;
            stroke-dashoffset: 0;
            transform: scale(1);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}
