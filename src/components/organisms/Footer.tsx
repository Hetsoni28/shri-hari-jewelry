import Link from 'next/link';
import { shopInfo } from '@/data/shopInfo';

const { address } = shopInfo;

const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${shopInfo.name}, ${address.line1}, ${address.city}, ${address.taluka_district}, ${address.state}`,
)}`;
const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Namaste! I was looking at your website and would like to know more about your jewellery.',
)}`;

// Values match the catalogue's URL filters
const SHOP = [
  { label: 'Rings', href: '/catalog?category=rings' },
  { label: 'Mala', href: '/catalog?category=mala' },
  { label: 'Earrings', href: '/catalog?category=earrings' },
  { label: 'Sets', href: '/catalog?category=set' },
  { label: 'Necklaces', href: '/catalog?category=necklaces' },
  { label: 'Mangalsutra', href: '/catalog?category=mangalsutra' },
  { label: 'Bracelets', href: '/catalog?category=bracelet' },
  { label: 'Pendants', href: '/catalog?category=pendants' },
];

const EXPLORE = [
  { label: 'Full catalogue', href: '/catalog' },
  { label: 'Gold jewellery', href: '/catalog?metal=Gold' },
  { label: 'Silver jewellery', href: '/catalog?metal=Silver' },
  { label: 'Collections', href: '/collections' },
  { label: 'PDF catalogue', href: '/catalog-download' },
  { label: 'Wishlist', href: '/wishlist' },
];

const PROMISES = ['BIS hallmarked gold', 'Made to order in our workshop', "Priced on the day's gold rate"];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C9A74D]">{children}</h3>
  );
}

const linkCls = 'font-body text-[15px] text-white/70 transition-colors hover:text-white';

export default function Footer() {
  return (
    <footer className="bg-[#231B36] text-white">
      {/* ── Promises ── */}
      <div className="border-b border-white/10">
        <ul className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:px-8 lg:px-12">
          {PROMISES.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A74D]" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Main ── */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-x-10 lg:px-12 lg:py-20">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex flex-col" aria-label={`${shopInfo.name} — home`}>
            <span className="text-[30px] font-bold leading-tight text-white">શ્રી હરિ જ્વેલર્સ</span>
            <span className="mt-1.5 font-label text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C9A74D]">
              Shree Hari Jewellers · {shopInfo.subtitle.replace(/[()]/g, '')}
            </span>
          </Link>
          <p className="mt-6 max-w-sm font-body text-[15px] leading-[1.75] text-white/65">
            Gold and silver jewellery, handcrafted by our family in {address.city} since 2001 — and made to
            order whenever you want a piece of your own.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 border border-[#C9A74D]/70 px-5 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#C9A74D] hover:text-[#231B36]"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Shop */}
        <nav className="lg:col-span-2" aria-label="Shop by piece">
          <Heading>Shop</Heading>
          <ul className="mt-5 space-y-3">
            {SHOP.map((l) => (
              <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Explore */}
        <nav className="lg:col-span-2" aria-label="Explore">
          <Heading>Explore</Heading>
          <ul className="mt-5 space-y-3">
            {EXPLORE.map((l) => (
              <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Visit & call */}
        <div className="col-span-2 grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-8">
          <div>
            <Heading>Visit the shop</Heading>
            <address className="mt-5 font-body text-[15px] not-italic leading-[1.75] text-white/70">
              {address.line1}, {address.line2},<br />
              {address.city}, {address.taluka_district}, {address.state}
            </address>
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 border-b border-[#C9A74D]/60 pb-0.5 font-label text-[12px] font-semibold text-white transition-colors hover:border-white"
            >
              Get directions →
            </a>
          </div>
          <div>
            <Heading>Call us</Heading>
            <ul className="mt-5 space-y-2">
              {[shopInfo.phone1, shopInfo.phone2].map((ph) => (
                <li key={ph}>
                  <a href={`tel:${ph.replace(/\s+/g, '')}`} className="font-body text-[16px] tabular-nums text-white transition-colors hover:text-[#E8C766]">
                    {ph}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom line ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 font-label text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
          <p>Proprietor: {shopInfo.owner}</p>
          <p>
            Designed &amp; developed by{' '}
            <a
              href="https://www.hntech.in/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-white/75 underline-offset-4 transition-colors hover:text-[#E8C766] hover:underline"
            >
              HN Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
