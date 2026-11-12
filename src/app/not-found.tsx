import Link from 'next/link';
import { shopInfo } from '@/data/shopInfo';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-24 bg-[#FDFCFA]">
      {/* Gold accent hairline */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-8" />

      <p className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#C9A84C] mb-4">
        Error 404
      </p>
      <h1 className="font-headline text-3xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
        This piece is not in our collection
      </h1>
      <p className="text-sm sm:text-base text-[#79767D] max-w-md mb-10">
        The page you are looking for may have moved or no longer exists.
        Explore our catalogue to find something precious.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/catalog"
          className="inline-flex justify-center items-center px-8 py-3 bg-[#C9A84C] text-white text-xs font-bold uppercase tracking-widest hover:brightness-90 transition"
        >
          Explore Catalogue
        </Link>
        <Link
          href="/"
          className="inline-flex justify-center items-center px-8 py-3 border border-[#8069BF]/30 text-[#8069BF] text-xs font-bold uppercase tracking-widest hover:border-[#C9A84C] hover:text-[#C9A84C] transition"
        >
          Back to Home
        </Link>
      </div>

      <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-[#9E9AAA]">
        {shopInfo.name} · {shopInfo.address.city}, {shopInfo.address.taluka_district}
      </p>
    </main>
  );
}
