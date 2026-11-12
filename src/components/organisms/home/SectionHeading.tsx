import Link from 'next/link';

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className={className}>
      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A6D25] ${className}`}>
      <span className="h-px w-8 bg-[#C9A74D]" aria-hidden="true" />
      {children}
    </p>
  );
}

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  link?: { href: string; label: string };
};

// Shared opener for every home section — same eyebrow + serif voice as the hero
export default function SectionHeading({ eyebrow, title, intro, link }: Props) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-headline text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.015em] text-[#1C1726]">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-xl font-body text-[16px] leading-[1.7] text-[#5F5A6B]">{intro}</p>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2.5 self-start border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726] sm:self-auto"
        >
          {link.label}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
