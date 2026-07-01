'use client';

import { useMemo } from 'react';
import { useMetalRates, type MetalRates } from './useMetalRates';

export type MetalType  = 'Gold' | 'Silver';
export type GoldPurity = '24KT' | '22KT' | '18KT' | '14KT';

export interface PricingInput {
  metalType:    MetalType;
  purity?:      string;      // e.g. "22KT", "22 Karat", "22k"
  netWeight:    number;      // in grams
  makingCharge: number;      // flat ₹ or per-gram (see makingChargeType)
  makingChargeType?: 'flat' | 'per_gram'; // default 'flat'
  stoneCharge?: number;      // flat ₹ addition
  gstPercent?:  number;      // default 3 (Indian GST on jewellery)
}

export interface PriceBreakdown {
  metalRate:    number;    // ₹/gm for the selected purity
  metalCost:    number;    // metalRate × netWeight
  makingCost:   number;    // making charge applied
  stoneCost:    number;    // stone charge
  subtotal:     number;    // before GST
  gst:          number;    // GST amount
  total:        number;    // final selling price (what the customer sees)
  isLive:       boolean;   // false if using fallback
}

/** Parse purity string → one of the known karat keys */
function parsePurity(raw?: string): GoldPurity {
  if (!raw) return '22KT';
  const n = raw.replace(/[^0-9]/g, '');
  if (n === '24') return '24KT';
  if (n === '18') return '18KT';
  if (n === '14') return '14KT';
  return '22KT'; // default for jewellery gold
}

function getGoldRate(rates: MetalRates, purity: GoldPurity): number {
  switch (purity) {
    case '24KT': return rates.gold24;
    case '18KT': return rates.gold18;
    case '14KT': return Math.round(rates.gold24 * 14 / 24);
    default:     return rates.gold22; // 22KT
  }
}

/**
 * usePriceCalculator
 *
 * Returns a fully calculated price breakdown using live market rates.
 * Pass the product's metadata; get back the final selling price.
 *
 * The customer never sees this formula — they only see `breakdown.total`.
 */
export function usePriceCalculator(input: PricingInput): PriceBreakdown | null {
  const rates = useMetalRates();

  return useMemo(() => {
    if (!rates) return null;

    const {
      metalType,
      purity,
      netWeight,
      makingCharge,
      makingChargeType = 'flat',
      stoneCharge = 0,
      gstPercent  = 3,
    } = input;

    let metalRate: number;

    if (metalType === 'Silver') {
      metalRate = rates.silver;
    } else {
      const resolvedPurity = parsePurity(purity);
      metalRate = getGoldRate(rates, resolvedPurity);
    }

    const metalCost  = Math.round(metalRate * netWeight);
    const makingCost = makingChargeType === 'per_gram'
      ? Math.round(makingCharge * netWeight)
      : Math.round(makingCharge);
    const stoneCost  = Math.round(stoneCharge);
    const subtotal   = metalCost + makingCost + stoneCost;
    const gst        = Math.round(subtotal * gstPercent / 100);
    const total      = subtotal + gst;

    return {
      metalRate,
      metalCost,
      makingCost,
      stoneCost,
      subtotal,
      gst,
      total,
      isLive: true,
    };
  }, [rates, input]);
}
