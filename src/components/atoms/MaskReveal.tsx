'use client';

import { motion, useReducedMotion } from 'framer-motion';

// One-time upward "unveil" for images as they scroll into view.
// The element keeps its layout; only a clip-path animates, so nothing shifts.
//
// Visibility is watched on an unclipped outer wrapper: the browser measures an
// element *after* its own clip-path, so a fully-clipped element has no visible area
// and would never be seen as "in view".
const variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  shown: { clipPath: 'inset(0% 0% 0% 0%)' },
};

export default function MaskReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>
      <motion.div
        className={className}
        variants={variants}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
