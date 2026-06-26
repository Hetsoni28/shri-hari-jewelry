export default function ProductInfo({ product }: { product: { category?: string; subcategory?: string; name: string; description?: string } }) {
  return (
    <div className="flex flex-col mb-8">

      {/* Eyebrow — category + subcategory */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C9A84C]">
          {product.category}
        </span>
        {product.subcategory && (
          <>
            <span className="text-[#C9A84C]/40 text-xs">·</span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
              {product.subcategory}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-headline text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {product.name}
      </h1>

      {/* Gold divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/60 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <div className="h-px w-8 bg-[#C9A84C]/40" />
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-body text-sm text-[var(--color-neutral)] leading-relaxed mb-8">
          {product.description}
        </p>
      )}

      {/* Spec row */}
      <div className="border-t border-[#C9A84C]/15 pt-6 mb-8">
        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-y-5 gap-x-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-1">CATEGORY</span>
            <span className="text-body text-sm text-[var(--foreground)] font-medium">{product.category || '—'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-1">COLLECTION</span>
            <span className="text-body text-sm text-[var(--foreground)] font-medium">{product.subcategory || '—'}</span>
          </div>
        </div>
      </div>

      {/* Inquiry Notice */}
      <div className="border border-[#C9A84C]/25 bg-[#C9A84C]/5 p-4 mb-2 flex items-start gap-3">
        {/* WhatsApp icon */}
        <svg className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <div>
          <h4 className="text-[var(--foreground)] font-bold text-xs mb-1 uppercase tracking-wider">Interested in this piece?</h4>
          <p className="text-[var(--color-neutral)] text-xs leading-relaxed">
            For exact weight, purity, and live pricing — reach out to us on WhatsApp with the product name.
          </p>
        </div>
      </div>
    </div>
  );
}
