'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LuxuryLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
          style={{ background: '#FDFCFA' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* Subtle warm centre glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,167,77,0.08) 0%, rgba(128,105,191,0.03) 60%, transparent 100%)',
            }}
          />

          {/* ── All content centred ───────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* ACTUAL SITE LOGO — inline SVG from icon.svg ─────── */}
            <motion.div
              style={{ width: 160, height: 160, position: 'relative' }}
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                width="160"
                height="160"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Shri Hari Jewellers Logo"
              >
                {/* Background circle — transparent so cream bg shows through */}
                <circle cx="50" cy="50" r="48" fill="transparent" stroke="#C9A74D" strokeWidth="1.2" />

                {/* Sunburst / Lotus ring — slow rotating group */}
                <motion.g
                  style={{ transformOrigin: '50px 50px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  {Array.from({ length: 36 }, (_, i) => (
                    <path
                      key={i}
                      d="M50 4 L51 8 L49 8 Z"
                      fill="#C9A74D"
                      transform={`rotate(${i * 10} 50 50)`}
                    />
                  ))}
                </motion.g>

                {/* Inner beaded dashed ring */}
                <circle
                  cx="50" cy="50" r="40"
                  stroke="#B8860B"
                  strokeWidth="1.2"
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Geometric diamond frame */}
                <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="#C9A74D" strokeWidth="0.8" fill="none" opacity="0.35" />
                <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="#B8860B" strokeWidth="0.8" fill="none" opacity="0.5" />

                {/* Centre white circle — matches cream bg */}
                <circle cx="50" cy="50" r="32" fill="#FDFCFA" />
                <circle cx="50" cy="50" r="30" stroke="#C9A74D" strokeWidth="0.8" opacity="0.55" fill="none" />

                {/* Crown ornament top */}
                <path d="M44 26 C48 20, 52 20, 56 26 C53 28, 47 28, 44 26 Z" fill="#C9A74D" />
                <circle cx="50" cy="22" r="1.5" fill="#D4AF37" />

                {/* Bottom diamond ornament */}
                <path d="M50 78 L47 72 L53 72 Z" fill="#B8860B" />

                {/* SH monogram — brand purple matching the website */}
                <text
                  x="50"
                  y="60"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="28"
                  fontWeight="900"
                  fill="#8069BF"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  SH
                </text>
              </svg>

              {/* Shine sweep — contained inside the 160×160 box */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
                initial={{ x: '-130%' }}
                animate={{ x: '130%' }}
                transition={{ delay: 2.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(108deg, transparent 20%, rgba(255,248,220,0.22) 46%, rgba(255,248,220,0.30) 54%, transparent 78%)',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* BRAND TEXT ───────────────────────────────────────── */}
            <div className="flex flex-col items-center" style={{ gap: 9 }}>
              <motion.p
                style={{
                  fontFamily: "'Source Sans 3', Arial, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.50em',
                  textTransform: 'uppercase',
                  color: '#1A1625',
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Shri Hari Jewellers
              </motion.p>

              <motion.div
                style={{
                  height: 1,
                  width: 52,
                  background: 'linear-gradient(to right, transparent, #C9A74D, transparent)',
                  transformOrigin: 'center',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              />

              <motion.p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 9,
                  fontStyle: 'italic',
                  color: 'rgba(160,120,48,0.80)',
                  letterSpacing: '0.15em',
                  margin: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.7 }}
              >
                Crafting Timeless Elegance
              </motion.p>

              <motion.p
                style={{
                  fontFamily: "'Source Sans 3', Arial, sans-serif",
                  fontSize: 7,
                  letterSpacing: '0.30em',
                  textTransform: 'uppercase',
                  color: 'rgba(128,105,191,0.60)',
                  margin: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
              >
                Mogar · Anand · Est. 2001
              </motion.p>
            </div>

            {/* LOADING DIAMONDS ─────────────────────────────────── */}
            <motion.div
              style={{ display: 'flex', gap: 12, alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
            >
              {([
                { color: '#8069BF', delay: 0 },
                { color: '#C9A74D', delay: 0.22 },
                { color: '#8069BF', delay: 0.44 },
              ] as { color: string; delay: number }[]).map((d, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: d.color,
                    transform: 'rotate(45deg)',
                    willChange: 'opacity',
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.1,
                    delay: d.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* PROGRESS LINES ───────────────────────────────────── */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 1,
              background:
                'linear-gradient(to right, transparent, #8069BF 25%, #C9A74D 50%, #8069BF 75%, transparent)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.2, duration: 3.2, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 1,
              background:
                'linear-gradient(to right, transparent, #8069BF 25%, #C9A74D 50%, #8069BF 75%, transparent)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.2, duration: 3.2, ease: 'easeInOut' }}
          />

          {/* CORNER ORNAMENTS ─────────────────────────────────── */}
          {([
            { cls: 'top-5 left-5',     rot: 0   },
            { cls: 'top-5 right-5',    rot: 90  },
            { cls: 'bottom-5 right-5', rot: 180 },
            { cls: 'bottom-5 left-5',  rot: 270 },
          ] as { cls: string; rot: number }[]).map(({ cls, rot }, i) => (
            <motion.svg
              key={i}
              aria-hidden="true"
              width="16" height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`absolute ${cls}`}
              style={{ rotate: rot }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
            >
              <path d="M1 1 H7 M1 1 V7" stroke="#C9A74D" strokeWidth="0.9" opacity="0.5" />
            </motion.svg>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
