'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardHoverVariant, imageHoverVariant, luxuryEasing } from '@/lib/animations';
import Badge from '../atoms/Badge';

interface ProductCardProps {
  id: string | number;
  title: string;
  category: string;
  imageSrc: string;
  isNewArrival?: boolean;
}

export default function ProductCard({ id, title, category, imageSrc, isNewArrival }: ProductCardProps) {
  return (
    <motion.div
      variants={cardHoverVariant}
      initial="rest"
      whileHover="hover"
      className="block h-full"
    >
      <Link href={`/catalog/${encodeURIComponent(id)}`} className="group block h-full w-full">

        {/* ── Image ── */}
        <div className="relative aspect-[4/5] bg-[#FBF8F3] mb-3 sm:mb-4 overflow-hidden border border-[var(--color-secondary)]/15 group-hover:border-[var(--color-tertiary)]/40 transition-colors duration-500">
          {isNewArrival && (
            <div className="absolute top-3 left-3 z-20">
              <Badge variant="primary">New Arrival</Badge>
            </div>
          )}

          <motion.div
            variants={imageHoverVariant}
            initial="rest"
            whileHover="hover"
            className="relative w-full h-full"
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain z-0"
            />
          </motion.div>

          {/* Soft shimmer overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none" />
        </div>

        {/* ── Text ── */}
        <div className="text-center px-2">
          <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[var(--color-tertiary)] mb-1 font-label">
            {category}
          </div>
          <h3 className="text-base sm:text-lg font-headline font-bold text-[var(--color-primary)] group-hover:text-[var(--color-tertiary)] transition-colors duration-400 line-clamp-1">
            {title}
          </h3>

          {/* Animated underline */}
          <div className="h-px bg-transparent overflow-hidden mt-1.5 mx-auto w-8">
            <motion.div
              className="h-px bg-[var(--color-tertiary)] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: luxuryEasing.reveal }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
