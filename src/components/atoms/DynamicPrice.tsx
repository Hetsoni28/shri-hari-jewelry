'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { usePriceCalculator, type PricingInput } from '@/hooks/usePriceCalculator';

interface DynamicPriceProps {
  input: PricingInput;
  /** Show a skeleton/shimmer while loading rates */
  showSkeleton?: boolean;
  /** Extra className on the price wrapper */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZES = {
  sm:  { price: 'text-xl',  label: 'text-[10px]', unit: 'text-xs'  },
  md:  { price: 'text-2xl', label: 'text-[10px]', unit: 'text-sm'  },
  lg:  { price: 'text-3xl', label: 'text-[11px]', unit: 'text-sm'  },
  xl:  { price: 'text-4xl', label: 'text-xs',     unit: 'text-base' },
};

/** Animated counting number — counts smoothly from prev → next value */
function AnimatedNumber({ value }: { value: number }) {
  const ref     = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<number>(value);

  useEffect(() => {
    const el  = ref.current;
    if (!el)  return;
    const from = prevRef.current;
    const to   = value;
    if (from === to) return;

    const controls = animate(from, to, {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier smooth
      onUpdate(v) {
        el.textContent = `₹${Math.round(v).toLocaleString('en-IN')}`;
      },
    });

    prevRef.current = to;
    return () => controls.stop();
  }, [value]);

  return (
    <span ref={ref} aria-label={`₹${value.toLocaleString('en-IN')}`}>
      ₹{value.toLocaleString('en-IN')}
    </span>
  );
}

export default function DynamicPrice({
  input,
  showSkeleton = true,
  className    = '',
  size         = 'xl',
}: DynamicPriceProps) {
  const breakdown = usePriceCalculator(input);
  const [visible, setVisible] = useState(false);
  const sz = SIZES[size];

  // Fade-in once we have a real price
  useEffect(() => {
    if (breakdown?.total) setVisible(true);
  }, [breakdown]);

  if (!breakdown) {
    if (!showSkeleton) return null;
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {/* Shimmer skeleton */}
        <div className="h-4 w-28 rounded bg-[#C9A84C]/10 animate-pulse" />
        <div className="h-9 w-48 rounded bg-[#C9A84C]/15 animate-pulse" />
        <div className="h-3 w-36 rounded bg-[#C9A84C]/8 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {/* Label */}
      <p className={`${sz.label} uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-1.5`}>
        Approx. Selling Price
      </p>

      {/* Price with animation */}
      <div className={`${sz.price} font-bold text-[var(--foreground)] flex items-baseline gap-1.5`}>
        <AnimatedNumber value={breakdown.total} />
      </div>

      {/* GST notice */}
      <p className="text-[10px] text-[var(--color-neutral)] mt-1.5 leading-relaxed">
        Incl. {input.gstPercent ?? 3}% GST · Based on live {input.metalType === 'Silver' ? 'Silver' : 'Gold'} rate ·{' '}
        <span className="text-[#C9A84C]">Final price at store</span>
      </p>
    </div>
  );
}
