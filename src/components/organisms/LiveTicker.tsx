'use client';

import { useMetalRates } from '@/hooks/useMetalRates';

// ── Helper: format timestamp as "Updated X mins ago" ──
function timeAgo(ts: string): string {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (diff < 1)  return 'Just updated';
  if (diff === 1) return '1 min ago';
  if (diff < 60)  return `${diff} mins ago`;
  return 'Today';
}

// ── Trend badge: +₹35 in green or -₹5 in red ──
function Trend({ value }: { value: string }) {
  if (!value) return null;
  const up = value.startsWith('+');
  return (
    <span
      className={`text-[10px] font-bold ml-1 ${up ? 'text-emerald-400' : 'text-rose-400'}`}
    >
      {up ? '▲' : '▼'} {value}
    </span>
  );
}

// ── One rate item ──
function RateItem({
  label,
  value,
  trend,
}: {
  label: string;
  value: number;
  trend?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-white/75">
        {label}
      </span>
      <span className="text-xs sm:text-sm font-semibold text-[#FDF6E3]">
        ₹{value.toLocaleString('en-IN')}<span className="text-white/40 text-[10px]">/gm</span>
      </span>
      {trend !== undefined && <Trend value={trend} />}
    </div>
  );
}

// ── Separator dot ──
const Dot = () => (
  <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40 shrink-0 mx-2" />
);

export default function LiveTicker() {
  const rates = useMetalRates();

  if (!rates) return null;

  // Build the single scrolling content block
  const Content = () => (
    <div className="flex items-center gap-0 shrink-0">
      {/* LIVE badge */}
      <div className="flex items-center gap-1.5 shrink-0 mr-8">
        <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] font-bold">
          Live Market
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
      </div>

      <RateItem label="Gold 24KT" value={rates.gold24} />
      <Dot />
      <RateItem label="Gold 22KT" value={rates.gold22} trend={rates.trend.gold22} />
      <Dot />
      <RateItem label="Gold 18KT" value={rates.gold18} />
      <Dot />
      <RateItem label="Silver" value={rates.silver} trend={rates.trend.silver} />
      <Dot />

      {/* Updated time */}
      <span className="text-[10px] uppercase tracking-widest text-white/35 shrink-0 ml-2 mr-12">
        {timeAgo(rates.timestamp)}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-[#0F0F0F] text-[#E5E5E5] border-b border-[#C9A84C]/15 overflow-hidden py-2">
      {/* Fade edges */}
      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-[#0F0F0F] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#0F0F0F] to-transparent" />

        {/* Marquee — two copies for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap">
          <Content />
          <Content />
          <Content />
        </div>
      </div>
    </div>
  );
}
