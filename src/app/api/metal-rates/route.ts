import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export const dynamic = 'force-dynamic';

/**
 * TODAY'S METAL RATES (₹ per gram) — the shop's own Indian rate only.
 *
 * The shop publishes its rate in Sanity Studio → "Today's rate". The most recent one
 * set within the last 36 hours is returned with the time it was set (the site always
 * shows that time). No international prices are used anywhere.
 *
 * If no rate has been posted recently the response is { available: false } and the
 * site invites visitors to ask on WhatsApp — it never shows an estimated number.
 *
 * Automatic Indian rates would need IBJA's official subscription API: IBJA benchmark
 * rates may only be used for pricing through it, so they are not taken from ibjarates.com.
 */

const MAX_AGE_H = 36;

const json = (body: object) =>
  NextResponse.json(body, { headers: { 'Cache-Control': 'no-store, max-age=0' } });

const signed = (diff: number) => (diff > 0 ? `+₹${diff}` : diff < 0 ? `-₹${Math.abs(diff)}` : '');

type ShopDoc = { updatedAt: string; gold24: number; gold22: number; gold18: number; silver: number };

export async function GET() {
  try {
    const docs: ShopDoc[] = await client.fetch(
      `*[_type == "dailyRate" && defined(updatedAt)] | order(updatedAt desc)[0...2]{ updatedAt, gold24, gold22, gold18, silver }`,
    );
    const doc = Array.isArray(docs) ? docs[0] : null;
    const fresh =
      !!doc &&
      (Date.now() - new Date(doc.updatedAt).getTime()) / 3_600_000 <= MAX_AGE_H &&
      [doc.gold24, doc.gold22, doc.gold18, doc.silver].every((n) => n > 0);

    if (!fresh) return json({ available: false });

    // Movement against the previous rate the shop posted
    const prev = docs[1];
    return json({
      available: true,
      source: 'shop',
      gold24: Math.round(doc.gold24),
      gold22: Math.round(doc.gold22),
      gold18: Math.round(doc.gold18),
      silver: Math.round(doc.silver),
      trend: {
        gold22: prev ? signed(Math.round(doc.gold22 - prev.gold22)) : '',
        silver: prev ? signed(Math.round(doc.silver - prev.silver)) : '',
      },
      asOf: doc.updatedAt,
      timestamp: doc.updatedAt,
    });
  } catch (err) {
    console.error('[metal-rates] failed:', err);
    return json({ available: false });
  }
}
