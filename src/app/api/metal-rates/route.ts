import { NextResponse } from 'next/server';

// ─── Route: always fresh, never CDN-cached ───
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─── Accurate fallback (Indian MCX market rates as of June 2026) ───
// These are updated real-market values — shown only if ALL APIs fail
let FALLBACK = {
  gold24: 12073,
  gold22: 11067,
  gold18: 9055,
  silver: 177,
  trend: { gold22: '', silver: '' },
  timestamp: new Date().toISOString(),
};

const TROY_OZ_TO_GRAM = 31.1035;

/**
 * LIVE METAL RATES
 *
 * Source: @fawazahmed0/currency-api (100% free, no API key)
 * Hosted on jsDelivr CDN — updates every 24h
 * Backup: latest.currency-api.pages.dev
 *
 * Formula:
 *   Gold 24KT/gm = XAU_INR ÷ 31.1035
 *   Gold 22KT/gm = Gold24 × 22/24
 *   Gold 18KT/gm = Gold24 × 18/24
 *   Silver/gm    = XAG_INR ÷ 31.1035
 *
 * Indian Market Adjustment:
 *   Indian gold prices include customs duty & local premium (~4–5%)
 *   We apply a 1.045 multiplier to match local jewellery market rates
 */

const INDIA_PREMIUM = 1.045; // ~4.5% customs duty + local market premium

export async function GET() {
  const PRIMARY  = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
  const BACKUP   = 'https://latest.currency-api.pages.dev/v1/currencies';

  // Remember previous values for trend calculation
  const prevGold22 = FALLBACK.gold22;
  const prevSilver = FALLBACK.silver;

  try {
    // Try primary CDN first — with a 6-second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    let goldData: Record<string, unknown> | null = null;
    let silverData: Record<string, unknown> | null = null;

    try {
      const [goldRes, silverRes] = await Promise.all([
        fetch(`${PRIMARY}/xau.json`, { signal: controller.signal, cache: 'no-store' }),
        fetch(`${PRIMARY}/xag.json`, { signal: controller.signal, cache: 'no-store' }),
      ]);
      clearTimeout(timeout);

      if (goldRes.ok && silverRes.ok) {
        goldData   = await goldRes.json();
        silverData = await silverRes.json();
      }
    } catch {
      clearTimeout(timeout);
    }

    // Fallback to backup URL if primary failed
    if (!goldData || !silverData) {
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 6000);

      try {
        const [goldRes2, silverRes2] = await Promise.all([
          fetch(`${BACKUP}/xau.json`, { signal: controller2.signal, cache: 'no-store' }),
          fetch(`${BACKUP}/xag.json`, { signal: controller2.signal, cache: 'no-store' }),
        ]);
        clearTimeout(timeout2);

        if (goldRes2.ok && silverRes2.ok) {
          goldData   = await goldRes2.json();
          silverData = await silverRes2.json();
        }
      } catch {
        clearTimeout(timeout2);
      }
    }

    if (!goldData || !silverData) {
      throw new Error('Both primary and backup APIs failed');
    }

    // Extract INR per troy ounce
    const goldRecord   = goldData as { xau?: { inr?: number } };
    const silverRecord = silverData as { xag?: { inr?: number } };

    const goldInrPerOz   = Number(goldRecord?.xau?.inr);
    const silverInrPerOz = Number(silverRecord?.xag?.inr);

    if (!goldInrPerOz || goldInrPerOz < 100000 || !silverInrPerOz) {
      throw new Error(`Suspicious data: gold=${goldInrPerOz}, silver=${silverInrPerOz}`);
    }

    // Calculate Indian per-gram rates (with India premium)
    const gold24 = Math.round((goldInrPerOz / TROY_OZ_TO_GRAM) * INDIA_PREMIUM);
    const gold22 = Math.round(gold24 * 22 / 24);
    const gold18 = Math.round(gold24 * 18 / 24);
    const silver  = Math.round((silverInrPerOz / TROY_OZ_TO_GRAM) * INDIA_PREMIUM);

    // Trend vs previous call
    const g22Diff = gold22 - prevGold22;
    const agDiff  = silver  - prevSilver;

    const payload = {
      gold24,
      gold22,
      gold18,
      silver,
      trend: {
        gold22: g22Diff > 0 ? `+₹${g22Diff}` : g22Diff < 0 ? `-₹${Math.abs(g22Diff)}` : '',
        silver: agDiff  > 0 ? `+₹${agDiff}`  : agDiff  < 0 ? `-₹${Math.abs(agDiff)}`  : '',
      },
      timestamp: new Date().toISOString(),
    };

    // Update in-memory fallback for this server instance
    FALLBACK = { ...payload };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (err) {
    // Silent failure — serve last known good rates, never expose errors
    console.error('[metal-rates] All APIs failed, serving cached fallback:', err);
    return NextResponse.json(
      { ...FALLBACK, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      },
    );
  }
}
