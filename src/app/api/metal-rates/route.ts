import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export const dynamic = 'force-dynamic';

/**
 * TODAY'S METAL RATES (₹ per gram)
 *
 * 1. Shop rate — if the shop has published a "Today's rate" in Sanity Studio within
 *    the last 36 hours, that is what the site shows. It is exactly what the shop charges.
 *
 * 2. Market estimate — otherwise, the Indian market price is calculated from the
 *    international price published daily by @fawazahmed0/currency-api (free, no key):
 *
 *      24KT (999) = international INR price per gram × (1 + import duty)
 *      22KT (916) = 24KT × 0.916        18KT (750) = 24KT × 0.75
 *      Silver (999) = international INR price per gram × (1 + import duty)
 *
 *    Import duty on gold and silver is 6% (5% basic customs + 1% AIDC, Union Budget
 *    July 2024). Override with METAL_IMPORT_DUTY if the duty changes. Rates are
 *    before 3% GST and making charges, as Indian rate boards quote them.
 *    The change shown is against the previous day's published price.
 *
 * 3. Unavailable — if both fail, the response says so. Old numbers are never
 *    presented as today's.
 */

const IMPORT_DUTY = Number(process.env.METAL_IMPORT_DUTY ?? 0.06);
const TROY_OZ_GRAMS = 31.1034768;
const SHOP_RATE_MAX_AGE_H = 36;

const SOURCES = [
  (day: string) => `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${day}/v1/currencies`,
  (day: string) => `https://${day}.currency-api.pages.dev/v1/currencies`,
];

type Rates = {
  available: true;
  source: 'shop' | 'market';
  gold24: number;
  gold22: number;
  gold18: number;
  silver: number;
  trend: { gold22: string; silver: string };
  /** when these rates were set (shop) or the date of the market data */
  asOf: string;
  /** kept for older callers — same as asOf */
  timestamp: string;
};

const json = (body: object) =>
  NextResponse.json(body, { headers: { 'Cache-Control': 'no-store, max-age=0' } });

const signed = (diff: number) => (diff > 0 ? `+₹${diff}` : diff < 0 ? `-₹${Math.abs(diff)}` : '');

// ── 1. Shop rate from Sanity ──────────────────────────────────────────────────
async function shopRate(): Promise<Rates | null> {
  const doc = await client.fetch(
    `*[_type == "dailyRate" && defined(updatedAt)] | order(updatedAt desc)[0]{ updatedAt, gold24, gold22, gold18, silver }`,
  );
  if (!doc || Array.isArray(doc) || !doc.updatedAt) return null;
  const ageH = (Date.now() - new Date(doc.updatedAt).getTime()) / 3_600_000;
  if (ageH > SHOP_RATE_MAX_AGE_H || ![doc.gold24, doc.gold22, doc.gold18, doc.silver].every((n) => n > 0)) return null;

  // Movement against the previous published shop rate, if any
  const prev = await client.fetch(
    `*[_type == "dailyRate" && updatedAt < $at] | order(updatedAt desc)[0]{ gold22, silver }`,
    { at: doc.updatedAt },
  );
  const hasPrev = prev && !Array.isArray(prev);

  return {
    available: true,
    source: 'shop',
    gold24: Math.round(doc.gold24),
    gold22: Math.round(doc.gold22),
    gold18: Math.round(doc.gold18),
    silver: Math.round(doc.silver),
    trend: {
      gold22: hasPrev ? signed(Math.round(doc.gold22 - prev.gold22)) : '',
      silver: hasPrev ? signed(Math.round(doc.silver - prev.silver)) : '',
    },
    asOf: doc.updatedAt,
    timestamp: doc.updatedAt,
  };
}

// ── 2. Market estimate ────────────────────────────────────────────────────────
type Spot = { date: string; goldPerGram: number; silverPerGram: number };

async function spot(day: string): Promise<Spot | null> {
  for (const base of SOURCES) {
    try {
      const [g, s] = await Promise.all(
        ['xau', 'xag'].map((m) =>
          fetch(`${base(day)}/${m}.json`, { signal: AbortSignal.timeout(6000), next: { revalidate: 1800 } }).then((r) =>
            r.ok ? r.json() : null,
          ),
        ),
      );
      const goldOz = Number(g?.xau?.inr);
      const silverOz = Number(s?.xag?.inr);
      // Sanity check: reject obviously broken data
      if (goldOz > 50_000 && silverOz > 500) {
        return { date: g.date, goldPerGram: goldOz / TROY_OZ_GRAMS, silverPerGram: silverOz / TROY_OZ_GRAMS };
      }
    } catch {
      /* try the next source */
    }
  }
  return null;
}

const indian = (spotPerGram: number) => spotPerGram * (1 + IMPORT_DUTY);

async function marketRate(): Promise<Rates | null> {
  const today = await spot('latest');
  if (!today) return null;

  const gold24 = Math.round(indian(today.goldPerGram));
  const gold22 = Math.round(gold24 * 0.916);
  const gold18 = Math.round(gold24 * 0.75);
  const silver = Math.round(indian(today.silverPerGram));

  // Real day-over-day movement: compare with the previous day's published data
  const prevDay = new Date(`${today.date}T00:00:00Z`);
  prevDay.setUTCDate(prevDay.getUTCDate() - 1);
  const prev = await spot(prevDay.toISOString().slice(0, 10));
  const prev22 = prev ? Math.round(Math.round(indian(prev.goldPerGram)) * 0.916) : null;
  const prevAg = prev ? Math.round(indian(prev.silverPerGram)) : null;

  const asOf = `${today.date}T00:00:00.000Z`;
  return {
    available: true,
    source: 'market',
    gold24,
    gold22,
    gold18,
    silver,
    trend: {
      gold22: prev22 !== null ? signed(gold22 - prev22) : '',
      silver: prevAg !== null ? signed(silver - prevAg) : '',
    },
    asOf,
    timestamp: asOf,
  };
}

export async function GET() {
  try {
    const rates = (await shopRate().catch(() => null)) ?? (await marketRate());
    if (rates) return json(rates);
  } catch (err) {
    console.error('[metal-rates] failed:', err);
  }
  return json({ available: false });
}
