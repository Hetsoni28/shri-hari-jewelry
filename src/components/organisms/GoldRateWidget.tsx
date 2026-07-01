'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMetalRates } from '@/hooks/useMetalRates';
import type { MetalRates } from '@/hooks/useMetalRates';

function formatDate(ts: string) {
  const d = new Date(ts);
  return (
    d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()
  );
}

const METAL_CARDS = [
  { label: 'Gold 24KT', sublabel: 'Pure Gold',      key: 'gold24' as const, silver: false },
  { label: 'Gold 22KT', sublabel: 'Jewellery Gold', key: 'gold22' as const, silver: false },
  { label: 'Gold 18KT', sublabel: 'Mixed Alloy',    key: 'gold18' as const, silver: false },
  { label: 'Silver',    sublabel: '92.5 Sterling',  key: 'silver' as const, silver: true  },
];

export default function GoldRateWidget() {
  const [open, setOpen] = useState(false);
  const data            = useMetalRates();
  const loading         = data === null;
  const popupRef        = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      {/* ── Floating Button (Exact Match) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4, type: 'spring' }}
        className="fixed z-50 right-5 sm:right-6 bottom-[88px] sm:bottom-[98px] w-[52px] h-[52px] sm:w-[60px] sm:h-[60px]"
      >
        {/* Tooltip Pill (Aligned to the right edge so it doesn't overflow) */}
        <div 
          className="absolute bottom-full right-0 mb-2 bg-white rounded-xl px-3 py-1.5 shadow-md flex items-center justify-center pointer-events-none border border-black/5" 
          style={{ minWidth: 'max-content' }}
        >
          <span className="text-[13px] font-semibold text-[#0B347B] tracking-wide">
            Today&apos;s gold rate
          </span>
        </div>

        {/* Circular Blue Button */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Today's Gold Rate"
          className="w-full h-full rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_4px_16px_rgba(11,52,123,0.4)]"
          style={{ background: '#0B347B' }}
        >
          {/* Gold Bar Icon */}
          <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
            <rect x="3"  y="13" width="26" height="13" rx="3"    fill="#F5C34A" />
            <rect x="7"  y="9"  width="18" height="6"  rx="2"    fill="#EBB138" />
            <rect x="6"  y="17" width="16" height="1.5" rx="0.8" fill="rgba(255,255,255,0.22)" />
            <rect x="6"  y="20" width="10" height="1.5" rx="0.8" fill="rgba(255,255,255,0.12)" />
            {/* tiny sparkle */}
            <circle cx="26" cy="8" r="1.2" fill="#FFF5A0" opacity="0.95" />
            <path d="M26 5.5 L26.6 7.4 L28.5 8 L26.6 8.6 L26 10.5 L25.4 8.6 L23.5 8 L25.4 7.4 Z"
              fill="#FFF5A0" opacity="0.85" transform="scale(0.75) translate(8, 2)" />
          </svg>
        </button>
      </motion.div>

      {/* ── Popup ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed z-50 w-[310px] sm:w-[340px] rounded-none overflow-hidden"
            style={{
              bottom: '150px',
              right: '16px',
              background: '#FFFDF7',
              border: '1.5px solid rgba(201,168,76,0.35)',
              boxShadow: '0 20px 60px rgba(160,120,48,0.18), 0 4px 16px rgba(0,0,0,0.10)',
            }}
          >
            {/* Gold top stripe */}
            <div
              className="h-[3px] w-full"
              style={{ background: 'linear-gradient(90deg, #C9A84C, #F5E09A, #C9A84C)' }}
            />

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-4 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] uppercase tracking-[0.22em] font-bold"
                    style={{ color: '#A07830' }}
                  >
                    Live Market Rate
                  </span>
                </div>
                <h3
                  className="font-bold text-[15px] leading-tight"
                  style={{ color: '#1A0F00' }}
                >
                  Today&apos;s Gold &amp; Silver Rate
                </h3>
                {data && (
                  <p className="text-[10px] mt-0.5 tracking-wide" style={{ color: '#8C7040' }}>
                    Last updated: {formatDate(data.timestamp)}
                  </p>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ml-2 mt-0.5"
                style={{ color: '#A07830' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px" style={{ background: 'rgba(201,168,76,0.25)' }} />

            {/* Rate Cards */}
            <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-2.5">
              {METAL_CARDS.map(r => (
                <div
                  key={r.key}
                  className="rounded-none px-3.5 py-3"
                  style={{
                    background: r.silver
                      ? 'linear-gradient(135deg, #F4F4F4 0%, #ECECEC 100%)'
                      : 'linear-gradient(135deg, #FFF8E8 0%, #FFF1CC 100%)',
                    border: r.silver
                      ? '1px solid rgba(160,160,160,0.30)'
                      : '1px solid rgba(201,168,76,0.35)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5"
                    style={{ color: r.silver ? '#666' : '#A07830' }}
                  >
                    {r.label}
                  </p>
                  <p className="text-[9px] mb-2" style={{ color: r.silver ? '#999' : '#BF9840' }}>
                    {r.sublabel}
                  </p>

                  {loading || !data ? (
                    <div
                      className="h-5 w-20 rounded animate-pulse mt-2"
                      style={{ background: r.silver ? '#DDD' : 'rgba(201,168,76,0.25)' }}
                    />
                  ) : (
                    <div className="mt-1.5 pt-2 border-t" style={{ borderColor: r.silver ? 'rgba(0,0,0,0.06)' : 'rgba(201,168,76,0.15)' }}>
                      <p className="text-[8px] uppercase tracking-widest font-semibold mb-1" style={{ color: r.silver ? '#888' : '#B89345' }}>
                        Approx Price
                      </p>
                      <p
                        className="text-[17px] font-bold leading-none"
                        style={{ color: r.silver ? '#333' : '#7A4F10' }}
                      >
                        ₹{data[r.key].toLocaleString('en-IN')}
                        <span
                          className="text-[10px] font-medium ml-0.5"
                          style={{ color: r.silver ? '#999' : '#B89345' }}
                        >
                          /gm
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
              <a
                href="/collections"
                onClick={() => setOpen(false)}
                className="block w-full text-center text-[12px] font-bold tracking-wide py-2.5 rounded-none transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #A07830 100%)',
                  color: '#FFF8E8',
                  boxShadow: '0 4px 14px rgba(201,168,76,0.35)',
                }}
              >
                Shop Now →
              </a>
            </div>

            {/* Disclaimer */}
            <p
              className="text-center text-[9px] pb-3 px-4 tracking-wide"
              style={{ color: '#C0A060' }}
            >
              Rates for reference only · Actual price may vary by karat &amp; making
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
