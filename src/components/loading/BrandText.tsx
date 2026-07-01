'use client'
import { motion } from 'framer-motion'
import { textVariants, subtitleVariants, dividerVariants } from '@/lib/loader-animations'

export default function BrandText() {
  return (
    <div className="flex flex-col items-center" style={{ gap: 10, marginTop: 24 }}>

      {/* Brand name — site uses light/muted text on white bg */}
      <motion.p
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.50em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.92)',  // white — readable on dark bg
        }}
        variants={textVariants}
        custom={2.0}
        initial="hidden"
        animate="visible"
      >
        Shri Hari Jewellers
      </motion.p>

      {/* Divider — brand gold */}
      <motion.div
        className="origin-center"
        style={{
          height: 1,
          width: 52,
          background: 'linear-gradient(to right, transparent, #C9A74D, transparent)',
        }}
        variants={dividerVariants}
        custom={2.3}
        initial="hidden"
        animate="visible"
      />

      {/* Subtitle — muted champagne */}
      <motion.p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 8,
          fontStyle: 'italic',
          letterSpacing: '0.18em',
          color: 'rgba(201,167,77,0.65)',
        }}
        variants={subtitleVariants}
        custom={2.5}
        initial="hidden"
        animate="visible"
      >
        Crafting Timeless Elegance
      </motion.p>

      {/* Location — very subtle */}
      <motion.p
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 7,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: 'rgba(128,105,191,0.55)',  // brand purple, muted
        }}
        variants={subtitleVariants}
        custom={2.7}
        initial="hidden"
        animate="visible"
      >
        Mogar · Anand · Est. 2001
      </motion.p>
    </div>
  )
}
