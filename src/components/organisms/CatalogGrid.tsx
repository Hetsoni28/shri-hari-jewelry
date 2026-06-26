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
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: Math.min(i * 0.04, 0.4) },
  }),
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.18 } },
};

/* ── Reusable smart image card that handles any resolution / aspect ratio ── */
function ProductImage({ src, alt }: { src: string; alt: string }) {
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

      {/* Actual image — object-contain so NOTHING is ever cropped */}
      <motion.div
        className="absolute inset-0 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded && !error ? 1 : 0 }}
        transition={{ duration: 0.5, ease: luxuryEasing.elegant }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1535px) 20vw, 16vw"
          className="object-contain"     /* ← never crops, always shows full subject */
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          quality={85}                   /* ← Sanity + Next.js will serve optimized size */
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
              ? urlForImage(product.images[0])?.width(600).quality(85).url() || '/images/placeholder.png'
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
              <Link href={`/catalog/${product.slug}`} className="group flex flex-col cursor-pointer">

                {/* ── Image ── */}
                <div className="relative aspect-[4/5] bg-[#f8f4ee] mb-3 sm:mb-4 overflow-hidden border border-[var(--color-secondary)]/10 group-hover:border-[#C9A84C]/35 transition-colors duration-500">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.70, ease: luxuryEasing.elegant }}
                  >
                    <ProductImage src={imgSrc} alt={product.name} />
                  </motion.div>

                  {/* Hover overlay darkener */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none z-20" />

                  {/* Subcategory badge */}
                  {product.subcategory && (
                    <span className="absolute top-2 left-2 text-[7px] sm:text-[8px] uppercase tracking-[0.15em] font-bold bg-black/55 backdrop-blur-sm text-white px-1.5 py-0.5 z-30">
                      {product.subcategory}
                    </span>
                  )}

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
                <div className="flex flex-col flex-grow">
                  <p className="text-label text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--color-secondary)] mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-body text-xs sm:text-sm md:text-base font-semibold text-[var(--foreground)] mb-2 sm:mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
