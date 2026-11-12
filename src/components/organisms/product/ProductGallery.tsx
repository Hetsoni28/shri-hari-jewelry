'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import FramedImage, { type Fit } from '@/components/atoms/FramedImage';

export type GalleryImage = {
  /** framed for the 4:5 display */
  src: string;
  fit: Fit;
  ratio: number;
  /** the whole photo at high resolution, for the magnifier and full-screen view */
  full: string;
  /** descriptive alt text (from Sanity, or generated from the product) */
  alt?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductGallery({ images, name, isNew }: { images: GalleryImage[]; name: string; isNew?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = images.length;
  const image = images[index];
  const go = (i: number) => setIndex(((i % total) + total) % total);

  // Full-screen viewer: lock page scroll, Esc / arrow keys, return focus on close
  useEffect(() => {
    if (!viewerOpen) return;
    const opener = openerRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewerOpen(false);
      if (e.key === 'ArrowRight' && total > 1) setIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft' && total > 1) setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [viewerOpen, total]);

  if (!image) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-[#F6F2EA] font-label text-[12px] uppercase tracking-[0.2em] text-[#6B6577]">
        Photo coming soon
      </div>
    );
  }

  // Magnifier follows the cursor — mouse / trackpad only, touch opens the viewer instead
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    // Never taller than the screen: width is capped so the 4:5 photo fits below the navbar
    <div className="mx-auto w-full max-w-[min(100%,calc((100svh-10rem)*0.8))]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative"
      >
        <button
          ref={openerRef}
          type="button"
          onClick={() => setViewerOpen(true)}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setLens(null)}
          aria-label={`View ${name} full screen`}
          className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[#F6F2EA]"
        >
          <FramedImage src={image.src} fit={image.fit} ratio={image.ratio} alt={image.alt || name} priority sizes="(min-width: 1024px) 50vw, 100vw" />

          {/* Magnifier — the whole photo at 2.4×, positioned under the cursor */}
          {lens && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[#F6F2EA] bg-no-repeat"
              style={{
                backgroundImage: `url("${image.full}")`,
                backgroundSize: '240%',
                backgroundPosition: `${lens.x}% ${lens.y}%`,
              }}
            />
          )}

          {isNew && (
            <span className="absolute left-4 top-4 z-20 bg-white/95 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8069BF]">
              New
            </span>
          )}

          <span className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/90 px-3 py-1.5 font-label text-[11px] font-semibold text-[#1C1726] opacity-90 transition-opacity duration-300 group-hover:opacity-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
            </svg>
            <span className="hidden lg:inline">Hover to zoom · click for full screen</span>
            <span className="lg:hidden">Tap to view full screen</span>
          </span>
        </button>
      </motion.div>

      {/* Thumbnails — only when a piece has more than one photo */}
      {total > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-3" aria-label="Photos">
          {images.map((img, i) => (
            <li key={img.full}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Photo ${i + 1} of ${total}`}
                aria-current={i === index ? 'true' : undefined}
                className={`relative block aspect-[4/5] w-full overflow-hidden bg-[#F6F2EA] outline-offset-2 transition-opacity ${
                  i === index ? 'outline-1 outline-[#C9A74D]' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <FramedImage src={img.src} fit={img.fit} ratio={img.ratio} alt="" sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Full-screen viewer ── */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} — full screen`}
            className="fixed inset-0 z-[200] flex flex-col bg-[#FDFCFA]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#EFE9DC] px-5 py-4 sm:px-8">
              <p className="truncate font-headline text-[17px] text-[#1C1726]">{name}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setViewerOpen(false)}
                className="flex shrink-0 items-center gap-2 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1C1726] hover:text-[#8069BF]"
              >
                Close
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1" onClick={() => setViewerOpen(false)}>
              <Image src={image.full} alt={image.alt || name} fill sizes="100vw" className="object-contain p-4 sm:p-10" />
            </div>

            {total > 1 && (
              <div className="flex items-center justify-center gap-6 border-t border-[#EFE9DC] py-4 font-label text-[13px] text-[#5F5A6B]">
                <button type="button" onClick={() => go(index - 1)} className="px-2 hover:text-[#1C1726]" aria-label="Previous photo">←</button>
                <span className="tabular-nums">{index + 1} / {total}</span>
                <button type="button" onClick={() => go(index + 1)} className="px-2 hover:text-[#1C1726]" aria-label="Next photo">→</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
