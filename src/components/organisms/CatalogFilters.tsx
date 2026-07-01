"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { label: 'All Jewelry Types', value: 'all'         },
  { label: 'Necklaces',         value: 'Necklaces'   },
  { label: 'Earrings',          value: 'Earrings'    },
  { label: 'Rings',             value: 'Rings'       },
  { label: 'Bangles',           value: 'Bangles'     },
  { label: 'Bracelets',         value: 'Bracelets'   },
  { label: 'Bracelet',          value: 'Bracelet'    },
  { label: 'Diamond',           value: 'Diamond'     },
  { label: 'Pendants',          value: 'Pendants'    },
  { label: 'Mala',              value: 'Mala'        },
  { label: 'Kanchain',          value: 'Kanchain'    },
  { label: 'Bali',              value: 'Bali'        },
  { label: 'Mangalsutra',       value: 'Mangalsutra' },
  { label: 'Rudrakash',         value: 'Rudrakash'   },
  { label: 'Lucky',             value: 'Lucky'       },
  { label: 'Nazriya',           value: 'Nazriya'     },
];

interface Props {
  activeCategory:      string;
  onCategoryChange:    (value: string) => void;
  availableCategories: Set<string>;
}

export default function CatalogFilters({ activeCategory, onCategoryChange, availableCategories }: Props) {
  const [open, setOpen]       = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef            = useRef<HTMLDivElement>(null);

  // Detect mobile (< 640px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll only on mobile when sheet is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, isMobile]);

  // Close when clicking outside on desktop
  useEffect(() => {
    if (!open || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, isMobile]);

  const filteredCategories = CATEGORIES.filter(
    (c) => c.value === 'all' || availableCategories.has(c.value.toLowerCase())
  );

  const activeLabel =
    filteredCategories.find((c) => c.value === activeCategory)?.label ?? 'All Jewelry Types';

  const handleSelect = (value: string) => {
    onCategoryChange(value);
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* ── Wrapper with relative for desktop dropdown ── */}
      <div ref={wrapperRef} className="relative w-full sm:w-auto">

        {/* ── Trigger button ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 border border-[var(--color-secondary)]/30 hover:border-[#C9A84C] text-xs uppercase px-4 py-3 text-[var(--foreground)] bg-white w-full sm:w-auto sm:min-w-[220px] focus:outline-none focus:border-[#C9A84C] cursor-pointer tracking-[0.08em] transition-colors duration-200 text-left"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] shrink-0" />
          <span className="flex-1 font-semibold">{activeLabel}</span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-[var(--color-secondary)] shrink-0"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </button>

        {/* ══ DESKTOP: dropdown panel (absolute, below button) ══ */}
        <AnimatePresence>
          {open && !isMobile && (
            <motion.div
              key="desktop-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[220px] overflow-hidden"
              style={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
              {filteredCategories.map((c) => {
                const isActive = activeCategory === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => handleSelect(c.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wide border-b border-gray-50 transition-colors duration-150
                      ${isActive
                        ? 'bg-[#FBF7EE] text-[#C9A84C]'
                        : 'text-[var(--foreground)] hover:bg-gray-50'
                      }`}
                  >
                    <span>{c.label}</span>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isActive ? 'border-[#C9A84C]' : 'border-gray-300'}`}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══ MOBILE: dark backdrop ══ */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* ══ MOBILE: bottom sheet ══ */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            key="mobile-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl"
            style={{ maxHeight: '80vh' }}
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-0.5">Filter by</p>
                <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">Jewelry Type</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                aria-label="Close filter"
              >
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Category list */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
              {filteredCategories.map((c) => {
                const isActive = activeCategory === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => handleSelect(c.value)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium uppercase tracking-wide border-b border-gray-50 transition-colors duration-150
                      ${isActive
                        ? 'bg-[#FBF7EE] text-[#C9A84C]'
                        : 'text-[var(--foreground)] hover:bg-gray-50 active:bg-gray-100'
                      }`}
                  >
                    <span>{c.label}</span>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isActive ? 'border-[#C9A84C]' : 'border-gray-300'}`}
                    >
                      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />}
                    </span>
                  </button>
                );
              })}

              {/* Cancel button at bottom */}
              <div className="p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-secondary)] border border-[var(--color-secondary)]/30 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
