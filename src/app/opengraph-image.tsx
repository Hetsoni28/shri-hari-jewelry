import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Shri Hari Jewellers | Gold & Silver Ornaments';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * OG Image — shown on WhatsApp, Facebook, iMessage, Twitter when link is shared.
 *
 * Satori limitations (used by next/og ImageResponse):
 *  - NO <text> SVG elements → use positioned <div> overlays instead
 *  - NO special Unicode like ◆ → use a rotated <div> box instead
 *  - SVG <path>, <circle>, <g> with transform ARE supported
 */
export default function OGImage() {
  // 36 sunburst triangles — same as the actual icon.svg
  const sunbursts = Array.from({ length: 36 }, (_, i) => i)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #FDFCFA 0%, #F5F0E8 50%, #FDFCFA 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Gold border frame */}
        <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(201,167,77,0.35)', display: 'flex' }} />

        {/* Corner L-brackets */}
        {[
          { top: '28px',    left: '28px',   borderTop: '2px solid #C9A74D', borderLeft: '2px solid #C9A74D', borderBottom: 'none', borderRight: 'none' },
          { top: '28px',    right: '28px',  borderTop: '2px solid #C9A74D', borderRight: '2px solid #C9A74D', borderBottom: 'none', borderLeft: 'none' },
          { bottom: '28px', left: '28px',   borderBottom: '2px solid #C9A74D', borderLeft: '2px solid #C9A74D', borderTop: 'none', borderRight: 'none' },
          { bottom: '28px', right: '28px',  borderBottom: '2px solid #C9A74D', borderRight: '2px solid #C9A74D', borderTop: 'none', borderLeft: 'none' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: '30px', height: '30px', display: 'flex', ...s }} />
        ))}

        {/* ── MAIN CONTENT ───────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          {/* Logo: SVG ring + overlaid div for "SH" (no SVG text) */}
          <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <svg width="220" height="220" viewBox="0 0 100 100">
              {/* Outer ring */}
              <circle cx="50" cy="50" r="48" fill="#FDFCFA" stroke="#C9A74D" strokeWidth="1.2" />

              {/* 36 sunburst gold triangles */}
              {sunbursts.map((i) => (
                <path
                  key={i}
                  d="M50 4 L51 8 L49 8 Z"
                  fill="#C9A74D"
                  transform={`rotate(${i * 10} 50 50)`}
                />
              ))}

              {/* Beaded inner ring */}
              <circle cx="50" cy="50" r="40" stroke="#B8860B" strokeWidth="1.2" strokeDasharray="2 4" fill="none" />

              {/* Diamond geometry */}
              <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="#C9A74D" strokeWidth="0.8" fill="none" opacity="0.3" />
              <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.45" />

              {/* Centre white fill */}
              <circle cx="50" cy="50" r="32" fill="#FDFCFA" />
              <circle cx="50" cy="50" r="30" stroke="#C9A74D" strokeWidth="0.8" opacity="0.5" fill="none" />

              {/* Crown at top */}
              <path d="M44 26 C48 20, 52 20, 56 26 C53 28, 47 28, 44 26 Z" fill="#C9A74D" />
              <circle cx="50" cy="22" r="1.5" fill="#D4AF37" />

              {/* Bottom arrow ornament */}
              <path d="M50 78 L47 72 L53 72 Z" fill="#B8860B" />

              {/* NO <text> here — Satori doesn't support SVG text nodes */}
            </svg>

            {/* "SH" as an HTML div overlaid on the centre of the SVG */}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8069BF',
                fontSize: '50px',
                fontWeight: '900',
                fontFamily: 'Georgia, serif',
                letterSpacing: '3px',
                paddingTop: '8px', // nudge to match original text y-position
              }}
            >
              SH
            </div>
          </div>

          {/* Brand name in brand purple */}
          <div style={{ color: '#8069BF', fontSize: '70px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1', marginTop: '18px', display: 'flex' }}>
            Shri Hari
          </div>

          {/* JEWELLERS in gold */}
          <div style={{ color: '#C9A74D', fontSize: '32px', fontWeight: '400', letterSpacing: '14px', marginTop: '6px', display: 'flex' }}>
            JEWELLERS
          </div>

          {/* Divider — rotated div square instead of Unicode diamond (no font needed) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '18px', marginBottom: '14px' }}>
            <div style={{ width: '80px', height: '1px', background: '#C9A74D', display: 'flex' }} />
            <div style={{ width: '8px', height: '8px', background: '#C9A74D', transform: 'rotate(45deg)', display: 'flex' }} />
            <div style={{ width: '80px', height: '1px', background: '#C9A74D', display: 'flex' }} />
          </div>

          {/* Subtitle — plain ASCII only */}
          <div style={{ color: '#7C7296', fontSize: '17px', letterSpacing: '4px', display: 'flex' }}>
            GOLD &amp; SILVER ORNAMENTS - PADRAWALA
          </div>

          <div style={{ color: 'rgba(128,105,191,0.55)', fontSize: '13px', letterSpacing: '3px', marginTop: '8px', display: 'flex' }}>
            MOGAR - ANAND - EST. 2001
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
