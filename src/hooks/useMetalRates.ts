'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface MetalRates {
  gold24: number;
  gold22: number;
  gold18: number;
  silver: number;
  trend: { gold22: string; silver: string };
  /** 'shop' = the shop's own published rate; 'market' = calculated market estimate */
  source: 'shop' | 'market';
  /** when the rates were set (shop) or the date of the market data */
  asOf: string;
  timestamp: string;
}

/** "Shop rate · 12 Nov, 10:30 am" or "Market estimate · 11 Nov" */
export function rateLabel(r: Pick<MetalRates, 'source' | 'asOf'>) {
  const d = new Date(r.asOf);
  return r.source === 'shop'
    ? `Shop rate · ${d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}`
    : `Market estimate · ${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })}`;
}

// ── Module-level shared state so all components share ONE fetch ──
let globalRates: MetalRates | null = null;
const listeners = new Set<(r: MetalRates) => void>();
let fetchTimer: ReturnType<typeof setTimeout> | null = null;
let isFetching = false;

async function fetchAndBroadcast() {
  if (isFetching) return;
  isFetching = true;
  try {
    const res = await fetch('/api/metal-rates', { cache: 'no-store' });
    if (res.ok) {
      const data: MetalRates = await res.json();
      if (data?.gold22 > 5000) {          // sanity check — real rates are above ₹5,000
        globalRates = data;
        listeners.forEach(fn => fn(data));
      }
    }
  } catch {/* silent */} finally {
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
 * useMetalRates
 *
 * Shared hook — all components get rates from a single fetch.
 * Automatically refreshes every `refreshEveryMs` ms (default 10 minutes).
 * Never throws; returns null until first successful fetch.
 */
export function useMetalRates(refreshEveryMs = 10 * 60 * 1000): MetalRates | null {
  const [rates, setRates] = useState<MetalRates | null>(globalRates);
  const mounted = useRef(true);

  const handleUpdate = useCallback((r: MetalRates) => {
    if (mounted.current) setRates(r);
  }, []);

  useEffect(() => {
    mounted.current = true;
    listeners.add(handleUpdate);

    // Start fetching if not already (if rates are already loaded, useState started with them)
    if (!globalRates) fetchAndBroadcast();

    scheduleNext(refreshEveryMs);

    return () => {
      mounted.current = false;
      listeners.delete(handleUpdate);
    };
  }, [handleUpdate, refreshEveryMs]);

  return rates;
}
