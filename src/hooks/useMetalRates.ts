'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface MetalRates {
  gold24: number;
  gold22: number;
  gold18: number;
  silver: number;
  trend: { gold22: string; silver: string };
  timestamp: string;
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

    // Start fetching if not already
    if (!globalRates) {
      fetchAndBroadcast();
    } else {
      setRates(globalRates);
    }

    scheduleNext(refreshEveryMs);

    return () => {
      mounted.current = false;
      listeners.delete(handleUpdate);
    };
  }, [handleUpdate, refreshEveryMs]);

  return rates;
}
