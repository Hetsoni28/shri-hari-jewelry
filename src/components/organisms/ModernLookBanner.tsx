import Link from 'next/link';

export default function ModernLookBanner() {
  return (
    <section className="container mx-auto px-4 py-8 mb-16">
      <div className="bg-[var(--color-primary)] text-white p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-tertiary)] opacity-10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-headline text-3xl md:text-5xl font-bold mb-4">
            Explore the<br />
            <span className="italic font-normal opacity-90">Full Catalog</span>
          </h2>
          <p className="text-body text-white/80 mb-8 text-sm md:text-base leading-relaxed">
            Elevate your style with our contemporary pieces designed for the modern trendsetter. Discover our complete collection of elegant designs and bold new styles that make a statement wherever you go.
          </p>
          <Link href="/catalog" className="inline-block bg-white text-[var(--color-primary)] font-label font-bold uppercase tracking-wider text-sm py-4 px-8 hover:bg-gray-100 transition-colors">
            View All Collections &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
