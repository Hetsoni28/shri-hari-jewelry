// ═══════════════════════════════════════════════════════════════════
// SHRI HARI JEWELLERS — LUXURY MOTION SYSTEM v2
// Inspired by: Cartier · Tiffany & Co. · Bulgari · Van Cleef · Rolex
// Philosophy: Every animation communicates craftsmanship & exclusivity
// ═══════════════════════════════════════════════════════════════════

import type { Variants, Transition } from 'framer-motion';

// ─── Easing Curves ───────────────────────────────────────────────
// Hand-tuned cubic-bezier curves matching luxury brand motion guidelines
export const luxuryEasing = {
  // Primary: ultra-smooth deceleration — feels weighty and premium
  standard:  [0.22, 1, 0.36, 1] as const,
  // Elegant: slower entrance, graceful rest — for modals and large sections
  elegant:   [0.33, 1, 0.68, 1] as const,
  // Swift:   fast out, buttery finish — for hover micro-interactions
  swift:     [0.25, 0.1, 0.25, 1] as const,
  // Reveal:  text and content entrances — slightly delayed deceleration
  reveal:    [0.16, 1, 0.3, 1] as const,
  // Press:   instant response, smooth release — button tap states
  press:     [0.4, 0, 0.6, 1] as const,
  // Cinematic: long, graceful entrance — for lightbox and hero
  cinematic: [0.12, 0, 0.39, 0] as const,
} as const;

// ─── Duration Scale ───────────────────────────────────────────────
export const durations = {
  instant:  0.15,  // Button press, instant feedback
  fast:     0.30,  // Hover micro-interactions
  standard: 0.50,  // Standard reveals
  slow:     0.70,  // Page sections, large elements
  cinematic:1.10,  // Lightbox, hero, full-page transitions
  float:    5.0,   // Continuous ambient float
} as const;

// ─── Shared Transition Presets ────────────────────────────────────
export const transitions = {
  standard: {
    duration: durations.standard,
    ease: luxuryEasing.standard,
  } satisfies Transition,

  elegant: {
    duration: durations.slow,
    ease: luxuryEasing.elegant,
  } satisfies Transition,

  fast: {
    duration: durations.fast,
    ease: luxuryEasing.swift,
  } satisfies Transition,

  cinematic: {
    duration: durations.cinematic,
    ease: luxuryEasing.elegant,
  } satisfies Transition,

  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 35,
    mass: 0.8,
  } satisfies Transition,

  springGentle: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 28,
    mass: 1,
  } satisfies Transition,
} as const;

// ═══════════════════════════════════════════════════════════════════
// CORE ENTRANCE VARIANTS
// ═══════════════════════════════════════════════════════════════════

// Fade up — primary entrance pattern (20-40px, 400-700ms per spec)
export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 32, willChange: 'opacity, transform' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.standard, ease: luxuryEasing.reveal },
  },
};

// Slide up — for section content blocks (slightly less travel)
export const slideUpVariant: Variants = {
  hidden:  { opacity: 0, y: 20, willChange: 'opacity, transform' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: luxuryEasing.reveal },
  },
};

// Fade in — purely opacity, no transform (for backgrounds, overlays)
export const fadeInVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: luxuryEasing.elegant } },
};

// Fade down — for navbar, dropdown items
export const fadeDownVariant: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.fast, ease: luxuryEasing.swift } },
};

// Reveal from left — for section headings
export const fadeLeftVariant: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.standard, ease: luxuryEasing.reveal } },
};

// Subtle scale reveal — for images (avoids aggressive zoom)
export const scaleRevealVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.slow, ease: luxuryEasing.elegant },
  },
};

// ─── Stagger Containers ───────────────────────────────────────────

// Standard stagger — for lists of cards, grid items
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren:   0.06,
    },
  },
};

// Fast stagger — for navbar links, small lists
export const fastStaggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren:   0.04,
    },
  },
};

