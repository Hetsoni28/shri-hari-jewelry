'use client'
import { motion } from 'framer-motion'

// Site's actual brand colors — NOT a generic gold/black template
export const BRAND_PURPLE = '#8069BF'
export const BRAND_GOLD   = '#C9A74D'
export const BG_CREAM     = '#FDFCFA'   // matches site's white/cream
export const MUTED_PURPLE = '#7C7296'
export const DARK_TEXT    = '#1A1625'   // very dark purple-charcoal

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/*
        Subtle radial centre glow using brand purple — NOT yellow gold.
        Very low opacity so it stays refined, not flashy.
      */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle,
            rgba(128,105,191,0.10) 0%,
            rgba(128,105,191,0.04) 40%,
            transparent 70%)`,
          width: 700,
          height: 700,
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
      />
      {/* Soft warm centre highlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle,
            rgba(201,167,77,0.06) 0%,
            transparent 60%)`,
          width: 300,
          height: 300,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}
