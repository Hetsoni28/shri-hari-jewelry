'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { luxuryEasing } from '@/lib/animations';

export default function ContactHeader() {
  const reduceMotion = !!useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background image moves at 0.35x scroll speed — cinematic parallax
  const bgY           = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentY      = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[400px] sm:min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/bridal_collection_1780906256760.png")',
          scale: 1.1,
          y: reduceMotion ? 0 : bgY,
        }}
      />

      {/* Grain texture overlay — premium tactile feel */}
      <div className="absolute inset-0 luxury-grain opacity-[0.04] mix-blend-overlay z-[1] pointer-events-none" />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/55 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/35 via-transparent to-black/55 mix-blend-multiply z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-[2]" />

      {/* Gold hairline at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent z-[3]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: luxuryEasing.reveal, delay: 0.6 }}
      />

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-[4] text-center max-w-3xl"
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }}
      >
        {/* Headline — word reveal */}
        <div className="mb-6 sm:mb-8 overflow-hidden">
          {[['Connect'], ['with'], ['Heritage']].map((words, li) => (
            <div key={li} className="overflow-hidden">
              {words.map((word, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  className={`inline-block text-2xl sm:text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tight drop-shadow-2xl ${
                    li === 2 ? 'italic font-serif font-normal text-[var(--color-tertiary)]' : 'text-white'
                  }`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4 + li * 0.12 + wi * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          className="text-white/85 text-sm md:text-lg leading-relaxed max-w-xl mx-auto font-medium drop-shadow-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: luxuryEasing.reveal }}
        >
          Whether you are looking for a bespoke Indian masterpiece or the perfect
          gift for a loved one, our artisans are here to assist you.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center gap-1.5 mt-10 sm:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <span className="text-white/35 text-[9px] uppercase tracking-[0.3em] font-label">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
