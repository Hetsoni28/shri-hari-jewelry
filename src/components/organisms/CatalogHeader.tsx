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
  metalType?: string;
}

const GENDER_TABS = [
  { label: 'ALL',     value: null       },
  { label: 'ANTIQUE', value: 'Antique'  },
  { label: 'FEMALE',  value: 'Women'    },
  { label: 'MALE',    value: 'Men'      },
  { label: 'UNISEX',  value: 'Unisex'  },
  { label: 'KIDS',    value: 'Kids'     },
];

const METAL_TABS = [
  {
    label: 'All Metals',
    value: null,
    icon: null,
    activeStyle: 'border-[var(--color-secondary)]/40 bg-[var(--color-primary)]/5 text-[var(--color-primary)]',
    dotStyle: 'bg-gradient-to-br from-[#C9A84C] to-[#9E9E9E]',
  },
  {
    label: 'Gold',
    value: 'Gold',
    icon: '🥇',
    activeStyle: 'border-[#C9A84C] bg-gradient-to-r from-[#C9A84C]/12 to-[#F0D060]/8 text-[#8B6914] shadow-[0_0_12px_-4px_rgba(201,168,76,0.4)]',
    dotStyle: 'bg-gradient-to-br from-[#F0D060] to-[#C9A84C]',
  },
  {
    label: 'Silver',
    value: 'Silver',
    icon: '🩶',
    activeStyle: 'border-[#9E9E9E] bg-gradient-to-r from-[#9E9E9E]/12 to-[#D0D0D0]/8 text-[#4a4a4a] shadow-[0_0_12px_-4px_rgba(158,158,158,0.35)]',
    dotStyle: 'bg-gradient-to-br from-[#D0D0D0] to-[#9E9E9E]',
  },
];

interface Props {
  products:      Product[];
  activeGender:  string | null;
  activeMetal:   string | null;
  onGenderChange:(value: string | null) => void;
  onMetalChange: (value: string | null) => void;
}

export default function CatalogHeader({ products, activeGender, activeMetal, onGenderChange, onMetalChange }: Props) {

  // Live counts
  const genderCounts = useMemo(() => {
    const result: Record<string, number> = { ALL: products.length };
    for (const tab of GENDER_TABS) {
      if (tab.value) {
        result[tab.value] = products.filter(p => p.subcategory === tab.value).length;
      }
    }
    return result;
  }, [products]);

  const metalCounts = useMemo(() => {
    return {
      ALL:    products.length,
      Gold:   products.filter(p => p.metalType === 'Gold').length,
      Silver: products.filter(p => p.metalType === 'Silver').length,
    };
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-8 mt-6">
      <p className="text-label text-[var(--color-secondary)] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-4">
        CATALOGUE 2026
      </p>
      <h1 className="text-headline text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6 leading-[1.15]">
        Exquisite Precious Masterpieces<br className="hidden md:block" /> Crafted For Generations.
      </h1>
      <div className="h-[1px] w-16 bg-[#C9A84C] mb-8" />

      {/* ── Gender Tabs ── */}
      <div className="flex justify-start w-full gap-x-4 sm:gap-x-8 md:justify-center border-b border-[var(--color-secondary)]/20 mb-0 overflow-x-auto scrollbar-none pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {GENDER_TABS.map((tab) => {
          const count    = tab.value === null ? genderCounts.ALL : (genderCounts[tab.value] ?? 0);
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

      {/* ── Metal Type Selector ── */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-5 mb-2 flex-wrap w-full">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 font-bold mr-1">
          Metal:
        </span>
        {METAL_TABS.map((tab) => {
          const count    = tab.value === null ? metalCounts.ALL : (metalCounts[tab.value as keyof typeof metalCounts] ?? 0);
          const isActive = activeMetal === tab.value;
          return (
            <motion.button
              key={tab.label}
              onClick={() => onMetalChange(tab.value)}
              whileHover={{ y: -1, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 rounded-sm ${
                isActive
                  ? tab.activeStyle
                  : 'border-[var(--color-secondary)]/15 text-[var(--color-secondary)]/60 hover:border-[var(--color-secondary)]/30 hover:text-[var(--color-secondary)]'
              }`}
            >
              {/* Metallic dot indicator */}
              <span className={`w-2 h-2 rounded-full shrink-0 ${tab.dotStyle}`} />
              {tab.label}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y:  0  }}
                  exit={{   opacity: 0, y:  3   }}
                  transition={{ duration: 0.2 }}
                  className="tabular-nums font-medium normal-case tracking-normal opacity-70"
                >
                  ({count})
                </motion.span>
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
