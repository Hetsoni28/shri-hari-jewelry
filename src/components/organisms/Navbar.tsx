'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { shopInfo } from '@/data/shopInfo';
import { useWishlist } from '@/context/WishlistContext';
import { useMetalRates } from '@/hooks/useMetalRates';

const EASE = [0.22, 1, 0.36, 1] as const;

// Values match the catalogue's URL filters
const SHOP = {
  pieces: [
    { label: 'Rings', href: '/catalog?category=rings' },
    { label: 'Mala', href: '/catalog?category=mala' },
    { label: 'Earrings', href: '/catalog?category=earrings' },
    { label: 'Sets', href: '/catalog?category=set' },
    { label: 'Necklaces', href: '/catalog?category=necklaces' },
    { label: 'Mangalsutra', href: '/catalog?category=mangalsutra' },
    { label: 'Bracelets', href: '/catalog?category=bracelet' },
    { label: 'Pendants', href: '/catalog?category=pendants' },
  ],
  metals: [
    { label: 'Gold jewellery', href: '/catalog?metal=Gold' },
    { label: 'Silver jewellery', href: '/catalog?metal=Silver' },
  ],
  for: [
    { label: 'For women', href: '/catalog?gender=Women' },
    { label: 'For men', href: '/catalog?gender=Men' },
  ],
};

const LINKS = [
  { href: '/catalog', label: 'Catalogue', mega: true },
  { href: '/collections', label: 'Collections' },
  { href: '/contact', label: 'Visit us' },
];

