// Shown instantly while a product loads — mirrors the real layout so nothing jumps
export default function ProductLoading() {
  return (
    <div className="animate-pulse bg-[#FDFCFA]" aria-busy="true" aria-label="Loading the piece">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
          <div className="w-full lg:w-[min(56%,calc((100svh-10rem)*0.8))] lg:shrink-0">
            <div className="mx-auto aspect-[4/5] w-full max-w-[min(100%,calc((100svh-10rem)*0.8))] bg-[#F3EFE6]" />
          </div>
          <div className="w-full min-w-0 lg:max-w-[480px] lg:flex-1">
            <div className="h-3 w-32 bg-[#EFE9DC]" />
            <div className="mt-7 h-3 w-28 bg-[#EFE9DC]" />
            <div className="mt-3 h-9 w-full bg-[#EFE9DC]" />
            <div className="mt-2 h-9 w-2/3 bg-[#EFE9DC]" />
            <div className="mt-7 h-12 w-full bg-[#E4DEEE]" />
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <div className="h-11 bg-[#F3EFE6]" />
              <div className="h-11 bg-[#F3EFE6]" />
            </div>
            <div className="mt-10 space-y-3">
              <div className="h-4 w-full bg-[#F3EFE6]" />
              <div className="h-4 w-full bg-[#F3EFE6]" />
              <div className="h-4 w-4/5 bg-[#F3EFE6]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
