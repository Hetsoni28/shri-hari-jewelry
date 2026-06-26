'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlForImage } from '@/sanity/image';
import {
  scaleRevealVariant, staggerContainer, fadeUpVariant,
  lightboxBackdropVariant, lightboxContentVariant, luxuryEasing,
} from '@/lib/animations';

// How many thumbnails to render in the visible strip at once
const THUMB_WINDOW = 20;

/* ── Smart image with shimmer loading + error fallback ── */
function SmartImage({
  src,
  alt,
  fill,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Shimmer skeleton */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            key="shimmer"
            className="absolute inset-0 z-10 bg-gradient-to-br from-[#f5f0e8] via-[#ede6d4] to-[#f5f0e8] overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]/25"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f5f0e8] gap-1.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.45">
            <rect x="3" y="3" width="18" height="18" rx="1"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="text-[7px] uppercase tracking-widest text-[#C9A84C]/55 font-label">No Image</span>
        </div>
      )}

      {/* Actual image — object-contain so NOTHING is ever cropped */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded && !error ? 1 : 0 }}
        transition={{ duration: 0.45, ease: luxuryEasing.elegant }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={className}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          quality={85}
        />
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════ */
export default function ProductGallery({
  images,
  name,
  tag,
  tagColor,
}: {
  images: Record<string, unknown>[];
  name: string;
  tag?: string;
  tagColor?: string;
}) {
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [lightboxOpen,  setLightboxOpen]  = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Virtualized thumbnail window: only renders THUMB_WINDOW thumbnails at once
  const [thumbOffset, setThumbOffset] = useState(0);

  const thumbStripRef = useRef<HTMLDivElement>(null);

  const displayImages = images && images.length > 0 ? images : null;
  const totalImages   = displayImages?.length ?? 0;
  const isLarge       = totalImages > THUMB_WINDOW; // 500 images → true

  // Compute which thumbnails to render
  const visibleThumbs = useMemo(() => {
    if (!displayImages) return [];
    const start = thumbOffset;
    const end   = Math.min(thumbOffset + THUMB_WINDOW, totalImages);
    return displayImages.slice(start, end).map((img, i) => ({
      img,
      realIndex: start + i,
    }));
  }, [displayImages, thumbOffset, totalImages]);

  // When activeIndex changes, slide the thumb window so active thumb stays visible
  // When activeIndex changes, slide the thumb window so active thumb stays visible
  useEffect(() => {
    if (!isLarge) return;
    setThumbOffset((prev) => {
      if (activeIndex < prev) {
        return Math.max(0, activeIndex);
      } else if (activeIndex >= prev + THUMB_WINDOW) {
        return Math.min(activeIndex - THUMB_WINDOW + 1, totalImages - THUMB_WINDOW);
      }
      return prev;
    });
  }, [activeIndex, isLarge, totalImages]);

  const handleSelect = (index: number) => setActiveIndex(index);

  // Lightbox helpers
  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = useCallback(() => {
    if (!displayImages) return;
    setLightboxIndex(i => (i - 1 + displayImages.length) % displayImages.length);
  }, [displayImages]);

  const lightboxNext = useCallback(() => {
    if (!displayImages) return;
    setLightboxIndex(i => (i + 1) % displayImages.length);
  }, [displayImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-3 sm:space-y-4"
      >
        {/* ── Main Image ── */}
        <motion.div
          variants={scaleRevealVariant}
          className="relative aspect-square w-full bg-[#f8f4ee] border border-[#C9A84C]/20 overflow-hidden shadow-[0_4px_32px_-8px_rgba(201,168,76,0.15)] cursor-zoom-in group"
          onClick={() => openLightbox(activeIndex)}
        >
          {/* Badge */}
          {tag && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: luxuryEasing.reveal }}
              className={`absolute top-4 right-4 z-20 text-[9px] font-label uppercase tracking-widest px-3 py-1 font-bold ${tagColor || 'bg-[#E5C158] text-black'}`}
            >
              {tag}
            </motion.div>
          )}

          {/* Expand icon hint */}
          <motion.div
            className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-sm text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            title="Click to enlarge"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </motion.div>

          {/* Image counter badge (shown when many images) */}
          {totalImages > 1 && (
            <div className="absolute bottom-3 right-3 z-20 bg-black/50 backdrop-blur-sm text-white text-[9px] font-label px-2 py-1 tracking-wider">
              {activeIndex + 1} / {totalImages}
            </div>
          )}

          {/* Cross-fade main image */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.40, ease: luxuryEasing.elegant }}
              className="absolute inset-0 p-3"
            >
              <SmartImage
                src={displayImages
                  ? urlForImage(displayImages[activeIndex])?.width(900).quality(85).url() || '/images/placeholder.png'
                  : '/images/placeholder.png'}
                alt={name}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain"  /* ← NEVER crops */
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Thumbnails (Virtualized) ── */}
        {displayImages && totalImages > 1 && (
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-2">

            {/* Prev/Next strip controls for large galleries */}
            {isLarge && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setThumbOffset(o => Math.max(0, o - THUMB_WINDOW))}
                  disabled={thumbOffset === 0}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]/70 hover:text-[#C9A84C] hover:border-[#C9A84C] disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <span className="text-[9px] font-label uppercase tracking-widest text-[var(--color-secondary)]/60 flex-1 text-center">
                  Showing {thumbOffset + 1}–{Math.min(thumbOffset + THUMB_WINDOW, totalImages)} of {totalImages} views
                </span>

                <button
                  onClick={() => setThumbOffset(o => Math.min(o + THUMB_WINDOW, totalImages - THUMB_WINDOW))}
                  disabled={thumbOffset + THUMB_WINDOW >= totalImages}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]/70 hover:text-[#C9A84C] hover:border-[#C9A84C] disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            )}

            {/* Thumbnail strip — only renders THUMB_WINDOW items */}
            <div
              ref={thumbStripRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none"
            >
              {visibleThumbs.map(({ img, realIndex }) => (
                <motion.button
                  key={realIndex}
                  onClick={() => handleSelect(realIndex)}
                  whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#f8f4ee] overflow-hidden transition-all duration-300 ${
                    realIndex === activeIndex
                      ? 'ring-2 ring-[#C9A84C] ring-offset-1 opacity-100'
                      : 'border border-[#C9A84C]/20 opacity-55 hover:opacity-90 hover:border-[#C9A84C]/40'
                  }`}
                >
                  <SmartImage
                    src={urlForImage(img)?.width(120).quality(75).url() || '/images/placeholder.png'}
                    alt={`${name} view ${realIndex + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"   /* ← NEVER crops thumbnail */
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════
          CINEMATIC LIGHTBOX
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && displayImages && (
          <>
            {/* Backdrop */}
            <motion.div
              key="lightbox-backdrop"
              variants={lightboxBackdropVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-2xl"
              onClick={closeLightbox}
            />

            {/* Content */}
            <motion.div
              key="lightbox-content"
              variants={lightboxContentVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl max-h-[90vh] pointer-events-auto">

                {/* Close button */}
                <motion.button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10 flex items-center gap-2 text-xs uppercase tracking-widest font-label"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Close
                </motion.button>

                {/* Main lightbox image with shimmer */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: luxuryEasing.elegant }}
                    className="relative w-full aspect-square sm:aspect-[4/3]"
                  >
                    <SmartImage
                      src={urlForImage(displayImages[lightboxIndex])?.width(1200).quality(90).url() || '/images/placeholder.png'}
                      alt={`${name} — full view`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {totalImages > 1 && (
                  <>
                    <motion.button
                      onClick={e => { e.stopPropagation(); lightboxPrev(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-sm transition-colors"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={e => { e.stopPropagation(); lightboxNext(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-sm transition-colors"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </motion.button>
                  </>
                )}

                {/* Dot indicators only for ≤15 images */}
                {totalImages > 1 && totalImages <= 15 && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                    {displayImages.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                        className={`rounded-full transition-all duration-300 ${i === lightboxIndex ? 'bg-[#C9A84C] w-5 h-1.5' : 'bg-white/30 w-1.5 h-1.5 hover:bg-white/60'}`}
                        whileTap={{ scale: 0.85 }}
                      />
                    ))}
                  </div>
                )}

                {/* Counter — always visible */}
                <div className="absolute -bottom-8 left-0 text-white/50 text-xs uppercase tracking-[0.2em] font-label">
                  {name} — {lightboxIndex + 1} / {totalImages}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
