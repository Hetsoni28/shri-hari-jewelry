'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ASK_RATE_HREF, rateLabel, rateNote, useMetalRateState } from '@/hooks/useMetalRates';
import { shopInfo } from '@/data/shopInfo';

/**
 * Floating "today's rate" board.
 *
 * The trigger itself shows the 22KT rate, so most visitors get the number without
 * opening anything. Opened, it reads like a jeweller's rate board: four ruled rows,
 * 22KT (what jewellery is priced on) marked in gold, real day-over-day movement and
 * an honest line about where the numbers come from. Desktop: a panel above the
 * trigger. Phones: a bottom sheet you can swipe down.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const ROWS = [
  { key: 'gold22', label: 'Gold 22KT', purity: '916 · jewellery gold', trend: 'gold22', primary: true },
  { key: 'gold24', label: 'Gold 24KT', purity: '999 · fine gold' },
  { key: 'gold18', label: 'Gold 18KT', purity: '750' },
  { key: 'silver', label: 'Silver', purity: '999 · fine silver', trend: 'silver' },
] as const;

const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Namaste! Could you tell me today's gold rate and the price of a piece I'm interested in?",
)}`;

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function Trend({ value }: { value?: string }) {
  if (!value) return null;
  const up = value.startsWith('+');
  return (
    <span className={`font-label text-[11px] font-semibold tabular-nums ${up ? 'text-emerald-600' : 'text-rose-600'}`}>
      {up ? '▲' : '▼'} {value.replace(/^[+-]/, '')}
    </span>
  );
}

export default function GoldRateWidget() {
  const { rates, status } = useMetalRateState();
  const unavailable = status === 'unavailable';
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Open: focus the close button; Esc / outside tap closes; focus returns to the trigger
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !trigger?.contains(t)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      trigger?.focus();
    };
  }, [open]);

  const source = rates ? rateLabel(rates) : unavailable ? 'Not posted yet today' : 'Fetching today’s rates…';

  return (
    <>
      {/* ── Trigger: the rate itself ── */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="rate-board"
        aria-label={rates ? `Today's rates: 22KT gold ${inr(rates.gold22)} per gram. Open the rate board` : "Today's gold rate — open to ask us"}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: EASE }}
        className="fixed bottom-[88px] right-4 z-50 flex items-center gap-2.5 border border-[#E4DCC8] bg-white/95 py-2.5 pl-3.5 pr-4 shadow-[0_14px_34px_-16px_rgba(28,23,38,0.45)] backdrop-blur transition-colors hover:border-[#C9A74D] sm:bottom-[100px] sm:right-6"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {rates && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:hidden" />}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${rates ? 'bg-emerald-500' : 'bg-[#C9A74D]'}`} />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-label text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A6D25]">
            {rates ? '22KT today' : 'Gold rate'}
          </span>
          <span className="mt-1 font-headline text-[16px] tabular-nums text-[#1C1726]">
            {rates ? (
              <>
                {inr(rates.gold22)}
                <span className="ml-0.5 font-label text-[11px] text-[#6B6577]">/g</span>
              </>
            ) : unavailable ? (
              'Ask us today'
            ) : (
              '₹ —'
            )}
          </span>
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={`ml-1 text-[#6B6577] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 5l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Phone backdrop */}
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[60] bg-[#1C1726]/30 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* ── The rate board ── */}
            <motion.div
              key="board"
              id="rate-board"
              ref={panelRef}
              role="dialog"
              aria-labelledby="rate-board-title"
              className="fixed inset-x-0 bottom-0 z-[70] bg-white shadow-[0_-20px_60px_-30px_rgba(28,23,38,0.5)] sm:inset-x-auto sm:bottom-[164px] sm:right-6 sm:w-[360px] sm:origin-bottom-right sm:border sm:border-[#EFE9DC] sm:shadow-[0_30px_70px_-30px_rgba(28,23,38,0.45)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              drag={reduceMotion ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 600) setOpen(false);
              }}
            >
              {/* Gold hairline + phone drag handle */}
              <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#C9A74D]/0 via-[#C9A74D] to-[#C9A74D]/0" />
              <div aria-hidden="true" className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-[#E4DEEE] sm:hidden" />

              <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-4 sm:pt-5">
                <div>
                  <h2 id="rate-board-title" className="font-headline text-[21px] leading-tight text-[#1C1726]">
                    Today&apos;s rates
                  </h2>
                  <p className="mt-1 flex items-center gap-2 font-label text-[12px] text-[#6B6577]">
                    <span className={`h-1.5 w-1.5 rounded-full ${rates ? 'bg-emerald-500' : 'bg-[#C9A74D]'}`} aria-hidden="true" />
                    {source}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close rates"
                  className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center text-[#5F5A6B] transition-colors hover:text-[#1C1726]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
              </div>

              {unavailable && (
                <div className="border-y border-[#F1ECDF] bg-[#FDFBF5] px-6 py-6">
                  <p className="font-body text-[15px] leading-[1.65] text-[#3B3448]">
                    Today&apos;s rate hasn&apos;t been posted yet. Message us and we&apos;ll send you the exact 22KT, 24KT,
                    18KT and silver rate for today.
                  </p>
                </div>
              )}

              {/* Ruled rows */}
              {!unavailable && (
              <dl className="border-y border-[#F1ECDF]">
                {ROWS.map((r, i) => {
                  const primary = 'primary' in r;
                  return (
                    <motion.div
                      key={r.key}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: EASE }}
                      className={`relative flex items-center justify-between gap-4 px-6 py-3.5 ${i ? 'border-t border-[#F6F2EA]' : ''} ${primary ? 'bg-[#FDFBF5]' : ''}`}
                    >
                      {primary && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-[#C9A74D]" />}
                      <dt>
                        <span className={`block font-label text-[14px] font-semibold ${primary ? 'text-[#1C1726]' : 'text-[#3B3448]'}`}>{r.label}</span>
                        <span className="mt-0.5 block font-label text-[11px] text-[#6B6577]">{r.purity}</span>
                      </dt>
                      <dd className="flex items-baseline gap-2.5 text-right">
                        {'trend' in r && <Trend value={rates?.trend[r.trend]} />}
                        <span className={`font-headline tabular-nums text-[#1C1726] ${primary ? 'text-[24px]' : 'text-[20px]'}`}>
                          {rates ? inr(rates[r.key]) : <span className="text-[#D6CFC0]">₹ —</span>}
                        </span>
                        <span className="font-label text-[11px] text-[#6B6577]">/g</span>
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
              )}

              {/* Actions */}
              <div className="px-6 pb-6 pt-5 sm:pb-5">
                <a
                  href={unavailable ? ASK_RATE_HREF : WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 bg-[#1C1726] px-5 py-3.5 font-label text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#8069BF]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {unavailable ? 'Ask for today’s rate' : 'Ask today’s price'}
                </a>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="font-label text-[11px] leading-relaxed text-[#6B6577]">
                    {unavailable ? 'We reply quickly during shop hours.' : rateNote()}
                  </p>
                  <Link
                    href="/catalog"
                    onClick={() => setOpen(false)}
                    className="shrink-0 border-b border-[#C9A74D]/70 pb-0.5 font-label text-[12px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726]"
                  >
                    Browse catalogue
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
