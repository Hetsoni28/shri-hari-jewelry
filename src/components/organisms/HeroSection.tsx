'use client';

import Link from 'next/link';
import FramedImage, { type Fit } from '@/components/atoms/FramedImage';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMetalRates } from '@/hooks/useMetalRates';
import { shopInfo } from '@/data/shopInfo';

// How long each piece stays in the frame. The gold progress line under the
// caption runs on a CSS animation of this length and advances the slide when
// it ends — so hovering (which pauses the animation) pauses the slideshow too.
const SLIDE_MS = 5500;
const EASE = [0.22, 1, 0.36, 1] as const;

type HeroImage = { src: string; fit: Fit; ratio: number; alt?: string; name: string; category: string; slug?: string };
type Props = { heroImages?: HeroImage[]; productCount?: number };

const CATEGORY_LABEL: Record<string, string> = { Set: 'Sets' };
const label = (c: string) => CATEGORY_LABEL[c] ?? c;
const pad = (n: number) => String(n).padStart(2, '0');

const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Namaste! I saw your collection on the website and would like to know more.',
)}`;

// The splash loader covers the page on a full load. Hold the intro until it
// lifts so the entrance is actually seen; on client-side navigation there is
// no loader and the intro plays straight away.
type LoaderWindow = Window & { __shLoaderDone?: boolean };

function subscribeLoader(onChange: () => void) {
  window.addEventListener('sh:loader-done', onChange);
  // Safety net in case the loader never reports in
  const fallback = setTimeout(() => {
    (window as LoaderWindow).__shLoaderDone = true;
    onChange();
  }, 4000);
  return () => {
    window.removeEventListener('sh:loader-done', onChange);
    clearTimeout(fallback);
  };
}

function useIntroReady() {
  return useSyncExternalStore(
    subscribeLoader,
    () => !!(window as LoaderWindow).__shLoaderDone,
    () => false,
  );
}

const intro = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.09 * i } }),
};

export default function HeroSection({ heroImages = [], productCount }: Props) {
  const reduceMotion = !!useReducedMotion();
  const ready = useIntroReady();
  const rates = useMetalRates();

  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const touchX = useRef<number | null>(null);

  const total = heroImages.length;
  const item = heroImages[current];
  const go = useCallback((i: number) => setCurrent(((i % total) + total) % total), [total]);

  // Warm the cache with the next piece so the crossfade never shows a blank frame
  useEffect(() => {
    if (total < 2) return;
    const next = new window.Image();
    next.src = heroImages[(current + 1) % total].src;
  }, [current, total, heroImages]);

  const anim = (i: number) =>
    reduceMotion ? {} : { variants: intro, custom: i, initial: 'hidden', animate: ready ? 'show' : 'hidden' };

  return (
    <section
      aria-label="Shri Hari Jewellers — featured pieces"
      className="relative w-full overflow-hidden bg-[#FDFCFA]"
    >
      {/* Soft lavender wash behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-[760px] w-[760px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(128,105,191,0.11)_0%,rgba(128,105,191,0)_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-20 lg:pt-14">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-12 lg:gap-6">

          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div className="min-w-0 lg:col-span-6">
            <motion.p
              {...anim(0)}
              className="flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A8873A]"
            >
              <span className="h-px w-8 bg-[#C9A74D]" />
              Mogar, Anand · Since 2001
            </motion.p>

            {/* Each line rises out of its own mask */}
            <h1 className="mt-6 font-headline text-[clamp(2.6rem,4.4vw,4.1rem)] font-medium leading-[1.03] tracking-[-0.02em] text-[#1C1726]">
              {[
                <>Jewellery made</>,
                <>to be <em className="font-normal italic text-[#8069BF]">handed down.</em></>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    {...(reduceMotion
                      ? {}
                      : {
                          initial: { y: '105%' },
                          animate: ready ? { y: '0%' } : { y: '105%' },
                          transition: { duration: 1, ease: EASE, delay: 0.12 + i * 0.12 },
                        })}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...anim(2)}
              className="mt-6 max-w-[33rem] font-body text-[16px] leading-[1.7] text-[#5F5A6B] sm:text-[17px]"
            >
              Gold and silver ornaments handcrafted in our family workshop — BIS hallmarked,
              priced on the day&apos;s rate, and made to order when you want a piece that is only yours.
            </motion.p>

            <motion.div {...anim(3)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-3 bg-[#8069BF] px-7 py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#6A55A8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8069BF]"
              >
                Explore the catalogue
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </Link>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 font-label text-[14px] font-semibold text-[#1C1726]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px] text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="border-b border-[#C9A74D]/70 pb-0.5 transition-colors duration-300 group-hover:border-[#1C1726]">
                  Ask us on WhatsApp
                </span>
              </a>
            </motion.div>

            {/* Facts a buyer actually checks — the live rate first */}
            <motion.dl
              {...anim(4)}
              className="mt-12 grid max-w-[34rem] grid-cols-3 divide-x divide-[#E9E3D6] border-y border-[#E9E3D6]"
            >
              <div className="py-4 pr-3 sm:pr-5">
                <dt className="font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C8698] sm:text-[11px]">
                  22KT today
                </dt>
                <dd className="mt-1.5 font-headline text-[19px] tabular-nums text-[#1C1726] sm:text-[24px]">
                  {rates ? `₹${rates.gold22.toLocaleString('en-IN')}` : <span className="text-[#CFC8BA]">₹ —</span>}
                </dd>
                <dd className="mt-0.5 flex items-center gap-1.5 font-label text-[11px] text-[#8C8698]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  {rates?.source === 'market' ? 'per gram, market est.' : 'per gram, today'}
                </dd>
              </div>
              <div className="px-3 py-4 sm:px-5">
                <dt className="font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C8698] sm:text-[11px]">
                  Designs
                </dt>
                <dd className="mt-1.5 font-headline text-[19px] tabular-nums text-[#1C1726] sm:text-[24px]">
                  {productCount && productCount > 0 ? productCount : '100+'}
                </dd>
                <dd className="mt-0.5 font-label text-[11px] text-[#8C8698]">in the catalogue</dd>
              </div>
              <div className="py-4 pl-3 sm:pl-5">
                <dt className="font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C8698] sm:text-[11px]">
                  Hallmark
                </dt>
                <dd className="mt-1.5 font-headline text-[19px] text-[#1C1726] sm:text-[24px]">BIS</dd>
                <dd className="mt-0.5 font-label text-[11px] text-[#8C8698]">certified gold</dd>
              </div>
            </motion.dl>
          </div>

          {/* ── Arched showcase ─────────────────────────────────────────── */}
          {item && (
            <div
              className="min-w-0 lg:col-span-6"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setHovered(true)}
              onBlurCapture={() => setHovered(false)}
            >
              <div className="flex items-center justify-center gap-10 lg:justify-end">
                <figure
                  className="relative w-full max-w-[400px] sm:max-w-[420px] lg:max-w-[min(420px,calc((100svh-15rem)*0.8))]"
                  onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (touchX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchX.current;
                    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
                    touchX.current = null;
                  }}
                >
                  {/* Offset gold outline — the jharokha arch */}
                  <div aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-[#C9A74D]/45 sm:-inset-4" />

                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[#F3EFE6]">
                    <AnimatePresence initial={false} mode="sync">
                      <motion.div
                        key={current}
                        className="absolute inset-0"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.045 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 0.9, ease: EASE }, scale: { duration: 1.8, ease: EASE } }}
                      >
                        <FramedImage
                          src={item.src}
                          fit={item.fit}
                          ratio={item.ratio}
                          alt={item.alt || `${item.name} — ${label(item.category)}`}
                          priority={current === 0}
                          sizes="(min-width: 1024px) 420px, 90vw"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Caption plate */}
                  <figcaption className="relative z-10 -mt-12 ml-auto w-[86%] border border-[#EFE9DC] bg-white px-5 pb-4 pt-4 shadow-[0_22px_44px_-22px_rgba(28,23,38,0.28)] sm:-mr-8 sm:w-[78%]">
                    {total > 1 && !reduceMotion && (
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[#F1ECDF]">
                        <span
                          key={current}
                          className="block h-full origin-left bg-[#C9A74D]"
                          style={{
                            animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                            animationPlayState: hovered ? 'paused' : 'running',
                          }}
                          onAnimationEnd={() => go(current + 1)}
                        />
                      </span>
                    )}

                    <div aria-live="polite">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={current}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <p className="flex items-center justify-between font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A8873A]">
                            <span>{label(item.category)}</span>
                            <span className="tabular-nums text-[#B5AFBF]">
                              {pad(current + 1)} / {pad(total)}
                            </span>
                          </p>
                          <p className="mt-1.5 truncate font-headline text-[18px] leading-snug text-[#1C1726]">
                            {item.name}
                          </p>
                          <Link
                            href={item.slug ? `/catalog/${item.slug}` : `/catalog?category=${encodeURIComponent(item.category)}`}
                            className="mt-2 inline-flex items-center gap-2 font-label text-[12px] font-semibold text-[#8069BF] hover:text-[#1C1726] transition-colors"
                          >
                            View this piece
                            <svg width="13" height="9" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                              <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                            </svg>
                          </Link>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </figcaption>
                </figure>

                {/* Category index — desktop */}
                {total > 1 && (
                  <ol className="hidden shrink-0 flex-col gap-0.5 lg:flex" aria-label="Featured categories">
                    {heroImages.map((h, i) => (
                      <li key={h.src}>
                        <button
                          type="button"
                          onClick={() => go(i)}
                          aria-current={i === current ? 'true' : undefined}
                          className="group flex w-full items-center gap-3 py-1.5 text-left"
                        >
                          <span
                            className={`h-px transition-all duration-500 ${
                              i === current ? 'w-8 bg-[#C9A74D]' : 'w-3 bg-[#D6CFC0] group-hover:w-5'
                            }`}
                          />
                          <span
                            className={`font-label text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                              i === current ? 'font-semibold text-[#1C1726]' : 'text-[#9A94A6] group-hover:text-[#5F5A6B]'
                            }`}
                          >
                            {label(h.category)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Category chips — mobile & tablet */}
              {total > 1 && (
                <div
                  className="-mx-5 mt-8 flex gap-6 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Featured categories"
                >
                  {heroImages.map((h, i) => (
                    <button
                      key={h.src}
                      type="button"
                      onClick={() => go(i)}
                      aria-current={i === current ? 'true' : undefined}
                      className={`shrink-0 border-b pb-1.5 font-label text-[12px] uppercase tracking-[0.16em] transition-colors ${
                        i === current
                          ? 'border-[#C9A74D] font-semibold text-[#1C1726]'
                          : 'border-transparent text-[#9A94A6]'
                      }`}
                    >
                      {label(h.category)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Closing gold hairline */}
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A74D]/50 to-transparent" />
    </section>
  );
}
