'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import type { Fit } from '@/components/atoms/FramedImage';
import CatalogCard from '@/components/organisms/catalog/CatalogCard';
import { ArrowRight, Eyebrow } from '@/components/organisms/home/SectionHeading';
import { categoryKey } from '@/lib/catalog';
import { shopInfo } from '@/data/shopInfo';

export type CatalogItem = {
  id: string;
  name: string;
  slug: string;
  /** normalised category key, e.g. "bracelet" */
  category: string;
  categoryLabel: string;
  gender: string | null;
  metal: string | null;
  isNew: boolean;
  /** 0 = most recently added */
  newest: number;
  image: { src: string; fit: Fit; ratio: number } | null;
  thumb: string;
  /** descriptive alt text for the photo */
  alt: string;
};

type Sort = 'featured' | 'newest' | 'name';
const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'name', label: 'Name, A–Z' },
];

type Option = { value: string | null; label: string };
const GENDERS: Option[] = [{ value: null, label: 'All' }, { value: 'Women', label: 'Women' }, { value: 'Men', label: 'Men' }];
const METALS: Option[] = [{ value: null, label: 'All' }, { value: 'Gold', label: 'Gold' }, { value: 'Silver', label: 'Silver' }];

const PAGE = 24;
const EASE = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Namaste! I couldn't find the piece I'm looking for in your catalogue — can you make it to order?",
)}`;

// Unisex pieces are listed under both Women and Men
const genderMatch = (it: CatalogItem, g: string | null) =>
  g === null || it.gender === g || (it.gender === 'Unisex' && (g === 'Women' || g === 'Men'));
const metalMatch = (it: CatalogItem, m: string | null) => m === null || it.metal === m;
const categoryMatch = (it: CatalogItem, c: string) => c === 'all' || it.category === c;

// "Featured" on the full catalogue: take one piece from each category in turn,
// so the first screen shows variety rather than a wall of rings.
function interleave(list: CatalogItem[]) {
  const buckets = new Map<string, CatalogItem[]>();
  for (const it of list) buckets.set(it.category, [...(buckets.get(it.category) ?? []), it]);
  const out: CatalogItem[] = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const b of buckets.values()) if (b[i]) out.push(b[i]);
  }
  return out;
}

function Segmented({
  label,
  options,
  value,
  countOf,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string | null;
  countOf: (v: string | null) => number;
  onChange: (v: string | null) => void;
}) {
  // Options with nothing to show are hidden rather than offered as dead ends
  const shown = options.filter((o) => o.value === null || o.value === value || countOf(o.value) > 0);
  if (shown.length < 3 && value === null) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8698]">{label}</span>
      <div role="group" aria-label={label} className="flex border border-[#E2DCCF] bg-white p-0.5">
        {shown.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`px-3.5 py-1.5 font-label text-[12px] font-semibold transition-colors duration-200 ${
                active ? 'bg-[#1C1726] text-white' : 'text-[#5F5A6B] hover:text-[#1C1726]'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogClient({ items }: { items: CatalogItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduceMotion = useReducedMotion();

  // Restoring from the back/forward cache can leave a blank page — refresh it
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) router.refresh();
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [router]);

  // ── Filters live in the URL, so links, sharing and Back all keep the view
  const category = params.get('category') ? categoryKey(params.get('category')) : 'all';
  const gender = GENDERS.find((o) => o.value === params.get('gender'))?.value ?? null;
  const metal = METALS.find((o) => o.value === params.get('metal'))?.value ?? null;
  const sort = SORTS.find((s) => s.value === params.get('sort'))?.value ?? 'featured';

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Category rail — only categories that exist under the current For / Metal choice
  const categories = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const it of items) {
      if (!it.category || !genderMatch(it, gender) || !metalMatch(it, metal)) continue;
      const entry = counts.get(it.category) ?? { label: it.categoryLabel, count: 0 };
      entry.count++;
      counts.set(it.category, entry);
    }
    return [...counts.entries()]
      .map(([key, v]) => ({ key, ...v }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [items, gender, metal]);

  const scopeTotal = useMemo(
    () => items.filter((it) => genderMatch(it, gender) && metalMatch(it, metal)).length,
    [items, gender, metal],
  );

  const countFor = (g: string | null, m: string | null) =>
    items.filter((it) => genderMatch(it, g) && metalMatch(it, m) && categoryMatch(it, category)).length;

  const results = useMemo(() => {
    const list = items.filter((it) => genderMatch(it, gender) && metalMatch(it, metal) && categoryMatch(it, category));
    if (sort === 'newest') return [...list].sort((a, b) => a.newest - b.newest);
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return category === 'all' ? interleave(list) : list;
  }, [items, gender, metal, category, sort]);

  // "Show more" resets whenever the filters change
  const filterKey = `${category}|${gender}|${metal}|${sort}`;
  const [shown, setShown] = useState({ key: filterKey, n: PAGE });
  const visibleCount = Math.min(shown.key === filterKey ? shown.n : PAGE, results.length);
  const visible = results.slice(0, visibleCount);

  const activeChips = [
    category !== 'all' && { key: 'category', label: categories.find((c) => c.key === category)?.label ?? category },
    gender && { key: 'gender', label: gender === 'Women' ? 'For women' : 'For men' },
    metal && { key: 'metal', label: metal },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="bg-[#FDFCFA]">
      {/* ── Header ── */}
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>The catalogue</Eyebrow>
            <h1 className="mt-5 font-headline text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-[#1C1726]">
              Every piece, <em className="font-normal italic text-[#8069BF]">in one place.</em>
            </h1>
            <p className="mt-5 max-w-xl font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
              {`${items.length} gold and silver designs from our workshop in Mogar. `}
              Prices follow the day&apos;s gold rate, so they aren&apos;t listed — open any piece and ask us
              on WhatsApp for today&apos;s price.
            </p>
          </div>
          <Link
            href="/catalog-download"
            className="group inline-flex shrink-0 items-center gap-2.5 self-start border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726] lg:self-auto"
          >
            Download the PDF catalogue
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      {/* ── Category rail ── */}
      <nav aria-label="Categories" className="border-y border-[#EFE9DC] bg-white">
        <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 [scrollbar-width:none] sm:gap-9 sm:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden">
          {[{ key: 'all', label: 'All', count: scopeTotal }, ...categories].map((c) => {
            const active = c.key === category;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => update('category', c.key === 'all' ? null : c.key)}
                className={`relative shrink-0 py-5 font-label text-[13px] transition-colors duration-200 ${
                  active ? 'font-semibold text-[#1C1726]' : 'text-[#8C8698] hover:text-[#1C1726]'
                }`}
              >
                {c.label}
                <sup className="ml-1 text-[10px] font-normal tabular-nums text-[#B5AFBF]">{c.count}</sup>
                {active && (
                  <motion.span
                    layoutId="catalog-category"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C9A74D]"
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Filters & sort ── */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Segmented label="For" options={GENDERS} value={gender} countOf={(g) => countFor(g, metal)} onChange={(v) => update('gender', v)} />
            <Segmented label="Metal" options={METALS} value={metal} countOf={(m) => countFor(gender, m)} onChange={(v) => update('metal', v)} />
          </div>

          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="font-label text-[13px] text-[#8C8698]" aria-live="polite">
              <span className="font-semibold tabular-nums text-[#1C1726]">{results.length}</span>{' '}
              {results.length === 1 ? 'piece' : 'pieces'}
            </p>
            <label className="flex items-center gap-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8698]">
              Sort
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => update('sort', e.target.value === 'featured' ? null : e.target.value)}
                  className="cursor-pointer appearance-none border border-[#E2DCCF] bg-white py-2 pl-3 pr-9 font-label text-[13px] font-semibold normal-case tracking-normal text-[#1C1726] transition-colors focus:border-[#8069BF] focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8698]">
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
            </label>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => update(chip.key, null)}
                className="inline-flex items-center gap-2 bg-[#F7F5FA] px-3 py-1.5 font-label text-[12px] font-semibold text-[#1C1726] transition-colors hover:bg-[#EEE9F6]"
                aria-label={`Remove filter: ${chip.label}`}
              >
                {chip.label}
                <span aria-hidden="true" className="text-[#8C8698]">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="ml-1 font-label text-[12px] font-semibold text-[#8069BF] underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      <section aria-label="Pieces" className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-12">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="font-headline text-[26px] text-[#1C1726]">Nothing here yet</p>
            <p className="mt-3 max-w-sm font-body text-[15px] leading-[1.7] text-[#5F5A6B]">
              No pieces match these filters. Try another category — or ask us, we can make it to order.
            </p>
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="mt-8 border border-[#1C1726] px-7 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1C1726] transition-colors hover:bg-[#1C1726] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
            {visible.map((it, i) => (
              <motion.li
                key={it.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: Math.min((i % PAGE) * 0.035, 0.35) }}
              >
                <CatalogCard item={it} priority={i < 4} />
              </motion.li>
            ))}
          </ul>
        )}

        {results.length > visibleCount && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="font-label text-[13px] text-[#8C8698]">
              Showing <span className="tabular-nums text-[#1C1726]">{visibleCount}</span> of{' '}
              <span className="tabular-nums text-[#1C1726]">{results.length}</span>
            </p>
            <div className="h-px w-48 bg-[#E9E3D6]" aria-hidden="true">
              <div className="h-full bg-[#C9A74D] transition-[width] duration-500" style={{ width: `${(visibleCount / results.length) * 100}%` }} />
            </div>
            <button
              type="button"
              onClick={() => setShown({ key: filterKey, n: visibleCount + PAGE })}
              className="mt-3 border border-[#1C1726] px-8 py-3.5 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1C1726] transition-colors duration-300 hover:bg-[#1C1726] hover:text-white"
            >
              Show more pieces
            </button>
          </div>
        )}
      </section>

      {/* ── Made to order ── */}
      <section className="border-t border-[#EFE9DC] bg-[#F7F5FA]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-xl">
            <Eyebrow>Made to order</Eyebrow>
            <h2 className="mt-4 font-headline text-[clamp(1.9rem,3.2vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#1C1726]">
              Can&apos;t find it? <em className="font-normal italic text-[#8069BF]">We&apos;ll make it.</em>
            </h2>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
              Send us a photo or describe the piece. We&apos;ll talk you through the weight, purity and price
              before anything is made.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1C1726] px-7 py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8069BF]"
            >
              Ask on WhatsApp
            </a>
            <a href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`} className="font-label text-[14px] text-[#5F5A6B] transition-colors hover:text-[#1C1726]">
              or call <span className="font-semibold tabular-nums text-[#1C1726]">{shopInfo.phone1}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
