'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { shopInfo } from '@/data/shopInfo';
import { goldShimmerVariant, staggerContainer, fadeUpVariant, luxuryEasing } from '@/lib/animations';

export default function BespokeService() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="max-w-md mx-auto border border-[var(--color-tertiary)]/50 bg-[var(--color-background-light)] p-8 sm:p-10 flex flex-col items-center text-center mb-12 sm:mb-16"
    >
      {/* Animated sparkle icon */}
      <motion.div
        variants={goldShimmerVariant}
        initial="initial"
        animate="animate"
        className="mb-6"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-tertiary)"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </motion.div>

      {/* Animated divider */}
      <motion.div
        className="h-px bg-[var(--color-tertiary)]/40 mb-6 origin-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: luxuryEasing.reveal, delay: 0.15 }}
        style={{ width: 48 }}
      />

      <motion.h2
        variants={fadeUpVariant}
        className="text-2xl sm:text-3xl font-headline font-bold text-[var(--foreground)] mb-5"
      >
        Bespoke Service
      </motion.h2>

      <motion.p
        variants={fadeUpVariant}
        className="text-body text-sm text-[var(--color-neutral)] leading-relaxed mb-8 sm:mb-10"
      >
        Have a vision for a unique piece? Our master craftsmen specialize in bringing your personal
        stories to life through custom-designed jewelry.
      </motion.p>

      <motion.a
        variants={fadeUpVariant}
        href={`https://wa.me/${shopInfo.phone2.replace(/\s+/g, '')}?text=Hello! I am interested in your bespoke design service.`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, transition: { duration: 0.25 } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
        className="w-full flex items-center justify-center space-x-3 bg-[var(--color-tertiary)] hover:brightness-90 text-white py-4 px-6 text-[10px] font-label font-bold tracking-[0.22em] uppercase transition-[filter] duration-300"
      >
        <span>Inquire Now</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
