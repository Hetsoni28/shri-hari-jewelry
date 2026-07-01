'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { luxuryEasing } from '@/lib/animations';

const WORD_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reduceMotion = !!useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ensure video plays on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh', minHeight: '560px', maxHeight: '1000px' }}
    >
      {/* ── Full-Bleed Video with Parallax ── */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: videoY, scale: 1.12 }}
        >
          <video
            ref={videoRef}
            src="/videos/hero_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}

      {/* ── Mobile overlay — lighter so video is visible but text stays readable ── */}
      <div className="absolute inset-0 bg-black/45 sm:hidden"                                                                style={{ zIndex: 1 }} />

      {/* ── Cinematic Overlays (desktop) ── */}
      <div className="absolute inset-0 hidden sm:block bg-black/15"                                                           style={{ zIndex: 1 }} />
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-black/60 via-transparent to-black/20"           style={{ zIndex: 1 }} />
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/55 via-black/5 to-transparent"            style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:from-black/0"       style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.25)_100%)]"     style={{ zIndex: 1 }} />

      {/* ── Content Layer ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between px-5 sm:px-8 md:px-14 pt-20 pb-8 sm:pt-32 sm:pb-10 md:pt-40 md:pb-12"
        style={{ zIndex: 2, y: contentY, opacity: contentOpacity }}
      >
        {/* Top — Brand eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="h-px bg-[#C9A84C] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: luxuryEasing.reveal, delay: 0.5 }}
            style={{ width: 28 }}
          />
          <span className="text-[#C9A84C] uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-bold font-label">
            Shri Hari Jewellers · Est. 2001
          </span>
        </motion.div>

        {/* Middle — Main headline + description + CTAs */}
        <div className="flex-1 flex items-end pb-4 sm:pb-6">
          <div className="w-full max-w-3xl">

            {/* Headline — word by word */}
            <div className="mb-3 sm:mb-4">
              {[['A TRULY', 'MAGICAL'], ['JEWELRY', 'JOURNEY.']].map((line, li) => (
                <div key={li} className="overflow-hidden py-1 -my-1">
                  <div className="flex flex-wrap gap-x-[0.28em]">
                    {line.map((word, wi) => (
                      <motion.span
                        key={`${li}-${wi}`}
                        initial={{ y: '115%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{
                          duration: 0.75,
                          ease: WORD_EASE,
                          delay: 0.5 + li * 0.14 + wi * 0.08,
                        }}
                        className={`inline-block text-headline text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[78px] xl:text-[92px] font-bold leading-[1.05] tracking-tight drop-shadow-2xl [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] ${
                          li === 1 ? 'text-[#C9A84C] italic font-serif font-normal' : 'text-white'
                        }`}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: WORD_EASE, delay: 1.0 }}
              className="text-white/90 text-[12px] sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm font-body [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]"
            >
              Step into a world where timeless heritage meets modern elegance.
              Every masterpiece is crafted to tell your unique story.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: WORD_EASE, delay: 1.2 }}
              className="flex flex-wrap gap-3"
            >
              <motion.div
                whileHover={{ y: -2, boxShadow: '0 12px 32px -8px rgba(201,168,76,0.45)', transition: { duration: 0.22 } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/catalog"
                  className="inline-block bg-[#C9A84C] hover:brightness-110 text-white py-3 px-7 sm:py-3.5 sm:px-8 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-[filter] duration-300 shadow-2xl"
                >
                  View Collection
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.22 } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="inline-block border border-white/40 hover:border-white text-white py-3 px-7 sm:py-3.5 sm:px-8 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom — Decorative gold line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, ease: luxuryEasing.reveal, delay: 1.4 }}
          className="h-px bg-gradient-to-r from-[#C9A84C]/70 via-[#C9A84C]/20 to-transparent origin-left"
        />
      </motion.div>
    </section>
  );
}
