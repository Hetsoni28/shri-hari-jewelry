"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pdf } from '@react-pdf/renderer';
import CatalogDocument from '../pdf/CatalogDocument';
import { luxuryEasing } from '@/lib/animations';

export interface CatalogProduct {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  imageSrc: string;
}

interface DownloadPdfButtonProps {
  title: string;
  pdfTitle?: string;
  subtitle: string;
  filename: string;
  products: CatalogProduct[];
  variant?: 'primary' | 'secondary' | 'full' | 'row';
  count?: number;
  previewImage?: string; // First product thumbnail shown on the button
}

type ButtonState = 'idle' | 'loading' | 'done';

export default function DownloadPdfButton({
  title, pdfTitle, subtitle, filename, products,
  variant = 'primary', count, previewImage,
}: DownloadPdfButtonProps) {
  const [state, setState] = useState<ButtonState>('idle');
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleDownload = async () => {
    if (state !== 'idle') return;
    setState('loading');
    setProgress({ done: 0, total: products.length });

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';

      const fetchBase64 = async (url: string): Promise<string> => {
        try {
          const proxyUrl = `/api/pdf-image?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error('Proxy failed');
          const data = await response.json();
          return data.base64 || url;
        } catch (e) {
          console.error("Failed to fetch base64:", e);
          return url;
        }
      };

      // ── Batched fetching: 6 at a time with 80ms gap between batches ──────
      // Prevents rate-limiting that causes 9-10s timeouts with Promise.all
      const BATCH_SIZE = 6;
      const processedProducts: CatalogProduct[] = [];
      let doneCount = 0;

      for (let i = 0; i < products.length; i += BATCH_SIZE) {
        const batch = products.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map(async (p) => {
          let src = p.imageSrc;
          if (src.startsWith('/')) src = `${origin}${src}`;
          else if (src.startsWith('//')) src = `https:${src}`;
          const finalSrc = src ? await fetchBase64(src) : src;
          doneCount++;
          setProgress({ done: doneCount, total: products.length });
          return { ...p, imageSrc: finalSrc };
        }));
        processedProducts.push(...batchResults);
        // Brief pause between batches to avoid Sanity CDN rate limiting
        if (i + BATCH_SIZE < products.length) {
          await new Promise((r) => setTimeout(r, 80));
        }
      }

      const finalPdfTitle = pdfTitle || title;
      const blob = await pdf(
        <CatalogDocument title={finalPdfTitle} subtitle={subtitle} products={processedProducts} />
      ).toBlob();

      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setState('done');
      setTimeout(() => setState('idle'), 2500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setState('idle');
      alert(`Failed to generate PDF. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const isDone    = state === 'done';
  const isLoading = state === 'loading';

  // ─── Download icon SVG ───────────────────────────────────────────────────
  const DownloadIcon = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const SpinIcon = ({ size = 14 }: { size?: number }) => (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
    </svg>
  );

  // ─── FULL variant (Master Inventory button) ──────────────────────────────
  if (variant === 'full') {
    return (
      <div className="flex flex-col items-center gap-3">
        {count !== undefined && (
          <p className="text-xs text-[var(--color-secondary)] tracking-widest uppercase">
            {count} products in catalog
          </p>
        )}
        <motion.button
          onClick={handleDownload}
          disabled={isLoading}
          className="relative flex items-center justify-center gap-3 py-5 px-10 text-sm font-bold uppercase tracking-[0.2em] w-full max-w-md mx-auto bg-[var(--color-tertiary)] text-white overflow-hidden"
          whileHover={!isLoading ? { y: -2, boxShadow: '0 12px 32px -8px rgba(201,168,76,0.35)', transition: { duration: 0.22 } } : {}}
          whileTap={!isLoading ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isLoading && !isDone && (
              <motion.span key="idle" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}>
                <DownloadIcon size={17} />
                <span>{title}</span>
              </motion.span>
            )}
            {isLoading && (
              <motion.span key="loading" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}>
                <SpinIcon size={17} />
                <span>Preparing…</span>
              </motion.span>
            )}
            {isDone && (
              <motion.span key="done" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}>
                <span>Downloaded!</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  }

  // ─── ROW variant (category / subcategory buttons) ────────────────────────
  return (
    <motion.button
      onClick={handleDownload}
      disabled={isLoading}
      className="relative flex items-center gap-0 w-full bg-white border border-[var(--color-secondary)]/15 hover:border-[var(--color-tertiary)] hover:bg-[var(--color-background-light)] transition-all duration-300 overflow-hidden group"
      whileHover={!isLoading ? { y: -1, boxShadow: '0 4px 14px -4px rgba(0,0,0,0.07)', transition: { duration: 0.22 } } : {}}
      whileTap={!isLoading ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
    >
      {/* ── Thumbnail from Sanity ── */}
      <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-[var(--color-background-light)] overflow-hidden">
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewImage}
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" className="text-[var(--color-secondary)]/30">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
      </div>

      {/* ── Text content ── */}
      <div className="flex-1 flex flex-col justify-center px-3 sm:px-4 py-2 min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          {!isLoading && !isDone && (
            <motion.div key="idle"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[var(--foreground)] leading-tight truncate">
                {title}
              </p>
              {count !== undefined && (
                <p className="text-[9px] text-[var(--color-tertiary)] font-semibold mt-0.5 tracking-wide">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              )}
            </motion.div>
          )}
          {isLoading && (
            <motion.div key="loading"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                {title}
              </p>
              <p className="text-[9px] text-[var(--color-tertiary)] mt-0.5 font-semibold">
                {progress.total > 0
                  ? `Fetching ${Math.min(progress.done, progress.total)}/${progress.total}…`
                  : 'Starting…'}
              </p>
              {/* Mini progress bar */}
              {progress.total > 0 && (
                <div className="mt-1 h-0.5 w-full bg-[var(--color-secondary)]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--color-tertiary)] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.round((progress.done / progress.total) * 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          )}
          {isDone && (
            <motion.div key="done"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-tertiary)]">
                Downloaded!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right action icon ── */}
      <div className="shrink-0 px-3 sm:px-4 text-[var(--color-secondary)]/40 group-hover:text-[var(--color-tertiary)] transition-colors duration-200">
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SpinIcon size={14} />
            </motion.span>
          ) : isDone ? (
            <motion.svg key="check" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-[var(--color-tertiary)]"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: luxuryEasing.reveal }}>
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          ) : (
            <motion.span key="dl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DownloadIcon size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Shimmer on done */}
      <AnimatePresence>
        {isDone && (
          <motion.span
            key="shimmer"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-tertiary)]/8 to-transparent pointer-events-none"
            initial={{ x: '-100%' }} animate={{ x: '200%' }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: luxuryEasing.elegant }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
