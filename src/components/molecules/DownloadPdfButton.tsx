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
}

type ButtonState = 'idle' | 'loading' | 'done';

export default function DownloadPdfButton({ title, pdfTitle, subtitle, filename, products, variant = 'primary', count }: DownloadPdfButtonProps) {
  const [state, setState] = useState<ButtonState>('idle');

  const handleDownload = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      // Fetch images as Base64 via our Next.js backend proxy to completely bypass mobile network/CORS issues in react-pdf
      const fetchBase64 = async (url: string): Promise<string> => {
        try {
          const proxyUrl = `/api/pdf-image?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error('Proxy failed');
          const data = await response.json();
          return data.base64 || url;
        } catch (e) {
          console.error("Failed to fetch base64:", e);
          return url; // Fallback to raw URL if fetch fails
        }
      };

      const processedProducts = await Promise.all(products.map(async (p) => {
        let src = p.imageSrc;
        if (src.startsWith('/')) {
          src = `${origin}${src}`;
        } else if (src.startsWith('//')) {
          src = `https:${src}`;
        }
        
        let finalSrc = src;
        if (src) {
          finalSrc = await fetchBase64(src);
        }

        return { ...p, imageSrc: finalSrc };
      }));

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
      // Reset after 2.5s
      setTimeout(() => setState('idle'), 2500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setState('idle');
      alert(`Failed to generate PDF. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const baseClasses = "relative flex items-center justify-center gap-3 py-4 px-8 text-xs font-bold uppercase tracking-[0.2em] w-full sm:w-auto overflow-hidden min-h-[52px]";

  const variantClasses = {
    primary:   "bg-[var(--color-primary)] text-white",
    secondary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
    full:      "bg-[var(--color-tertiary)] text-white w-full max-w-md mx-auto text-sm py-5",
    row:       "bg-white border border-[var(--color-secondary)]/15 text-[var(--foreground)] w-full px-5 py-3.5 hover:border-[var(--color-tertiary)] hover:bg-[var(--color-background-light)] text-[10px] sm:text-xs text-left transition-all duration-300",
  };

  const isDone    = state === 'done';
  const isLoading = state === 'loading';

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
      whileHover={!isLoading ? {
        y: variant === 'row' ? -1 : -2,
        boxShadow: variant === 'full'
          ? '0 12px 32px -8px rgba(201,168,76,0.35)'
          : variant === 'row' 
            ? '0 4px 12px -4px rgba(0,0,0,0.05)'
            : '0 10px 28px -8px rgba(128,105,191,0.30)',
        transition: { duration: 0.22 },
      } : {}}
      whileTap={!isLoading ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
      animate={{
        opacity: isDone ? 1 : isLoading ? 0.85 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Gold shimmer sweep on done */}
      <AnimatePresence>
        {isDone && (
          <motion.span
            key="shimmer"
            className={`absolute inset-0 bg-gradient-to-r ${variant === 'row' ? 'from-transparent via-[var(--color-tertiary)]/10 to-transparent' : 'from-transparent via-white/20 to-transparent'}`}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: luxuryEasing.elegant }}
          />
        )}
      </AnimatePresence>

      {/* ── IDLE state ── */}
      <AnimatePresence mode="wait" initial={false}>
        {state === 'idle' && (
          <motion.span
            key="idle"
            className={`flex items-center ${variant === 'row' ? 'justify-between w-full' : 'gap-3 justify-center'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: luxuryEasing.swift }}
          >
            {variant === 'row' ? (
              <>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold tracking-[0.1em]">{title}</span>
                  {count !== undefined && (
                    <span className="text-[var(--color-secondary)]/60 font-medium tabular-nums tracking-normal text-[9px] sm:text-[10px]">({count})</span>
                  )}
                </span>
                <svg className="shrink-0 text-[var(--color-secondary)] opacity-60" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </>
            ) : (
              <>
                <svg className="shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span className="leading-snug">{title}</span>
              </>
            )}
          </motion.span>
        )}

        {/* ── LOADING state ── */}
        {state === 'loading' && (
          <motion.span
            key="loading"
            className={`flex items-center ${variant === 'row' ? 'justify-between w-full text-[var(--color-secondary)]' : 'gap-3 justify-center'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: luxuryEasing.swift }}
          >
            {variant === 'row' ? (
              <>
                <span className="font-bold tracking-[0.1em]">{title}</span>
                <svg className="shrink-0 animate-spin text-[var(--color-tertiary)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
              </>
            ) : (
              <>
                <svg className="shrink-0 animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
                <span>Preparing…</span>
              </>
            )}
          </motion.span>
        )}

        {/* ── DONE state ── */}
        {state === 'done' && (
          <motion.span
            key="done"
            className={`flex items-center ${variant === 'row' ? 'justify-between w-full text-[var(--color-tertiary)]' : 'gap-3 justify-center'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: luxuryEasing.swift }}
          >
            {variant === 'row' ? (
              <>
                <span className="font-bold tracking-[0.1em]">Downloaded!</span>
                <motion.svg
                  className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
                >
                  <motion.polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </>
            ) : (
              <>
                <motion.svg
                  className="shrink-0"
                  width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: luxuryEasing.reveal }}
                >
                  <motion.polyline
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: luxuryEasing.reveal, delay: 0.05 }}
                  />
                </motion.svg>
                <span>Downloaded!</span>
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
