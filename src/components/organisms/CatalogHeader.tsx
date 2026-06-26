'use client';

import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: Record<string, unknown>[];
  category: string;
  subcategory?: string;
}

const TABS = [
  { label: 'ALL',             value: null      },
  { label: 'ANTIQUE',         value: 'Antique' },
  { label: 'FEMALE',          value: 'Women'   },
  { label: 'MALE',            value: 'Men'     },
  { label: 'KIDS',            value: 'Kids'    },
];

interface Props {
  products:      Product[];
  activeGender:  string | null;
  onGenderChange:(value: string | null) => void;
}

export default function CatalogHeader({ products, activeGender, onGenderChange }: Props) {

  // Live counts — computed from all products (not filtered) so numbers are always accurate
  const counts = useMemo(() => {
    const result: Record<string, number> = { ALL: products.length };
    for (const tab of TABS) {
      if (tab.value) {
        result[tab.value] = products.filter(p => p.subcategory === tab.value).length;
      }
    }
    return result;
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-10 mt-6">
      <p className="text-label text-[var(--color-secondary)] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-4">
        CATALOGUE 2026
      </p>
      <h1 className="text-headline text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6 leading-[1.15]">
        Exquisite Precious Masterpieces<br className="hidden md:block" /> Crafted For Generations.
      </h1>
      <div className="h-[1px] w-16 bg-[#C9A84C] mb-10"></div>

      {/* ── Gender Tabs with live counts ── */}
      <div className="flex justify-start w-full gap-x-4 sm:gap-x-8 md:justify-center border-b border-[var(--color-secondary)]/20 mb-6 overflow-x-auto scrollbar-none pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {TABS.map((tab) => {
          const count  = tab.value === null ? counts.ALL : (counts[tab.value] ?? 0);
          const isActive = activeGender === tab.value;
          return (
            <button
              key={tab.label}
              onClick={() => onGenderChange(tab.value)}
              className={`relative font-sans font-bold text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] pb-3 border-b-[2.5px] whitespace-nowrap transition-all duration-300 flex-shrink-0 flex items-baseline gap-1.5 ${
                isActive
                  ? 'border-[#C9A84C] text-[#C9A84C]'
                  : 'border-transparent text-[var(--color-secondary)] hover:text-[#C9A84C]'
              }`}
            >
              {tab.label}
              {/* Clean inline count */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y:  0  }}
                  exit={{   opacity: 0, y:  3   }}
                  transition={{ duration: 0.2 }}
                  className={`text-[9px] sm:text-[10px] font-medium normal-case tracking-normal tabular-nums leading-none ${
                    isActive ? 'text-[#C9A84C]/80' : 'text-[var(--color-secondary)]/70'
                  }`}
                >
                  ({count})
                </motion.span>
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
