'use client'
import { motion } from 'framer-motion'

export default function LoaderLogo() {
  const CIRC = 2 * Math.PI * 50   // circumference for r=50

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 156, height: 156 }}
      initial={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── SVG ring ───────────────────────────────────────────── */}
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <defs>
          {/* Purple → Gold gradient matching the site palette */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#8069BF" />
            <stop offset="50%"  stopColor="#C9A74D" />
            <stop offset="100%" stopColor="#8069BF" />
          </linearGradient>
        </defs>

        {/* Faint outer guide ring */}
        <circle cx="60" cy="60" r="54"
          fill="none"
          stroke="rgba(128,105,191,0.12)"
          strokeWidth="0.5"
        />

        {/* Static inner decorative ring */}
        <circle cx="60" cy="60" r="50"
          fill="none"
          stroke="rgba(201,167,77,0.15)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
        />

        {/* Animated drawing ring — purple→gold gradient */}
        <motion.circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        {/* Four cardinal accent dots — brand gold */}
        {[0, 90, 180, 270].map((deg) => (
          <motion.circle
            key={deg}
            cx={60 + 50 * Math.cos((deg * Math.PI) / 180)}
            cy={60 + 50 * Math.sin((deg * Math.PI) / 180)}
            r="1.8"
            fill="#C9A74D"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          />
        ))}
      </svg>

      {/* ── Monogram — uses ACTUAL brand purple ──────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
        {/* SH in brand purple — matching the actual site logo */}
        <motion.span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 30,
            fontWeight: 700,
            color: '#8069BF',
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          SH
        </motion.span>

        {/* Thin gold hairline under monogram */}
        <motion.div
          style={{
            height: 1,
            width: 28,
            background: 'linear-gradient(to right, transparent, #C9A74D, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        />

        {/* JEWELLERS micro-text in gold */}
        <motion.span
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 5.5,
            fontWeight: 600,
            color: '#C9A74D',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          JEWELLERS
        </motion.span>
      </div>

      {/* ── Shine sweep — polished gold reflection ─────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-20"
        style={{ borderRadius: '50%' }}
        initial={{ x: '-160%' }}
        animate={{ x: '160%' }}
        transition={{ delay: 2.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, transparent 20%, rgba(255,250,230,0.14) 45%, rgba(255,248,215,0.20) 52%, transparent 78%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
