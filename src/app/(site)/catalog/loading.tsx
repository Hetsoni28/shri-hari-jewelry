import React from 'react';

// Premium shimmer skeleton for catalog page
// Shown instantly by Next.js while page.tsx fetches data from Sanity

function ShimmerCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image placeholder with shimmer */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f0ebe3] mb-3">
        <div className="absolute inset-0 shimmer-gold" />
      </div>

      {/* Badge line */}
      <div className="relative overflow-hidden h-2.5 w-12 bg-[#ede8e0] mb-2 rounded-sm">
        <div className="absolute inset-0 shimmer-gold" />
      </div>

      {/* Title line 1 */}
      <div className="relative overflow-hidden h-3 w-3/4 bg-[#ede8e0] mb-1.5 rounded-sm">
        <div className="absolute inset-0 shimmer-gold" />
      </div>

      {/* Title line 2 */}
      <div className="relative overflow-hidden h-3 w-1/2 bg-[#ede8e0] rounded-sm">
        <div className="absolute inset-0 shimmer-gold" />
      </div>
    </div>
  );
}

export default function CatalogLoading() {
  return (
    <>
      {/* Inject shimmer keyframes */}
      <style>{`
        @keyframes shimmerGold {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-gold {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 168, 76, 0.18) 40%,
            rgba(201, 168, 76, 0.32) 50%,
            rgba(201, 168, 76, 0.18) 60%,
            transparent 100%
          );
          animation: shimmerGold 1.6s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col w-full bg-white pb-16">

        {/* Gold hairline */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <section className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-6">

          {/* ── Header skeleton ── */}
          <div className="flex flex-col items-center text-center py-10 sm:py-14 mb-4">

            {/* Eyebrow text */}
            <div className="relative overflow-hidden h-2.5 w-20 bg-[#ede8e0] mb-5 rounded-sm">
              <div className="absolute inset-0 shimmer-gold" />
            </div>

            {/* Title */}
            <div className="relative overflow-hidden h-8 w-72 bg-[#e8e1d5] mb-2 rounded-sm">
              <div className="absolute inset-0 shimmer-gold" />
            </div>
            <div className="relative overflow-hidden h-8 w-48 bg-[#e8e1d5] mb-6 rounded-sm">
              <div className="absolute inset-0 shimmer-gold" />
            </div>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#C9A84C]/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30" />
              <div className="h-px w-12 bg-[#C9A84C]/20" />
            </div>

            {/* Gender filter pills */}
            <div className="flex gap-3 mb-4 flex-wrap justify-center">
              {['ALL', 'FEMALE', 'MALE', 'KIDS'].map((_, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden h-8 rounded-full bg-[#ede8e0]"
                  style={{ width: `${[64, 80, 64, 64][i]}px` }}
                >
                  <div className="absolute inset-0 shimmer-gold" style={{ animationDelay: `${i * 120}ms` }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Filter bar skeleton ── */}
          <div className="flex gap-3 mb-8">
            <div className="relative overflow-hidden h-11 w-52 bg-[#ede8e0]">
              <div className="absolute inset-0 shimmer-gold" />
            </div>
          </div>

          {/* ── Results count skeleton ── */}
          <div className="relative overflow-hidden h-3 w-28 bg-[#ede8e0] mb-6 rounded-sm">
            <div className="absolute inset-0 shimmer-gold" />
          </div>

          {/* ── Product grid skeleton ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <ShimmerCard key={i} delay={i * 60} />
            ))}
          </div>

          {/* ── Pagination skeleton ── */}
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden w-9 h-9 bg-[#ede8e0]">
                <div className="absolute inset-0 shimmer-gold" style={{ animationDelay: `${i * 100}ms` }} />
              </div>
            ))}
          </div>

        </section>
      </div>
    </>
  );
}