const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Namaste! I was looking at your website and would like to know more about your jewellery.',
)}`;
const TEL = `tel:${shopInfo.phone1.replace(/\s+/g, '')}`;

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Rates() {
  const rates = useMetalRates();
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  if (!rates) return <span className="text-white/50">Today&apos;s gold rate…</span>;
  return (
    <span className="flex items-center gap-2 tabular-nums">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      <span className="text-white/60">{rates.source === 'shop' ? "Today's rate" : 'Market est.'}</span>
      <span>22KT {fmt(rates.gold22)}/g</span>
      <span className="hidden text-white/30 sm:inline">·</span>
      <span className="hidden sm:inline">24KT {fmt(rates.gold24)}/g</span>
      <span className="hidden text-white/30 md:inline">·</span>
      <span className="hidden md:inline">Silver {fmt(rates.silver)}/g</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus whenever the page changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setDrawerOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Drawer: lock page scroll; Esc closes any open menu
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  // Hover intent: small delay before closing so moving into the panel doesn't flicker
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const iconBtn = 'relative flex h-10 w-10 items-center justify-center text-[#1C1726] transition-colors hover:text-[#8069BF]';

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-500 ${
          scrolled ? 'shadow-[0_8px_30px_-18px_rgba(28,23,38,0.35)]' : ''
        }`}
        onMouseLeave={closeMega}
      >
        {/* ── Rate bar — folds away on scroll ── */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden bg-[#2A2142] font-label text-[11px] text-white sm:text-[12px]"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 py-2 sm:justify-between sm:px-8 lg:px-12">
            <Rates />
            <span className="hidden items-center gap-5 text-white/75 sm:flex">
              <span>
                {shopInfo.address.city}, {shopInfo.address.taluka_district}
              </span>
              <a href={TEL} className="tabular-nums text-white transition-colors hover:text-[#E8C766]">
                {shopInfo.phone1}
              </a>
            </span>
          </div>
        </motion.div>

        {/* ── Main bar ── */}
        <div className="border-b border-[#EFE9DC]">
          <div
            className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 transition-[padding] duration-500 sm:px-8 lg:px-12 ${
              scrolled ? 'py-2' : 'py-3.5'
            }`}
          >
            {/* Left — navigation (desktop) / menu button (mobile) */}
            <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
              {LINKS.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onMouseEnter={l.mega ? openMega : () => setMegaOpen(false)}
                    onFocus={l.mega ? openMega : undefined}
                    aria-expanded={l.mega ? megaOpen : undefined}
                    aria-haspopup={l.mega ? 'true' : undefined}
                    className={`group relative py-2 font-label text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                      active ? 'text-[#1C1726]' : 'text-[#5F5A6B] hover:text-[#1C1726]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {l.label}
                      {l.mega && (
                        <svg width="9" height="6" viewBox="0 0 10 6" aria-hidden="true" className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}>
                          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[#C9A74D] transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className={`${iconBtn} -ml-2 lg:hidden`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 7h18M3 12h12M3 17h18" />
              </svg>
            </button>

            {/* Centre — the wordmark (the welcome animation lands its name on data-brand-name) */}
            <Link href="/" aria-label={`${shopInfo.name} — home`} className="justify-self-center">
              <motion.span
                className="flex origin-center flex-col items-center leading-none"
                animate={{ scale: scrolled ? 0.88 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span data-brand-name className="text-[21px] font-bold leading-tight text-[#1C1726] sm:text-[26px]">
                  શ્રી હરિ જ્વેલર્સ
                </span>
                <span className="mt-1 font-label text-[9px] font-semibold uppercase tracking-[0.36em] text-[#A8873A] sm:text-[10px]">
                  Shree Hari Jewellers
                </span>
              </motion.span>
            </Link>

            {/* Right — actions */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <Link href="/catalog-download" aria-label="Download the PDF catalogue" title="PDF catalogue" className={`${iconBtn} hidden sm:flex`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M12 11v6m-3-3l3 3 3-3" />
                </svg>
              </Link>
              <Link href="/wishlist" aria-label={`Wishlist${items.length ? `, ${items.length} saved` : ''}`} className={iconBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.4 3.5 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" />
                </svg>
                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8069BF] px-1 font-label text-[9px] font-bold text-white"
                    >
                      {items.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hidden items-center gap-2 border border-[#1C1726] px-4 py-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1726] transition-colors duration-300 hover:bg-[#1C1726] hover:text-white md:flex"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Catalogue mega menu (desktop) ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden border-b border-[#EFE9DC] bg-white shadow-[0_30px_60px_-40px_rgba(28,23,38,0.4)] lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-12 py-10">
                <div className="col-span-5">
                  <p className="font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8873A]">Shop by piece</p>
                  <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
                    {SHOP.pieces.map((p) => (
                      <li key={p.href}>
                        <Link href={p.href} className="font-headline text-[18px] text-[#1C1726] transition-colors hover:text-[#8069BF]">
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/catalog" className="mt-6 inline-flex items-center gap-2 border-b border-[#C9A74D]/70 pb-0.5 font-label text-[12px] font-semibold text-[#1C1726] hover:border-[#1C1726]">
                    View the full catalogue →
                  </Link>
                </div>
                <div className="col-span-3 space-y-8">
                  {[
                    ['By metal', SHOP.metals],
                    ['For', SHOP.for],
                  ].map(([title, links]) => (
                    <div key={title as string}>
                      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8873A]">{title as string}</p>
                      <ul className="mt-4 space-y-2.5">
                        {(links as { label: string; href: string }[]).map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="font-body text-[15px] text-[#5F5A6B] transition-colors hover:text-[#1C1726]">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-span-4">
                  <div className="h-full bg-[#F7F5FA] p-7">
                    <p className="font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8873A]">Made to order</p>
                    <p className="mt-3 font-headline text-[22px] leading-snug text-[#1C1726]">
                      Can&apos;t find it? <em className="font-normal italic text-[#8069BF]">We&apos;ll make it.</em>
                    </p>
                    <p className="mt-2 font-body text-[14px] leading-[1.65] text-[#5F5A6B]">
                      Send a photo or describe the piece — we&apos;ll talk you through weight, purity and price.
                    </p>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 bg-[#1C1726] px-5 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8069BF]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[90] bg-[#1C1726]/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 left-0 z-[95] flex w-[88vw] max-w-sm flex-col bg-white lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-[#EFE9DC] px-5 py-4">
                <Link href="/" className="flex flex-col leading-none" onClick={() => setDrawerOpen(false)}>
                  <span className="text-[19px] font-bold leading-tight text-[#1C1726]">શ્રી હરિ જ્વેલર્સ</span>
                  <span className="mt-1 font-label text-[9px] font-semibold uppercase tracking-[0.32em] text-[#A8873A]">Shree Hari Jewellers</span>
                </Link>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className={iconBtn}>
                  <svg width="18" height="18" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <p className="font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8873A]">Shop by piece</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  {SHOP.pieces.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="font-headline text-[17px] text-[#1C1726]">{p.label}</Link>
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 border-t border-[#EFE9DC]">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/catalog', label: 'Full catalogue' },
                    { href: '/collections', label: 'Collections' },
                    { href: '/wishlist', label: `Wishlist${items.length ? ` (${items.length})` : ''}` },
                    { href: '/catalog-download', label: 'PDF catalogue' },
                    { href: '/contact', label: 'Visit us' },
                  ].map((l) => (
                    <li key={l.href} className="border-b border-[#EFE9DC]">
                      <Link
                        href={l.href}
                        className={`flex items-center justify-between py-4 font-label text-[13px] font-semibold uppercase tracking-[0.16em] ${
                          isActive(pathname, l.href) ? 'text-[#8069BF]' : 'text-[#1C1726]'
                        }`}
                      >
                        {l.label}
                        <span aria-hidden="true" className="text-[#C9BFA6]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 font-body text-[14px] leading-[1.7] text-[#5F5A6B]">
                  <p className="font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A8873A]">Visit the shop</p>
                  <p className="mt-2">
                    {shopInfo.address.line1}, {shopInfo.address.line2},<br />
                    {shopInfo.address.city}, {shopInfo.address.taluka_district}
                  </p>
                  <a href={TEL} className="mt-2 block font-semibold tabular-nums text-[#1C1726]">{shopInfo.phone1}</a>
                </div>
              </div>

              <div className="border-t border-[#EFE9DC] p-5">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 bg-[#1C1726] py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
