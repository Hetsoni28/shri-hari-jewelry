'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, luxuryEasing } from '@/lib/animations';

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 14v10c0 10.5 7.6 20.3 18 22.6C34.4 44.3 42 34.5 42 24V14L24 4z" />
        <polyline points="17 24 22 29 31 20" />
      </svg>
    ),
    title: 'BIS Hallmarked Gold',
    desc: 'Every piece is certified by Bureau of Indian Standards — guaranteed purity you can trust.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" />
        <path d="M34 6l2 2-2 2M14 6l-2 2 2 2" />
      </svg>
    ),
    title: 'Master Craftsmen',
    desc: 'Our artisans carry forward generations of skill, handcrafting each ornament with extraordinary precision.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="36" height="30" rx="3" />
        <path d="M16 10V6M32 10V6M6 20h36" />
        <path d="M16 30h4M28 30h4M16 36h4M28 36h4" />
      </svg>
    ),
    title: 'Est. Since 2001',
    desc: 'Over two decades of trust, craftsmanship, and building lasting relationships with families across Gujarat.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l4.5 9 10 1.5-7.2 7 1.7 10L24 29l-9 4.7 1.7-10L9.5 16.5l10-1.5L24 6z" />
        <circle cx="24" cy="24" r="4" fill="#C9A84C" fillOpacity="0.2" />
      </svg>
    ),
    title: 'Custom-Made Jewellery',
    desc: 'Bring your dream design to life — our bespoke service makes your vision a precious reality.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24l8 8L24 14l10 12 8-6" />
        <circle cx="6" cy="24" r="2" fill="#C9A84C" />
        <circle cx="42" cy="30" r="2" fill="#C9A84C" />
      </svg>
    ),
    title: 'Live Market Pricing',
    desc: 'Prices reflect today\'s live gold & silver market rates — transparent, fair, and always up to date.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 12H8l4 18h24l4-18z" />
        <path d="M17 12L20 6h8l3 6" />
        <circle cx="18" cy="36" r="3" />
        <circle cx="30" cy="36" r="3" />
      </svg>
    ),
    title: 'Thousands Sold',
    desc: 'Trusted by families across Mogar, Anand and beyond — for weddings, festivals, and everyday elegance.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 bg-[var(--color-background-light)] relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8069BF 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-14 sm:mb-18"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUpVariant}
            className="inline-flex items-center gap-3 mb-5"
          >
            <motion.div
              className="h-px bg-[#C9A84C] origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEasing.reveal, delay: 0.2 }}
              style={{ width: 32 }}
            />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-tertiary)] font-bold font-label">Our Promise</span>
            <motion.div
              className="h-px bg-[#C9A84C] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEasing.reveal, delay: 0.2 }}
              style={{ width: 32 }}
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[var(--color-primary)] mb-4 tracking-tight"
          >
            Why Shri Hari Jewellers?
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-sm sm:text-base text-[var(--color-neutral)] max-w-xl mx-auto leading-relaxed font-body"
          >
            More than a jewellery store — a legacy of trust, craftsmanship, and timeless beauty passed through generations.
          </motion.p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={fadeUpVariant}
              custom={i}
            >
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 48px -12px rgba(128,105,191,0.15)', transition: { duration: 0.25 } }}
                className="group bg-white border border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/35 p-7 sm:p-8 flex flex-col gap-4 h-full transition-colors duration-300 cursor-default"
              >
                {/* Icon container */}
                <div className="w-16 h-16 bg-[var(--color-tertiary)]/10 flex items-center justify-center group-hover:bg-[var(--color-tertiary)]/20 transition-colors duration-300">
                  {pillar.icon}
                </div>

                {/* Gold accent line */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#C9A84C]/20 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: luxuryEasing.reveal, delay: 0.1 + i * 0.06 }}
                  style={{ width: 36 }}
                />

                <h3 className="text-lg sm:text-xl font-headline font-bold text-[var(--foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-300 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[var(--color-neutral)] leading-relaxed flex-grow font-body">
                  {pillar.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
