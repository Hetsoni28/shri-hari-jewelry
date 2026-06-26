export default function CollectionsHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-headline text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
        Our Collections
      </h1>
      <div className="h-[1px] w-16 bg-[var(--color-primary)] mb-8"></div>
      <p className="text-body text-[var(--color-neutral)] text-sm md:text-base leading-relaxed">
        For four decades, Shri Hari Jewellers has stood as a beacon of artisanal excellence in Mogar, Anand. Our legacy is woven into every gram of gold and every facet of silver, preserving the timeless traditions of Indian craftsmanship for generations of families.
      </p>
    </div>
  );
}
