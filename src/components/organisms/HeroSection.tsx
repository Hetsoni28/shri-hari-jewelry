'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const SLIDE_DURATION = 6000;

type HeroImage = {
  urlDesktop: string;
  urlMobile: string;
  name: string;
  category: string;
  slug?: string;
};

const TEMPLATES = [
  {
    eyebrow: 'Shri Hari Jewellers · Est. 2001',
    line1: 'A TRULY',
    line2: 'MAGICAL',
    line3: 'JOURNEY.',
    tagline: 'Step into a world where timeless heritage meets modern elegance.',
    cta1: { text: 'View Collection', href: '/catalog' },
    cta2: { text: 'Contact Us', href: '/contact' },
  },
  {
    eyebrow: 'Handcrafted With Love',
    line1: 'GOLD &',
    line2: 'SILVER',
    line3: 'MASTERPIECES.',
    tagline: 'Over 100+ designs crafted for every precious occasion.',
    cta1: { text: 'Explore Catalog', href: '/catalog' },
    cta2: { text: 'Our Story', href: '/contact' },
  },
  {
    eyebrow: 'For Every Precious Moment',
    line1: 'CRAFTED',
    line2: 'FOR YOUR',
    line3: 'STORY.',
    tagline: 'Rings • Necklaces • Bangles • Malas. Perfection for every occasion.',
    cta1: { text: 'Book A Visit', href: '/contact' },
    cta2: { text: 'Collections', href: '/collections' },
  },
  {
    eyebrow: 'New Arrivals · 2025',
    line1: 'TIMELESS',
    line2: 'ELEGANCE',
    line3: 'REDEFINED.',
    tagline: 'Each piece a testament to centuries of Indian jewellery-making craft.',
    cta1: { text: 'Shop Now', href: '/catalog' },
    cta2: { text: 'Contact Us', href: '/contact' },
  },
];

// Empty fallback — hero images always come from Sanity via page.tsx.
// If Sanity returns nothing the hero is simply not shown (handled in the component).
const FALLBACK: HeroImage[] = [];

const KB_VARIANTS = [
  { initial: { scale: 1.12, x: '3%',  y: '2%'  }, animate: { scale: 1.0, x: '0%',  y: '0%'  } },
  { initial: { scale: 1.10, x: '-3%', y: '-2%' }, animate: { scale: 1.0, x: '0%',  y: '0%'  } },
  { initial: { scale: 1.0,  x: '0%',  y: '0%'  }, animate: { scale: 1.1, x: '-2%', y: '-1%' } },
  { initial: { scale: 1.08, x: '2%',  y: '-2%' }, animate: { scale: 1.0, x: '-1%', y: '1%'  } },
];

type Props = { heroImages?: HeroImage[] };

