import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesSection() {
  return (
    <section className="container mx-auto px-4 py-10 sm:py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-headline text-2xl md:text-3xl font-bold text-[var(--foreground)]">Discover Categories</h2>
          <p className="text-body text-[var(--color-secondary)] mt-2">Collections</p>
        </div>
        <Link href="/collections" className="text-label text-sm uppercase tracking-wider text-[var(--color-primary)] hover:underline hidden sm:block">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Category 1 */}
        <Link href="/collections/mens" className="relative group block h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden bg-black">
          <Image 
            src="/images/mens_chain_1780906231254.png" 
            alt="Mens Chain Collection" 
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <h3 className="text-headline text-white text-xl font-bold mb-1">MENS CHAIN</h3>
              <p className="text-label text-white/80 text-xs uppercase tracking-widest">Collection</p>
              <div className="h-px w-12 bg-[var(--color-tertiary)] mt-3"></div>
            </div>
          </div>
        </Link>

        {/* Category 2 */}
        <Link href="/collections/rings" className="relative group block h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden bg-black">
          <Image 
            src="/images/rings_collection_1780906243842.png" 
            alt="Rings Collection" 
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <h3 className="text-headline text-white text-xl font-bold mb-1">RINGS</h3>
              <p className="text-label text-white/80 text-xs uppercase tracking-widest">Collection</p>
              <div className="h-px w-12 bg-[var(--color-tertiary)] mt-3"></div>
            </div>
          </div>
        </Link>

        {/* Category 3 */}
        <Link href="/collections/bridal" className="relative group block h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden bg-black">
          <Image 
            src="/images/bridal_collection_1780906256760.png" 
            alt="Bridal Collection" 
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <h3 className="text-headline text-white text-xl font-bold mb-1">BRIDAL</h3>
              <p className="text-label text-white/80 text-xs uppercase tracking-widest">Collection</p>
              <div className="h-px w-12 bg-[var(--color-tertiary)] mt-3"></div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
