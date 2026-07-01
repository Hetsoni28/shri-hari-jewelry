'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogGrid, { Product } from '@/components/organisms/CatalogGrid';

interface RelatedProductsProps {
  currentProductId: string;
  currentCategory?: string;
  currentSubcategory?: string;
  allProducts: Product[];
}

type FilterTab = 'category' | 'subcategory' | 'all';

export default function RelatedProducts({
  currentProductId,
  currentCategory,
  currentSubcategory,
  allProducts,
}: RelatedProductsProps) {

  // ── Smart filtering logic ──
  const sameCategory = allProducts.filter(
    (p) => p._id !== currentProductId && p.category?.toLowerCase() === currentCategory?.toLowerCase()
  );

  const sameSubcategory = allProducts.filter(
    (p) =>
      p._id !== currentProductId &&
      p.subcategory?.toLowerCase() === currentSubcategory?.toLowerCase() &&
      p.category?.toLowerCase() === currentCategory?.toLowerCase()
  );

  // Default active tab: subcategory if has enough, else category
  const defaultTab: FilterTab =
    sameSubcategory.length >= 2 ? 'subcategory' : sameCategory.length >= 2 ? 'category' : 'all';

  const [activeTab, setActiveTab] = useState<FilterTab>(defaultTab);

  const getProducts = () => {
    switch (activeTab) {
      case 'subcategory': return sameSubcategory.slice(0, 8);
      case 'category':   return sameCategory.slice(0, 8);
      default:           return allProducts.filter((p) => p._id !== currentProductId).slice(0, 8);
    }
  };

  const displayed = getProducts();
  if (displayed.length === 0) return null;

  // Label helpers
  const categoryLabel    = currentCategory   || 'Similar';
  const subcategoryLabel = currentSubcategory || 'Collection';

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    ...(sameSubcategory.length > 0
      ? [{ key: 'subcategory' as FilterTab, label: `${subcategoryLabel} ${categoryLabel}`, count: sameSubcategory.length }]
      : []),
    ...(sameCategory.length > 0
      ? [{ key: 'category' as FilterTab, label: `All ${categoryLabel}`, count: sameCategory.length }]
      : []),
    { key: 'all' as FilterTab, label: 'More Pieces', count: allProducts.length - 1 },
  ];

  // Catalog page link with filter
  const viewAllHref = activeTab === 'subcategory' || activeTab === 'category'
    ? `/catalog?category=${encodeURIComponent(currentCategory || '')}`
    : '/catalog';

  return (
    <section className="bg-[#FAFAF8] border-t border-[#C9A84C]/15 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mb-3">
            EXPLORE MORE
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-5">
            You May Also Like
          </h2>
          {/* Gold divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
          </div>

          {/* ── Filter Tabs ── */}
          {tabs.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className={`relative px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-[#C9A84C] border-[#C9A84C] text-white shadow-md'
                      : 'bg-white border-[#C9A84C]/30 text-[var(--color-secondary)] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 text-[9px] tabular-nums ${activeTab === tab.key ? 'text-white/70' : 'text-[var(--color-secondary)]/50'}`}>
                    ({Math.min(tab.count, 8)})
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CatalogGrid products={displayed} />
          </motion.div>
        </AnimatePresence>

        {/* ── View All Button ── */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link href={viewAllHref}>
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 8px 28px -8px rgba(201,168,76,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <span>
                View All {activeTab === 'all' ? 'Jewelry' : categoryLabel}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
}
