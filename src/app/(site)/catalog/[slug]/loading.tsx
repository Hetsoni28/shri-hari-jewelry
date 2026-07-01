// Skeleton for the product detail page — shown immediately on navigation
export default function ProductLoading() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen pt-12 animate-pulse">
      {/* Gold hairline */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {/* Breadcrumb skeleton */}
        <div className="h-3 bg-gray-100 rounded w-48 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image column */}
          <div className="flex flex-col gap-3">
            <div className="aspect-square bg-[#F5F0E8] rounded-sm w-full" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#EDE6D4] rounded-sm" />
              ))}
            </div>
          </div>

          {/* Info column */}
          <div className="flex flex-col pt-4">
            <div className="h-3 bg-gray-100 rounded w-20 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
            <div className="h-[1px] bg-gray-100 w-full mb-6" />
            <div className="space-y-2 mb-8">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="h-12 bg-[#C9A84C]/20 rounded-sm w-full mb-3" />
            <div className="h-10 bg-gray-100 rounded-sm w-full" />
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20">
          <div className="h-4 bg-gray-200 rounded w-40 mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="aspect-[4/5] bg-[#F5F0E8]" />
                <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
