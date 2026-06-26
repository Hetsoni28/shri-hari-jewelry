import Link from 'next/link';

export default function ProductBreadcrumb({ product }: { product: { category?: string; name?: string } }) {
  const categoryHref = product.category
    ? `/catalog?category=${encodeURIComponent(product.category)}`
    : '/catalog';

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold mb-8 flex-wrap">

      {/* ← Back to Catalog */}
      <Link
        href="/catalog"
        className="text-secondary hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-1.5 group"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          className="group-hover:-translate-x-1 transition-transform duration-300">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Catalog
      </Link>

      <span className="text-[#C9A84C]/40">·</span>

      {/* Category — links back to catalog pre-filtered */}
      {product.category && (
        <>
          <Link
            href={categoryHref}
            className="text-[#C9A84C] hover:text-[#a8883a] transition-colors duration-300"
          >
            {product.category}
          </Link>
          <span className="text-[#C9A84C]/40">·</span>
        </>
      )}

      {/* Current product — not a link */}
      <span className="text-[var(--foreground)] font-normal normal-case tracking-normal text-[11px] truncate max-w-[200px]">
        {product.name}
      </span>
    </nav>
  );
}
