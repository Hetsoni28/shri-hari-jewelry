import Link from 'next/link';

export const metadata = { title: 'Piece not available', robots: { index: false, follow: true } };

// A product link that no longer exists (sold, renamed or removed)
export default function ProductNotFound() {
  return (
    <section className="flex flex-col items-center justify-center bg-[#FDFCFA] px-5 py-24 text-center sm:py-32" aria-labelledby="pnf-title">
      <div className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A74D] to-transparent" aria-hidden="true" />
      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8A6D25]">Piece not available</p>
      <h1 id="pnf-title" className="mt-4 max-w-xl font-headline text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-[#1C1726]">
        This piece is no longer in the catalogue
      </h1>
      <p className="mt-4 max-w-md font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
        It may have been sold or renamed. Browse similar designs — or ask us to make one for you.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/catalog"
          className="inline-flex min-h-[48px] items-center justify-center bg-[#1C1726] px-8 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8069BF]"
        >
          Browse the catalogue
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-[48px] items-center justify-center border border-[#1C1726] px-8 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1C1726] transition-colors hover:bg-[#1C1726] hover:text-white"
        >
          Ask for a custom piece
        </Link>
      </div>
    </section>
  );
}
