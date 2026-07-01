'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { urlForImage } from '@/sanity/image';
import { luxuryEasing } from '@/lib/animations';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  images: Record<string, unknown>[];
  category: string;
  subcategory?: string;
  metalType?: string;
  isNewArrival?: boolean;
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    // Faster stagger (0.03s vs 0.04s), capped at 200ms so last card
    // doesn't feel sluggish. Duration trimmed to 0.35s for snappiness.
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: Math.min(i * 0.03, 0.2) },
  }),
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/* ── Reusable smart image card that handles any resolution / aspect ratio ── */
function ProductImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Shimmer skeleton — visible until image loads */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            key="shimmer"
            className="absolute inset-0 z-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated shimmer bars */}
            <div className="w-full h-full bg-gradient-to-br from-[#f5f0e8] via-[#ede6d4] to-[#f5f0e8] relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full"
                animate={{ translateX: ['−100%', '200%'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
              />
              {/* Gold hairline pulse at bottom */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state — graceful fallback */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f5f0e8] gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5">
            <rect x="3" y="3" width="18" height="18" rx="1"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="text-[8px] uppercase tracking-widest text-[#C9A84C]/60 font-label">No Image</span>
        </div>
      )}

      {/* Actual image — object-cover fills card completely, centered on jewelry */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded && !error ? 1 : 0 }}
        transition={{ duration: 0.5, ease: luxuryEasing.elegant }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1535px) 20vw, 16vw"
          className="object-contain"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          quality={90}
        />
      </motion.div>
    </div>
  );
}

export default function CatalogGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-[var(--color-secondary)] text-sm uppercase tracking-[0.2em] font-label">
          No products found in this category
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, index) => {
          const imgSrc =
            product.images && product.images.length > 0
              ? urlForImage(product.images[0])?.width(800).quality(95).url() || '/images/placeholder.png'
              : '/images/placeholder.png';

          return (
            <motion.div
              key={product._id}
              layout
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
            >
              <Link href={`/catalog/${encodeURIComponent(product.slug)}`} className="group flex flex-col cursor-pointer">

                {/* ── Image ── */}
                <div className="relative aspect-[4/5] bg-[#FBF8F3] mb-3 sm:mb-4 overflow-hidden border border-[var(--color-secondary)]/10 group-hover:border-[#C9A84C]/35 transition-colors duration-500">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.45, ease: luxuryEasing.elegant }}
                  >
                    {/* priority=true for first 6 cards (above the fold) */}
                    <ProductImage src={imgSrc} alt={product.name} priority={index < 6} />
                  </motion.div>

                  {/* Hover overlay darkener */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none z-20" />



                  {/* Centered Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 translate-y-3 group-hover:translate-y-0 pointer-events-none">
                    <div className="group/overlay relative overflow-hidden border border-[#C9A84C] px-5 py-2.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] bg-black/65 backdrop-blur-sm shadow-xl cursor-pointer pointer-events-auto">
                      {/* Gold sliding fill */}
                      <div className="absolute inset-0 bg-[#C9A84C] origin-left scale-x-0 group-hover/overlay:scale-x-100 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 text-[#C9A84C] group-hover/overlay:text-white transition-colors duration-200">
                        View Full Details &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Info ── */}
                <div className="flex flex-col flex-grow pt-1">

                  {/* Row 1: category + subcategory badge — single line, no wrap */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <p className="text-label text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--color-secondary)] truncate min-w-0">
                      {product.category}
                    </p>
                    {product.subcategory && (
                      <span className="shrink-0 text-[7px] sm:text-[8px] uppercase tracking-[0.1em] font-bold px-1.5 py-0.5 rounded-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/15">
                        {product.subcategory}
                      </span>
                    )}
                  </div>

                  {/* Row 2: product name — min 2-line height so all cards align */}
                  <h3 className="text-body text-xs sm:text-sm md:text-base font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300 min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Row 3: metal badge — always flush to bottom */}
                  {product.metalType && (
                    <span className={`mt-2 inline-flex items-center gap-1 w-fit text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm border ${
                      product.metalType === 'Gold'
                        ? 'bg-gradient-to-r from-[#FDF6E3] to-[#FBF0C0] text-[#8B6914] border-[#C9A84C]/30'
                        : 'bg-gradient-to-r from-[#F5F5F5] to-[#E8E8E8] text-[#5a5a5a] border-[#9E9E9E]/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        product.metalType === 'Gold'
                          ? 'bg-gradient-to-br from-[#F0D060] to-[#C9A84C]'
                          : 'bg-gradient-to-br from-[#D0D0D0] to-[#9E9E9E]'
                      }`} />
                      {product.metalType}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
