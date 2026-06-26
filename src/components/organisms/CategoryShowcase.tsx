'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, imageHoverVariant, cardHoverVariant, luxuryEasing, durations } from '@/lib/animations';

const categories = [
  {
    title: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&q=80&w=600',
    link: '/catalog?category=Necklaces',
  },
  {
    title: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=600',
    link: '/catalog?category=Rings',
  },
  {
    title: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    link: '/catalog?category=Earrings',
  },
  {
    title: 'Bangles',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    link: '/catalog?category=Bangles',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-8 sm:mb-14"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              className="h-px bg-[var(--color-tertiary)] origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: luxuryEasing.reveal, delay: 0.1 }}
              style={{ width: 28 }}
            />
            <span className="text-[9px] uppercase tracking-[0.28em] font-bold text-[var(--color-tertiary)] font-label">
              Our Specialties
            </span>
            <motion.div
              className="h-px bg-[var(--color-tertiary)] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: luxuryEasing.reveal, delay: 0.1 }}
              style={{ width: 28 }}
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-headline text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-3 sm:mb-4"
          >
            Shop by Category
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            className="text-body text-[var(--color-neutral)] max-w-2xl mx-auto text-sm sm:text-base"
          >
            Discover our meticulously categorized collections, designed to help you find the perfect piece for any occasion.
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUpVariant}
              custom={index}
            >
              <Link
                href={category.link}
                className="group relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[400px] w-full overflow-hidden bg-gray-100 flex items-center justify-center border border-[var(--color-secondary)]/20 hover:border-[var(--color-tertiary)]/50 transition-colors duration-500 block"
              >
                {/* Image with zoom */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: luxuryEasing.elegant }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-500" />

                {/* Gold bottom gradient — expands on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-tertiary)]/30 to-transparent"
                  initial={{ height: '35%', opacity: 0 }}
                  whileHover={{ height: '55%', opacity: 1 }}
                  transition={{ duration: 0.5, ease: luxuryEasing.standard }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 w-full h-full">
                  <h3 className="text-white font-bold text-xl sm:text-2xl tracking-wider uppercase mb-3">
                    {category.title}
                  </h3>

                  {/* Gold divider — slides in on hover */}
                  <motion.div
                    className="h-[1.5px] bg-[var(--color-tertiary)]"
                    initial={{ width: 0 }}
                    whileHover={{ width: 40 }}
                    transition={{ duration: 0.4, ease: luxuryEasing.reveal }}
                  />

                  <motion.span
                    className="text-white/90 text-xs tracking-[0.2em] uppercase mt-3 font-label font-bold"
                    initial={{ opacity: 0, y: 8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: luxuryEasing.standard }}
                  >
                    Explore
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
