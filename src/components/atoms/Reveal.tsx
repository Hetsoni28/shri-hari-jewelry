'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { luxuryEasing, durations } from '@/lib/animations';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  className?: string;
  delay?: number;
  /** Distance the element travels upward during reveal (default: 24) */
  distance?: number;
  /** Duration override in seconds */
  duration?: number;
  /** Viewport margin before trigger */
  margin?: string;
  /** Direction of entrance */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export default function Reveal({
  children,
  width = '100%',
  className = '',
  delay = 0,
  distance = 24,
  duration = durations.standard,
  margin = '-40px',
  direction = 'up',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Respect prefers-reduced-motion — just fade, no translate
  const hidden = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...(direction === 'up'    && { y:  distance }),
        ...(direction === 'down'  && { y: -distance }),
        ...(direction === 'left'  && { x:  distance }),
        ...(direction === 'right' && { x: -distance }),
      };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration,
      ease: luxuryEasing.reveal,
      delay,
    },
  };

  return (
    <div style={{ width }} className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
        variants={{ hidden, visible }}
      >
        {children}
      </motion.div>
    </div>
  );
}
