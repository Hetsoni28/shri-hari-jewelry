'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, luxuryEasing } from '@/lib/animations';

const stats = [
  { number: '23+', label: 'Years of Excellence', delay: 0 },
  { number: '1k+', label: 'Happy Clients',        delay: 0.1 },
  { number: '150+', label: 'Exquisite Designs',   delay: 0.2 },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 sm:py-16 my-6 sm:my-8 border-y border-[var(--color-secondary)]/20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: luxuryEasing.reveal }}
          className="text-label text-[var(--color-secondary)] uppercase tracking-[0.22em] text-xs font-semibold mb-4"
        >
          Shri Hari Jewellers • Est. 2001
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: luxuryEasing.reveal, delay: 0.08 }}
          className="text-headline text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight"
        >
          The Real Brilliance of{' '}
          <br />
          <span className="italic text-[var(--color-primary)]">Purity.</span>
        </motion.h2>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: luxuryEasing.reveal, delay: 0.16 }}
          className="text-body text-neutral text-sm md:text-base mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Step into our showroom where we&apos;ve put together our collections spanning over two decades of passion
          and dedication to fine craftsmanship.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-tertiary/20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: luxuryEasing.reveal,
                    delay: stat.delay,
                  },
                },
              }}
              className="text-center"
            >
              {/* Number with a subtle scale entrance */}
              <motion.h3
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: luxuryEasing.elegant, delay: 0.3 + stat.delay }}
                className="text-headline text-2xl sm:text-4xl font-bold text-[var(--color-primary)] mb-1 sm:mb-2"
              >
                {stat.number}
              </motion.h3>
              <p className="text-label text-[var(--color-secondary)] text-[10px] sm:text-xs uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
