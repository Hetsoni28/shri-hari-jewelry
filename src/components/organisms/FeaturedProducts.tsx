'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlForImage } from '@/sanity/image';
import { staggerContainer, fadeUpVariant, imageHoverVariant, cardHoverVariant, luxuryEasing } from '@/lib/animations';

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: Record<string, unknown>[];
  category: string;
}

export default function FeaturedProducts({ products = [] }: { products?: Product[] }) {
  const displayProducts = products.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14"
        >
          <div>
            <motion.h2
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[var(--color-primary)] mb-3"
            >
              Featured Pieces
            </motion.h2>

            <motion.p variants={fadeUpVariant} className="text-[var(--color-neutral)] max-w-md text-sm sm:text-base">
              Discover our most sought-after designs, meticulously crafted for modern retail collections.
            </motion.p>
          </div>

          <motion.div variants={fadeUpVariant} className="mt-5 md:mt-0">
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              View All Products
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Product Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={product._id}
              variants={fadeUpVariant}
              custom={index}
            >
              <motion.div
                variants={cardHoverVariant}
                initial="rest"
                whileHover="hover"
                className="group cursor-pointer block"
              >
                <Link href={`/catalog/${encodeURIComponent(product.slug)}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#FBF8F3] mb-5 border border-[var(--color-secondary)]/10 group-hover:border-[var(--color-tertiary)]/30 transition-colors duration-500">
                    <motion.div
                      variants={imageHoverVariant}
                      initial="rest"
                      whileHover="hover"
                      className="relative w-full h-full"
                    >
                      <Image
                        src={product.images && product.images.length > 0
                          ? urlForImage(product.images[0])?.url() || '/images/placeholder.png'
                          : '/images/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                    </motion.div>

                    {/* Gold shimmer overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Text */}
                  <div className="text-center px-2">
                    <motion.div
                      className="text-[9px] uppercase tracking-[0.2em] font-bold text-[var(--color-tertiary)] mb-1.5"
                    >
                      {product.category}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-headline font-bold text-[var(--color-primary)] group-hover:text-[var(--color-tertiary)] transition-colors duration-400">
                      {product.name}
                    </h3>

                    {/* Animated underline on hover */}
                    <div className="overflow-hidden h-px mt-2">
                      <motion.div
                        className="h-px bg-[var(--color-tertiary)] origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: luxuryEasing.reveal }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
