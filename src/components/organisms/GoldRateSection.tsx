'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MetalRates {
  gold24: number;
  gold22: number;
  gold18: number;
  silver: number;
  trend: { gold22: string; silver: string };
  timestamp: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (value === prev) return;
    // Count animation
    const start = prev;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setPrev(end);
    };
    requestAnimationFrame(step);
  }, [value, prev]);

  return <>{displayed.toLocaleString('en-IN')}</>;
}

const rates = [
  {
    key: 'gold24' as const,
    label: 'Gold 24KT',
    sublabel: 'Pure Gold',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <rect x="6" y="18" width="36" height="18" rx="3" fill="url(#g24)" />
        <rect x="10" y="14" width="28" height="6" rx="2" fill="url(#g24b)" />
        <defs>
          <linearGradient id="g24" x1="6" y1="18" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D060" /><stop offset="0.5" stopColor="#C9A84C" /><stop offset="1" stopColor="#A07830" />
          </linearGradient>
          <linearGradient id="g24b" x1="10" y1="14" x2="38" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE980" /><stop offset="1" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    key: 'gold22' as const,
    label: 'Gold 22KT',
    sublabel: 'Jewellery Gold',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <rect x="6" y="18" width="36" height="18" rx="3" fill="url(#g22)" />
        <rect x="10" y="14" width="28" height="6" rx="2" fill="url(#g22b)" />
        <defs>
          <linearGradient id="g22" x1="6" y1="18" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D060" /><stop offset="0.5" stopColor="#C9A84C" /><stop offset="1" stopColor="#A07830" />
          </linearGradient>
          <linearGradient id="g22b" x1="10" y1="14" x2="38" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE980" /><stop offset="1" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    key: 'gold18' as const,
    label: 'Gold 18KT',
    sublabel: 'Mixed Alloy',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <rect x="6" y="18" width="36" height="18" rx="3" fill="url(#g18)" />
        <rect x="10" y="14" width="28" height="6" rx="2" fill="url(#g18b)" />
        <defs>
          <linearGradient id="g18" x1="6" y1="18" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8C040" /><stop offset="0.5" stopColor="#B8903C" /><stop offset="1" stopColor="#906828" />
          </linearGradient>
          <linearGradient id="g18b" x1="10" y1="14" x2="38" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D060" /><stop offset="1" stopColor="#B8903C" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    key: 'silver' as const,
    label: 'Silver',
    sublabel: '92.5 Sterling',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <rect x="6" y="18" width="36" height="18" rx="3" fill="url(#ag)" />
        <rect x="10" y="14" width="28" height="6" rx="2" fill="url(#agb)" />
        <defs>
          <linearGradient id="ag" x1="6" y1="18" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8E8E8" /><stop offset="0.5" stopColor="#B0B0B0" /><stop offset="1" stopColor="#888888" />
          </linearGradient>
          <linearGradient id="agb" x1="10" y1="14" x2="38" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5F5F5" /><stop offset="1" stopColor="#B0B0B0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function GoldRateSection() {
  const [data, setData] = useState<MetalRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const fetchRates = async () => {
    try {
      const res = await fetch('/api/metal-rates');
      if (res.ok) {
        const json = await res.json();
        if (json.gold24 > 0) setData(json);
      }
    } catch {/* silent */}
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 15 * 60 * 1000);
    // Tick every minute to refresh "X mins ago"
    const ticker = setInterval(() => setTick(t => t + 1), 60_000);
    return () => { clearInterval(interval); clearInterval(ticker); };
  }, []);

  return (
    <section className="w-full bg-[#0D0D0D] py-14 sm:py-20 px-4 relative overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(#C9A84C 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold">Live Market Rates</span>
          </div>

          <h2 className="text-headline text-3xl sm:text-4xl font-bold text-white mb-3">
            Today&apos;s Gold &amp; Silver Rate
          </h2>
          <p className="text-sm text-white/40 tracking-wider">
            {data ? `Updated ${timeAgo(data.timestamp)}` : 'Fetching live rates…'}
            <span key={tick} className="hidden">{tick}</span>
          </p>
        </motion.div>

        {/* Rate Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence>
            {rates.map((r, i) => (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className={`relative overflow-hidden rounded-xl border p-5 sm:p-6 h-full flex flex-col gap-3 transition-all duration-300 ${
                  r.key === 'silver'
                    ? 'bg-white/[0.04] border-white/10 group-hover:border-white/25 group-hover:bg-white/[0.07]'
                    : 'bg-[#C9A84C]/[0.06] border-[#C9A84C]/15 group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/[0.10]'
                }`}>

                  {/* Shimmer overlay on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    r.key === 'silver'
                      ? 'bg-gradient-to-br from-white/5 to-transparent'
                      : 'bg-gradient-to-br from-[#C9A84C]/10 to-transparent'
                  }`} />

                  {/* Icon + label row */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      r.key === 'silver' ? 'bg-white/10' : 'bg-[#C9A84C]/15'
                    }`}>
                      {r.icon}
                    </div>
                    <div>
                      <p className={`text-[11px] font-bold uppercase tracking-[0.15em] leading-none mb-1 ${
                        r.key === 'silver' ? 'text-white/60' : 'text-[#C9A84C]'
                      }`}>{r.label}</p>
                      <p className="text-[10px] text-white/30 tracking-wide">{r.sublabel}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-auto">
                    {loading || !data ? (
                      <div className="h-8 w-24 rounded-md bg-white/10 animate-pulse" />
                    ) : (
                      <motion.p
                        className={`text-xl sm:text-2xl font-bold tracking-tight ${
                          r.key === 'silver' ? 'text-white' : 'text-[#F5E09A]'
                        }`}
                        key={data[r.key]}
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        ₹<AnimatedNumber value={data[r.key]} />
                        <span className="text-xs font-normal text-white/40 ml-1">/gm</span>
                      </motion.p>
                    )}

                    {/* Trend badge (gold22 & silver only) */}
                    {data && (r.key === 'gold22' || r.key === 'silver') && data.trend[r.key] && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-1.5 ${
                        data.trend[r.key].startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.trend[r.key].startsWith('+') ? '▲' : '▼'} {data.trend[r.key]}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footnote */}
        <motion.p
          className="text-center text-[11px] text-white/25 mt-8 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Rates sourced from international spot markets · For reference only · Actual making charges may apply
        </motion.p>
      </div>

      {/* Gold bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
    </section>
  );
}
