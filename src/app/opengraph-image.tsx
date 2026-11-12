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

          {/* Brand name in brand purple */}
          <div style={{ color: '#8069BF', fontSize: '70px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1', display: 'flex' }}>
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
