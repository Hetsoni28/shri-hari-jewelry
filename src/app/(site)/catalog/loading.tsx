// Shown instantly while the catalogue loads — mirrors the real layout so nothing jumps
export default function CatalogLoading() {
  return (
    <div className="animate-pulse bg-[#FDFCFA]" aria-busy="true" aria-label="Loading the catalogue">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <div className="h-3 w-40 bg-[#EFE9DC]" />
        <div className="mt-6 h-12 w-full max-w-lg bg-[#EFE9DC]" />
        <div className="mt-6 h-4 w-full max-w-xl bg-[#F3EFE6]" />
        <div className="mt-2 h-4 w-2/3 max-w-md bg-[#F3EFE6]" />
      </div>

      <div className="border-y border-[#EFE9DC] bg-white">
        <div className="mx-auto flex max-w-7xl gap-9 px-5 py-5 sm:px-8 lg:px-12">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 w-16 shrink-0 bg-[#F3EFE6]" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-[4.5rem] sm:px-8 lg:px-12">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i}>
              <div className="aspect-[4/5] bg-[#F3EFE6]" />
              <div className="mt-4 h-2.5 w-24 bg-[#EFE9DC]" />
              <div className="mt-2.5 h-4 w-4/5 bg-[#EFE9DC]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
