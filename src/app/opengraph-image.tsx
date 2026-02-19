import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rhodai — Web Design, AI Integration & Lead Generation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050508',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background grid dots (simplified) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 50%)',
          }}
        />

        {/* Logo mark (hexagon SVG) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <polygon points="20,2 35.5,11 35.5,29 20,38 4.5,29 4.5,11" fill="none" stroke="url(#g)" strokeWidth="1.5" />
            <line x1="20" y1="4" x2="20" y2="20" stroke="url(#g)" strokeWidth="1.2" />
            <line x1="33.5" y1="12" x2="20" y2="20" stroke="url(#g)" strokeWidth="1.2" />
            <line x1="6.5" y1="28" x2="20" y2="20" stroke="url(#g)" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="3" fill="url(#g)" />
            <circle cx="20" cy="4" r="2" fill="#06b6d4" />
            <circle cx="33.5" cy="12" r="2" fill="#8b5cf6" />
            <circle cx="6.5" cy="28" r="2" fill="#06b6d4" />
          </svg>
          <div style={{ display: 'flex', gap: '0px' }}>
            <span style={{ color: '#f8fafc', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.5px' }}>Rho</span>
            <span style={{ color: '#06b6d4', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.5px' }}>dai</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            Build Smarter.{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Grow Faster.
            </span>
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              lineHeight: 1.5,
              marginTop: '8px',
            }}
          >
            Web Design · AI Integration · Lead Generation
          </div>
        </div>

        {/* Bottom URL tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            fontSize: '18px',
            color: '#475569',
            fontFamily: 'monospace',
          }}
        >
          rhodai.ai
        </div>
      </div>
    ),
    { ...size }
  )
}
