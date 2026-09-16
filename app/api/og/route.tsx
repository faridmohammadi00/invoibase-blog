import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Invoibase Blog'
  const subtitle = searchParams.get('subtitle') || 'Crypto invoicing & Web3 financial insights'

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(145deg, #090A0F 0%, #11131F 55%, #1e1b4b 100%)',
        color: '#F8FAFC',
        padding: '64px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: '#6366F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          I
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Invoibase Blog</div>
          <div style={{ fontSize: 18, color: '#A5B4FC' }}>blog.invoibase.com</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
        <div
          style={{
            fontSize: title.length > 70 ? 48 : 58,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#CBD5E1', lineHeight: 1.4 }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 20,
          color: '#94A3B8',
        }}
      >
        <div>Non-custodial crypto invoicing</div>
        <div
          style={{
            padding: '10px 18px',
            borderRadius: 999,
            background: 'rgba(99,102,241,0.2)',
            color: '#C7D2FE',
            fontWeight: 600,
          }}
        >
          Read on Invoibase
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
