'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { shopInfo } from '@/data/shopInfo';

/** The shop's own Indian rates, published in Sanity Studio → "Today's rate" */
export interface MetalRates {
  gold24: number;
  gold22: number;
  gold18: number;
  silver: number;
  /** day-over-day change, e.g. "+₹40" */
  trend: { gold22: string; silver: string };
  source: 'shop';
  /** when the shop set these rates */
  asOf: string;
  timestamp: string;
}

/** 'loading' until the first answer; 'unavailable' when no rate has been posted recently */
export type RateStatus = 'loading' | 'ready' | 'unavailable';

/** "Shop rate · 12 Nov, 10:30 am" */
export function rateLabel(r: Pick<MetalRates, 'asOf'>) {
  return `Shop rate · ${new Date(r.asOf).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}`;
}

/** One-line explanation for footnotes */
export function rateNote() {
  return 'Our rate for the day, per gram, before 3% GST and making charges.';
}

/** WhatsApp link asking the shop for today's rate — shown wherever a rate isn't posted */
export const ASK_RATE_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Namaste! What is today's gold and silver rate?",
)}`;

// ── Module-level shared state so all components share ONE fetch ──
type State = { rates: MetalRates | null; status: RateStatus };
let globalState: State = { rates: null, status: 'loading' };
const listeners = new Set<(s: State) => void>();
let fetchTimer: ReturnType<typeof setTimeout> | null = null;
let isFetching = false;

function broadcast(next: State) {
  globalState = next;
  listeners.forEach((fn) => fn(next));
}

async function fetchAndBroadcast() {
  if (isFetching) return;
  isFetching = true;
  try {
    const res = await fetch('/api/metal-rates', { cache: 'no-store' });
    const data = res.ok ? await res.json() : null;
    // Sanity check — real gold rates are above ₹1,000/g
    if (data?.available && data.gold22 > 1000) broadcast({ rates: data as MetalRates, status: 'ready' });
    else if (res.ok) broadcast({ rates: null, status: 'unavailable' });
  } catch {
    /* network hiccup — keep whatever we had */
  } finally {
    isFetching = false;
  }
}

function scheduleNext(intervalMs: number) {
  if (fetchTimer) clearTimeout(fetchTimer);
  fetchTimer = setTimeout(() => {
    fetchAndBroadcast();
    scheduleNext(intervalMs);
  }, intervalMs);
}

/**
 * Shared rate state — all components get rates from a single fetch, refreshed every
 * `refreshEveryMs` (default 10 minutes). Never throws.
 */
export function useMetalRateState(refreshEveryMs = 10 * 60 * 1000): State {
  const [state, setState] = useState<State>(globalState);
  const mounted = useRef(true);

  const handleUpdate = useCallback((s: State) => {
    if (mounted.current) setState(s);
  }, []);

  useEffect(() => {
    mounted.current = true;
    listeners.add(handleUpdate);
    // Start fetching if not already (if loaded, useState started with the shared state)
    if (globalState.status === 'loading') fetchAndBroadcast();
    scheduleNext(refreshEveryMs);
    return () => {
      mounted.current = false;
      listeners.delete(handleUpdate);
    };
  }, [handleUpdate, refreshEveryMs]);

  return state;
}

/** Just the rates (null while loading or when none are posted) */
export function useMetalRates(refreshEveryMs?: number): MetalRates | null {
  return useMetalRateState(refreshEveryMs).rates;
}
