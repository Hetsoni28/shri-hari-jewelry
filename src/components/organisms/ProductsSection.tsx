import Image from 'next/image';
import Link from 'next/link';

export default function ProductsSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-headline text-2xl md:text-3xl font-bold text-[var(--foreground)]">Explore Products</h2>
        <Link href="/catalog" className="text-label text-sm uppercase tracking-wider text-[var(--color-primary)] hover:underline hidden sm:block">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Product 1 */}
        <div className="group cursor-pointer">
          <div className="relative aspect-square mb-4 bg-white border border-[var(--color-secondary)]/20 overflow-hidden">
            <Image 
              src="/images/gold_bangle_1780906267820.png" 
              alt="22k Gold Bangle" 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-body text-lg font-semibold text-[var(--foreground)]">22k Gold Bangle</h3>
          <p className="text-label text-[var(--color-secondary)] text-sm mb-2">Bangles & Bracelets</p>
          <Link href="/catalog/gold-bangle" className="text-label text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider hover:underline">
            Discover &rarr;
          </Link>
        </div>

        {/* Product 2 */}
        <div className="group cursor-pointer">
          <div className="relative aspect-square mb-4 bg-white border border-[var(--color-secondary)]/20 overflow-hidden">
            <Image 
              src="/images/rings_set_1780906280792.png" 
              alt="Gold Ring Set" 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-body text-lg font-semibold text-[var(--foreground)]">Gold Ring Set</h3>
          <p className="text-label text-[var(--color-secondary)] text-sm mb-2">Rings Collection</p>
          <Link href="/catalog/ring-set" className="text-label text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider hover:underline">
            Discover &rarr;
          </Link>
        </div>

        {/* Product 3 */}
        <div className="group cursor-pointer">
          <div className="relative aspect-square mb-4 bg-white border border-[var(--color-secondary)]/20 overflow-hidden">
            <Image 
              src="/images/diamond_ring_1780906292808.png" 
              alt="Diamond Solitaire Ring" 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-body text-lg font-semibold text-[var(--foreground)]">Diamond Solitaire</h3>
          <p className="text-label text-[var(--color-secondary)] text-sm mb-2">Diamond Rings</p>
          <Link href="/catalog/diamond-solitaire" className="text-label text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider hover:underline">
            Discover &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
