'use client';

import { shopInfo } from '@/data/shopInfo';

// Last-resort page if the whole site (including the layout) fails. It has to be
// self-contained — no shared CSS or components — so it uses inline styles only.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#FDFCFA', color: '#1C1726', fontFamily: 'Georgia, serif', padding: '24px' }}>
        <main style={{ maxWidth: 480, textAlign: 'center' }} aria-labelledby="g-title">
          <p style={{ fontSize: 26, fontWeight: 700, color: '#8069BF', margin: 0 }}>શ્રી હરિ જ્વેલર્સ</p>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A6D25', margin: '6px 0 32px' }}>
            Shree Hari Jewellers
          </p>
          <h1 id="g-title" style={{ fontSize: 30, fontWeight: 500, margin: '0 0 12px' }}>We&apos;ll be right back</h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5F5A6B', margin: '0 0 28px' }}>
            The website is having trouble right now. You can still reach us directly.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={reset}
              style={{ minHeight: 48, padding: '12px 28px', background: '#1C1726', color: '#fff', border: 0, fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href={`https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}`}
              style={{ minHeight: 48, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', padding: '12px 28px', border: '1px solid #1C1726', color: '#1C1726', fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              WhatsApp us
            </a>
          </div>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: '#5F5A6B', marginTop: 24 }}>
            or call <a href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`} style={{ color: '#1C1726', fontWeight: 600 }}>{shopInfo.phone1}</a>
          </p>
          {error.digest && <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#6B6577' }}>Reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
