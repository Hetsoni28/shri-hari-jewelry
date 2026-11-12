'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { shopInfo } from '@/data/shopInfo';

// Shown when a page fails to load (e.g. the catalogue service is briefly unreachable).
// The header and footer stay, so visitors can carry on browsing.
export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center bg-[#FDFCFA] px-5 py-24 text-center sm:py-32" aria-labelledby="error-title">
      <div className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A74D] to-transparent" aria-hidden="true" />
      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8A6D25]">Something went wrong</p>
      <h1 id="error-title" className="mt-4 max-w-xl font-headline text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-[#1C1726]">
        This page didn&apos;t load properly
      </h1>
      <p className="mt-4 max-w-md font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
        It&apos;s usually a brief hiccup. Please try again — or message us and we&apos;ll help you directly.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="min-h-[48px] bg-[#1C1726] px-8 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8069BF]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center border border-[#1C1726] px-8 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1C1726] transition-colors hover:bg-[#1C1726] hover:text-white"
        >
          Back to home
        </Link>
      </div>
      <a href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`} className="mt-8 font-label text-[14px] text-[#5F5A6B] hover:text-[#1C1726]">
        or call <span className="font-semibold tabular-nums text-[#1C1726]">{shopInfo.phone1}</span>
      </a>
      {error.digest && <p className="mt-6 font-label text-[11px] text-[#6B6577]">Reference: {error.digest}</p>}
    </section>
  );
}
