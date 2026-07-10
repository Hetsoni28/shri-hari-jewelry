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
      {/* ── Floating Button — Brand Purple ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4, type: 'spring' }}
        className="fixed z-50 right-5 sm:right-6 bottom-[88px] sm:bottom-[98px] w-[52px] h-[52px] sm:w-[60px] sm:h-[60px]"
      >
        {/* Tooltip Pill */}
        <div
          className="absolute bottom-full right-0 mb-2 bg-white px-3 py-1.5 shadow-md flex items-center justify-center pointer-events-none border border-[#8069BF]/20"
          style={{ minWidth: 'max-content' }}
        >
          <span className="text-[13px] font-semibold text-[#8069BF] tracking-wide">
            Today&apos;s gold rate
          </span>
        </div>

        {/* Circular Brand Purple Button */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Today's Gold Rate"
          className="w-full h-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_4px_16px_rgba(128,105,191,0.45)]"
          style={{ background: '#8069BF' }}
        >
          {/* Gold Bar Icon */}
          <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
            <rect x="3"  y="13" width="26" height="13" rx="2" fill="#C9A74D" />
            <rect x="7"  y="9"  width="18" height="6"  rx="1" fill="#B8903C" />
            <rect x="6"  y="17" width="16" height="1.5" rx="0.8" fill="rgba(255,255,255,0.22)" />
            <rect x="6"  y="20" width="10" height="1.5" rx="0.8" fill="rgba(255,255,255,0.12)" />
            <circle cx="26" cy="8" r="1.2" fill="#F5E09A" opacity="0.95" />
          </svg>
        </button>
      </motion.div>

      {/* ── Popup — Brand Colors ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed z-50 w-[310px] sm:w-[340px] overflow-hidden"
            style={{
              bottom: '150px',
              right: '16px',
              background: '#F7F5FA',
              border: '1.5px solid rgba(128,105,191,0.30)',
              boxShadow: '0 20px 60px rgba(128,105,191,0.20), 0 4px 16px rgba(0,0,0,0.10)',
            }}
          >
            {/* Brand purple top stripe */}
            <div
              className="h-[3px] w-full"
              style={{ background: 'linear-gradient(90deg, #8069BF, #C9A74D, #8069BF)' }}
            />

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-4 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] uppercase tracking-[0.22em] font-bold"
                    style={{ color: '#8069BF' }}
                  >
                    Live Market Rate
                  </span>
                </div>
                <h3
                  className="font-bold text-[15px] leading-tight"
                  style={{ color: '#171717' }}
                >
                  Today&apos;s Gold &amp; Silver Rate
                </h3>
                {data && (
                  <p className="text-[10px] mt-0.5 tracking-wide" style={{ color: '#7C7296' }}>
                    Last updated: {formatDate(data.timestamp)}
                  </p>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-7 h-7 flex items-center justify-center transition-all duration-200 ml-2 mt-0.5 hover:bg-[#8069BF]/10"
                style={{ color: '#8069BF' }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px" style={{ background: 'rgba(128,105,191,0.20)' }} />

            {/* Rate Cards */}
            <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-2.5">
              {METAL_CARDS.map(r => (
                <div
                  key={r.key}
                  className="px-3.5 py-3"
                  style={{
                    background: r.silver
                      ? 'rgba(124,114,150,0.08)'
                      : 'rgba(201,167,77,0.08)',
                    border: r.silver
                      ? '1px solid rgba(124,114,150,0.25)'
                      : '1px solid rgba(201,167,77,0.35)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5"
                    style={{ color: r.silver ? '#7C7296' : '#8069BF' }}
                  >
                    {r.label}
                  </p>
                  <p className="text-[9px] mb-2" style={{ color: r.silver ? '#9E99B0' : '#C9A74D' }}>
                    {r.sublabel}
                  </p>

                  {loading || !data ? (
                    <div
                      className="h-5 w-20 animate-pulse mt-2"
                      style={{ background: r.silver ? 'rgba(124,114,150,0.15)' : 'rgba(128,105,191,0.15)' }}
                    />
                  ) : (
                    <div className="mt-1.5 pt-2 border-t" style={{ borderColor: r.silver ? 'rgba(124,114,150,0.15)' : 'rgba(128,105,191,0.15)' }}>
                      <p className="text-[8px] uppercase tracking-widest font-semibold mb-1" style={{ color: r.silver ? '#9E99B0' : '#7C7296' }}>
                        Approx Price
                      </p>
                      <p
                        className="text-[17px] font-bold leading-none"
                        style={{ color: r.silver ? '#7C7296' : '#171717' }}
                      >
                        ₹{data[r.key].toLocaleString('en-IN')}
                        <span
                          className="text-[10px] font-medium ml-0.5"
                          style={{ color: r.silver ? '#9E99B0' : '#8069BF' }}
                        >
                          /gm
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA — Brand Purple */}
            <div className="px-4 pb-4">
              <a
                href="/collections"
                onClick={() => setOpen(false)}
                className="block w-full text-center text-[12px] font-bold tracking-wide py-2.5 transition-all duration-200 hover:brightness-110"
                style={{
                  background: '#8069BF',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(128,105,191,0.40)',
                }}
              >
                Shop Now →
              </a>
            </div>

            {/* Disclaimer */}
            <p
              className="text-center text-[9px] pb-3 px-4 tracking-wide"
              style={{ color: '#9E99B0' }}
            >
              Rates for reference only · Actual price may vary by karat &amp; making
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