// Slow stagger — for hero sections, major page-level reveals
export const heroContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren:   0.3,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// INTERACTION VARIANTS
// ═══════════════════════════════════════════════════════════════════

// Product card hover — subtle elevation, premium not playful (max scale 1.03)
export const cardHoverVariant: Variants = {
  rest: {
    y: 0,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
    transition: transitions.fast,
  },
  hover: {
    y: -4,
    boxShadow: '0px 16px 40px -12px rgba(128, 105, 191, 0.12), 0px 6px 16px -6px rgba(201, 167, 77, 0.10)',
    transition: transitions.fast,
  },
};

// Legacy alias — kept for backward compat
export const hoverLiftVariant: Variants = {
  initial: { y: 0, scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: {
    y: -4,
    scale: 1.005,
    boxShadow: '0px 14px 36px -12px rgba(212, 175, 55, 0.10)',
    transition: transitions.fast,
  },
};

// Button — premium tactile response
export const buttonHoverVariant: Variants = {
  rest:  { scale: 1, transition: transitions.fast },
  hover: { scale: 1.012, transition: transitions.fast },
  tap:   { scale: 0.97, transition: { duration: durations.instant, ease: luxuryEasing.press } },
};

// Image hover zoom — subtle, prevents crop distortion (max 1.04)
export const imageHoverVariant: Variants = {
  rest:  { scale: 1,    transition: { duration: 0.65, ease: luxuryEasing.elegant } },
  hover: { scale: 1.04, transition: { duration: 0.65, ease: luxuryEasing.elegant } },
};

// Gold divider line — slides in from left
export const lineRevealVariant: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: luxuryEasing.reveal, delay: 0.2 },
  },
};

// Number/stat counter shimmer
export const statVariant: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.standard,
      ease: luxuryEasing.reveal,
      delay: i * 0.1,
    },
  }),
};

// ─── Ambient Float — disabled per luxury spec (too gimmicky) ─────
// Kept as opt-in only
export const floatVariant: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: durations.float,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

// Gold shimmer accent (CSS-driven, this variant kept for JS use)
export const goldShimmerVariant: Variants = {
  initial: { opacity: 0.7 },
  animate: {
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1.5,
    },
  },
};

// ─── Page Transition ─────────────────────────────────────────────
export const pageEnterVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: luxuryEasing.standard } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: 'easeIn' } },
};

// ─── Lightbox ────────────────────────────────────────────────────
export const lightboxBackdropVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const lightboxContentVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.45, ease: luxuryEasing.elegant },
  },
  exit: {
    opacity: 0, scale: 0.95, y: 8,
    transition: { duration: 0.25, ease: luxuryEasing.cinematic },
  },
};

// ─── Nav Underline ───────────────────────────────────────────────
export const navUnderlineVariant: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: luxuryEasing.reveal } },
};

// ─── Download Button States ───────────────────────────────────────
export const downloadIdleVariant: Variants = {
  idle:    { opacity: 1, y: 0, transition: transitions.fast },
  loading: { opacity: 0, y: -8, transition: transitions.fast },
  done:    { opacity: 0, y: -8, transition: transitions.fast },
};

export const downloadLoadingVariant: Variants = {
  idle:    { opacity: 0, y: 8,  transition: transitions.fast },
  loading: { opacity: 1, y: 0,  transition: transitions.fast },
  done:    { opacity: 0, y: -8, transition: transitions.fast },
};

export const downloadDoneVariant: Variants = {
  idle:    { opacity: 0, y: 8, transition: transitions.fast },
  loading: { opacity: 0, y: 8, transition: transitions.fast },
  done:    { opacity: 1, y: 0, transition: transitions.fast },
};

// ─── Drawer / Modal ──────────────────────────────────────────────
export const drawerVariant: Variants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { duration: 0.40, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '100%', transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] } },
};

export const backdropVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};