export default function HeroSection({ heroImages }: Props) {
  const reduceMotion = !!useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [loaded,  setLoaded]  = useState<Record<number, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [winH,    setWinH]    = useState(700);
  const sectionRef = useRef<HTMLElement>(null);

  const images = heroImages && heroImages.length > 0 ? heroImages : FALLBACK;
  const total  = images.length;

  /* ── Mount + capture window height safely (SSR-safe) ── */
  useEffect(() => {
    setMounted(true);
    setWinH(window.innerHeight);
    const onResize = () => setWinH(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Preload next image ── */
  useEffect(() => {
    const next = (current + 1) % total;
    if (!loaded[next]) {
      // Preload both mobile and desktop so no matter what screen size they are on, it's ready
      const imgDesktop = new window.Image();
      const imgMobile  = new window.Image();
      imgDesktop.src = images[next].urlDesktop;
      imgMobile.src  = images[next].urlMobile;
      imgDesktop.onload = () => setLoaded(p => ({ ...p, [next]: true }));
    }
  }, [current, total, images, loaded]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setCurrent(p => (p + 1) % total), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [current, mounted, total]);

  /* ── Scroll parallax ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY       = useTransform(scrollYProgress, [0, 1],    ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const img      = images[current];
  const template = TEMPLATES[current % TEMPLATES.length];
  const kb       = KB_VARIANTS[current % KB_VARIANTS.length];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      /* 
        Mobile:  100svh (safe area aware, no browser chrome overlap)
        Tablet+: 100dvh  
        Min 560px so tiny phones still look good, max 1080px for ultra-wide
      */
      style={{ height: '100svh', minHeight: '560px', maxHeight: '1080px' }}
    >
      {/* ── Cinematic Background ── */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 will-change-transform"
          initial={{ opacity: 0, ...kb.initial }}
          animate={{ opacity: 1, ...kb.animate }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{
            opacity: { duration: 1.6, ease: [0.4, 0, 0.2, 1] },
            scale:   { duration: SLIDE_DURATION / 1000, ease: 'linear' },
            x:       { duration: SLIDE_DURATION / 1000, ease: 'linear' },
            y:       { duration: SLIDE_DURATION / 1000, ease: 'linear' },
          }}
        >
          {/* ── Mobile Image (Sanity Portrait Crop via Hotspot) ── */}
          <div className="absolute inset-0 block sm:hidden">
            <Image
              src={img.urlMobile}
              alt={img.name}
              fill
              priority={current === 0}
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
            />
          </div>

          {/* ── Desktop Image (Sanity Landscape Crop) ── */}
          <div className="absolute inset-0 hidden sm:block">
            <Image
              src={img.urlDesktop}
              alt={img.name}
              fill
              priority={current === 0}
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" style={{ zIndex: 1 }} />
      {/* Left sweep — stronger on mobile so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:from-black/80 sm:via-black/40" style={{ zIndex: 1 }} />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" style={{ zIndex: 1 }} />

      {/* ── Gold Dust Particles (desktop only — saves mobile battery) ── */}
      {!reduceMotion && mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block" style={{ zIndex: 2 }}>
          {Array.from({ length: 18 }).map((_, i) => {
            const x   = (i * 47 + 13) % 100;
            const dur = 10 + (i * 7 % 14);
            const del = (i * 3) % 8;
            const sz  = i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1';
            return (
              <motion.div
                key={i}
                className={`absolute ${sz} rounded-full bg-[#C9A84C] blur-[1px] opacity-0`}
                style={{ left: `${x}%`, bottom: '-5%' }}
                animate={{
                  y:       [0, -winH * 1.1],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'linear' }}
              />
            );
          })}
        </div>
      )}

      {/* ── Content Layer ── */}
      <motion.div
        className={[
          'absolute inset-0 flex flex-col justify-end',
          // Mobile: tighter side padding, less bottom padding
          'px-5 pb-14',
          // Small (≥640px)
          'sm:px-10 sm:pb-18',
          // Medium (≥768px)
          'md:px-16 md:pb-20',
          // Large (≥1024px)
          'lg:px-20',
        ].join(' ')}
        style={{ zIndex: 3, y: contentY, opacity: contentOpacity }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={`text-${current}`} className="w-full max-w-2xl lg:max-w-3xl">

            {/* ── Eyebrow ── */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1,  x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <motion.div
                className="h-px bg-[#C9A84C] flex-shrink-0"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
              {/* Truncate long eyebrow on very small screens */}
              <span className="text-[#C9A84C] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[8px] sm:text-[10px] font-bold truncate">
                {template.eyebrow}
              </span>
            </motion.div>

            {/* ── Headline ── */}
            {/*
              clamp(2rem, 10vw, 6.5rem):
                - 2rem   = 32px  → safe on 320px phone
                - 10vw          → scales naturally with screen width
                - 6.5rem = 104px → cap on desktop
            */}
            <div className="mb-3 sm:mb-5">
              {[template.line1, template.line2, template.line3].map((line, li) => (
                <div key={li} className="overflow-hidden leading-[1.05]">
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%',   opacity: 1 }}
                    exit={{ y: '-20%', opacity: 0 }}
                    transition={{
                      duration: 0.9,
                      ease:     [0.16, 1, 0.3, 1],
                      delay:    0.2 + li * 0.12,
                    }}
                    className={[
                      'font-black uppercase tracking-tight',
                      'drop-shadow-2xl [text-shadow:0_4px_30px_rgba(0,0,0,0.9)]',
                      '[font-size:clamp(2rem,10vw,6.5rem)]',
                      li === 2
                        ? 'text-[#C9A84C] italic font-serif font-normal relative overflow-hidden'
                        : 'text-white',
                    ].join(' ')}
                  >
                    {line}
                    {/* Shimmer on gold line — desktop only */}
                    {li === 2 && !reduceMotion && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-overlay hidden sm:block"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut', delay: 1.2 }}
                      />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* ── Tagline ── */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
              className="text-white/85 text-[12px] sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-7 max-w-xs sm:max-w-sm md:max-w-md [text-shadow:0_2px_16px_rgba(0,0,0,0.95)]"
            >
              {template.tagline}
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {/* Primary — gold fill */}
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 16px 40px -8px rgba(201,168,76,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={template.cta1.href}
                  className={[
                    'inline-block bg-[#C9A84C] hover:brightness-110 text-white',
                    // Slightly smaller tap target on mobile, comfortable on desktop
                    'py-3 px-6 text-[10px]',
                    'sm:py-3.5 sm:px-8 sm:text-xs',
                    'font-bold tracking-[0.22em] uppercase',
                    'transition-[filter,box-shadow] duration-300 shadow-2xl',
                  ].join(' ')}
                >
                  {template.cta1.text}
                </Link>
              </motion.div>

              {/* Secondary — ghost */}
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={template.cta2.href}
                  className={[
                    'inline-block border border-white/50 text-white',
                    'hover:border-[#C9A84C] hover:text-[#C9A84C]',
                    'py-3 px-6 text-[10px]',
                    'sm:py-3.5 sm:px-8 sm:text-xs',
                    'font-bold tracking-[0.22em] uppercase',
                    'transition-colors duration-300 backdrop-blur-sm',
                  ].join(' ')}
                >
                  {template.cta2.text}
                </Link>
              </motion.div>
            </motion.div>

            {/* ── "Now Showing" badge — clickable ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-4 sm:mt-6 flex items-center gap-2"
            >
              <span className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                Now showing
              </span>
              <Link
                href={img.slug ? `/catalog/${img.slug}` : `/catalog?category=${img.category}`}
                className="text-white/60 hover:text-[#C9A84C] text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] border-b border-white/20 hover:border-[#C9A84C] pb-px transition-colors duration-300"
              >
                {img.category}
              </Link>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Gold Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10" style={{ zIndex: 4 }}>
        <motion.div
          key={`bar-${current}`}
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#f0d080] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
