'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * World-class luxury splash screen — shown on every full page load / refresh.
 * Inspired by Tanishq, Cartier, Tiffany & Co.
 * Mounts once in RootLayout → persists through client-side navigation.
 */
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show for 2.4s then fade out
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  // Ring circumference for r=52: 2π×52 ≈ 326.7
  const CIRCUMFERENCE = 2 * Math.PI * 52;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >

          {/* ── Animated logo ring ────────────────────────────────────────── */}
          <div className="relative w-36 h-36 mb-7">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Static faint background ring */}
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="#EDE8DF"
                strokeWidth="1"
              />
              {/* Animated drawing ring */}
              <motion.circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              />
              {/* Gold gradient definition */}
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#F5D78A" />
                  <stop offset="50%"  stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#A07830" />
                </linearGradient>
              </defs>
              {/* Four corner diamond accents */}
              {[0, 90, 180, 270].map((deg) => (
                <motion.circle
                  key={deg}
                  cx={60 + 52 * Math.cos((deg * Math.PI) / 180)}
                  cy={60 + 52 * Math.sin((deg * Math.PI) / 180)}
                  r="2"
                  fill="#C9A84C"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.3 }}
                />
              ))}
            </svg>

            {/* Centre monogram */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <motion.span
                className="text-[28px] leading-none font-headline font-bold text-[#8069BF]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                SH
              </motion.span>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                style={{ width: 32 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.75, duration: 0.45 }}
              />
            </div>
          </div>

          {/* ── Brand text block ──────────────────────────────────────────── */}
          <motion.p
            className="text-[12px] uppercase tracking-[0.5em] font-label font-semibold text-[#8069BF] mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Shree Hari Jewellers
          </motion.p>

          <motion.p
            className="text-[10px] uppercase tracking-[0.35em] font-label text-[#C9A84C] mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Padrawala
          </motion.p>

          <motion.p
            className="text-[9px] uppercase tracking-[0.25em] font-label text-[#9E9AAA]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Mogar · Anand · Est. 2001
          </motion.p>

          {/* ── Bottom gold progress sweep ────────────────────────────────── */}
          <motion.div
            className="absolute bottom-0 h-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
              left: '50%',
              x: '-50%',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.1, duration: 2.3, ease: 'easeInOut' }}
          />

          {/* ── Subtle corner ornaments ───────────────────────────────────── */}
          {[
            'top-6 left-6',
            'top-6 right-6 rotate-90',
            'bottom-6 right-6 rotate-180',
            'bottom-6 left-6 -rotate-90',
          ].map((pos, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 20 20"
              className={`absolute w-5 h-5 ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            >
              <path
                d="M1 1 L8 1 M1 1 L1 8"
                stroke="#C9A84C"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
            </motion.svg>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
