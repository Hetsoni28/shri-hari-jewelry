// Skeleton for catalog-download page
export default function CatalogDownloadLoading() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen animate-pulse">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="h-8 bg-gray-200 rounded w-56 mx-auto mb-4" />
        <div className="h-3 bg-gray-100 rounded w-80 mx-auto mb-12" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-8 border border-gray-100 p-6 rounded">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
            <div className="flex gap-3 flex-wrap">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-9 bg-gray-100 rounded w-24" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
