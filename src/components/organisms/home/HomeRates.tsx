'use client';

import Link from 'next/link';
import Reveal from '@/components/atoms/Reveal';
import { ASK_RATE_HREF, rateLabel, rateNote, useMetalRateState } from '@/hooks/useMetalRates';
import { ArrowRight, Eyebrow } from './SectionHeading';

const ROWS = [
  { key: 'gold24', label: 'Gold 24KT', note: '999 fine' },
  { key: 'gold22', label: 'Gold 22KT', note: '916 · jewellery gold' },
  { key: 'gold18', label: 'Gold 18KT', note: '750' },
  { key: 'silver', label: 'Silver', note: '999 · fine silver' },
] as const;

function Trend({ value }: { value?: string }) {
  if (!value) return null;
  const up = value.startsWith('+');
  return (
    <span className={`font-label text-[11px] font-semibold tabular-nums ${up ? 'text-emerald-600' : 'text-rose-600'}`}>
      {up ? '▲' : '▼'} {value.replace(/^[+-]/, '')}
    </span>
  );
}

export default function HomeRates({ goldCount, silverCount }: { goldCount: number; silverCount: number }) {
  const { rates, status } = useMetalRateState();
  const unavailable = status === 'unavailable';

  return (
    <section className="bg-[#F7F5FA] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">

        {/* ── How a price is made ── */}
        <Reveal className="lg:col-span-6">
          <Eyebrow>Honest pricing</Eyebrow>
          <h2 className="mt-4 font-headline text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.015em] text-[#1C1726]">
            Today&apos;s rates, <em className="font-normal italic text-[#8069BF]">in the open.</em>
          </h2>
          <p className="mt-5 max-w-xl font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
            We don&apos;t print fixed prices on gold. Every piece is priced on the day you buy it,
            and we walk you through each part of the number.
          </p>

          {/* The formula, spelled out */}
          {/* Two halves so a narrow screen breaks the formula at the "+" */}
          <p className="mt-9 flex flex-wrap items-stretch gap-x-3 gap-y-2.5 font-label text-[13px]" aria-label="Weight times day's rate, plus making charge, equals your price">
            {[
              ['Weight', '×', 'Day’s rate'],
              ['+', 'Making charge', '=', 'Your price'],
            ].map((group, g) => (
              <span key={g} className="flex items-stretch gap-2 sm:gap-3" aria-hidden="true">
                {group.map((t) =>
                  t.length === 1 ? (
                    <span key={t} className="flex items-center px-0.5 font-headline text-[20px] text-[#C9A74D]">
                      {t}
                    </span>
                  ) : (
                    <span
                      key={t}
                      className={`flex items-center whitespace-nowrap px-3.5 py-2.5 font-semibold sm:px-4 ${
                        t === 'Your price' ? 'bg-[#8069BF] text-white' : 'border border-[#DDD6E8] bg-white text-[#1C1726]'
                      }`}
                    >
                      {t}
                    </span>
                  ),
                )}
              </span>
            ))}
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link
              href="/catalog?metal=Gold"
              className="group inline-flex items-center gap-2.5 border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726]"
            >
              Browse {goldCount} gold designs
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {silverCount > 0 && (
              <Link
                href="/catalog?metal=Silver"
                className="group inline-flex items-center gap-2.5 border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726]"
              >
                Browse {silverCount} silver designs
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </Reveal>

        {/* ── Live rate card ── */}
        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="border border-[#E4DEEE] bg-white shadow-[0_30px_60px_-40px_rgba(28,23,38,0.35)]">
            <div className="flex items-center justify-between border-b border-[#EFE9DC] px-6 py-5 sm:px-8">
              <p className="font-headline text-[20px] text-[#1C1726]">Rate per gram</p>
              <p className="flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B6577]">
                <span className={`h-1.5 w-1.5 rounded-full ${rates ? 'bg-emerald-500' : 'bg-[#C9A74D]'}`} aria-hidden="true" />
                {rates ? rateLabel(rates) : unavailable ? 'Not posted yet today' : 'Fetching…'}
              </p>
            </div>

            {unavailable ? (
              <div className="px-6 py-10 text-center sm:px-8">
                <p className="mx-auto max-w-sm font-body text-[16px] leading-[1.7] text-[#3B3448]">
                  Today&apos;s rate hasn&apos;t been posted yet. Message us and we&apos;ll send you the exact 22KT, 24KT,
                  18KT and silver rate for today.
                </p>
                <a
                  href={ASK_RATE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 bg-[#1C1726] px-6 py-3.5 font-label text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#8069BF]"
                >
                  Ask for today&apos;s rate
                </a>
              </div>
            ) : (
            <dl className="divide-y divide-[#F1ECDF]">
              {ROWS.map((r) => (
                <div key={r.key} className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
                  <dt>
                    <span className="block font-label text-[14px] font-semibold text-[#1C1726]">{r.label}</span>
                    {r.note && <span className="mt-0.5 block font-label text-[12px] text-[#6B6577]">{r.note}</span>}
                  </dt>
                  <dd className="flex items-baseline gap-3 text-right">
                    {r.key === 'gold22' && <Trend value={rates?.trend.gold22} />}
                    {r.key === 'silver' && <Trend value={rates?.trend.silver} />}
                    <span className="font-headline text-[24px] tabular-nums text-[#1C1726] sm:text-[28px]">
                      {rates ? `₹${rates[r.key].toLocaleString('en-IN')}` : <span className="text-[#D6CFC0]">₹ —</span>}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            )}

            <p className="border-t border-[#EFE9DC] bg-[#FDFCFA] px-6 py-4 font-label text-[12px] leading-relaxed text-[#6B6577] sm:px-8">
              {rateNote()} Ask us on WhatsApp for any piece&apos;s exact price.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
