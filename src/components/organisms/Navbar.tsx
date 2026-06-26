'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { shopInfo } from '@/data/shopInfo';
import Logo from '@/components/atoms/Logo';
import { useWishlist } from '@/context/WishlistContext';
import { drawerVariant, backdropVariant, fastStaggerContainer, fadeUpVariant, fadeDownVariant, luxuryEasing, durations } from '@/lib/animations';

const navLinks = [
  { href: '/',                 label: 'Home' },
  { href: '/catalog',          label: 'Catalog' },
  { href: '/collections',      label: 'Collections' },
  { href: '/contact',          label: 'Contact' },
  { href: '/catalog-download', label: 'Download' },
  { href: '/wishlist',         label: 'Wishlist' },
];

const desktopLinks = navLinks.slice(0, 4); // Home, Catalog, Collections, Contact

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useWishlist();

  const isHomePage    = pathname === '/';
  const isContactPage = pathname === '/contact';
  const isTransparent = (isHomePage || isContactPage) && !isScrolled;

  // Close menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname, setIsMobileMenuOpen]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ─── Navbar Header ─── */}
      <header
        className={`${isHomePage || isContactPage ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50`}
      >
        {/* Glass background — fades in on scroll */}
        <motion.div
          className="absolute inset-0 bg-white/96 backdrop-blur-md border-b border-[var(--color-secondary)]/15 -z-10 pointer-events-none"
          initial={false}
          animate={{
            opacity: isTransparent ? 0 : 1,
            boxShadow: isTransparent
              ? '0 0 0 rgba(0,0,0,0)'
              : '0 2px 24px -4px rgba(128,105,191,0.08)',
          }}
          transition={{ duration: durations.standard, ease: luxuryEasing.standard }}
        />

        {/* Inner container — height compresses on scroll */}
        <motion.div
          className="container relative z-10 mx-auto px-4 flex justify-between items-center"
          animate={{ paddingTop: isScrolled ? '0.6rem' : '1rem', paddingBottom: isScrolled ? '0.6rem' : '1rem' }}
          transition={{ duration: 0.4, ease: luxuryEasing.standard }}
        >
          {/* Logo — gentle fade down on mount */}
          <motion.div
            variants={fadeDownVariant}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className={`hover:opacity-80 transition-opacity duration-300 ${isTransparent ? 'text-white' : ''}`}>
              <Logo width={54} height={54} theme={isTransparent ? 'monochrome' : 'light'} />
            </Link>
          </motion.div>

          {/* Desktop Nav — with animated active underline */}
          <nav className={`hidden md:flex items-center space-x-8 text-label font-medium transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-[var(--foreground)]'}`}>
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 group ${
                    isActive
                      ? isTransparent ? 'text-[#C9A84C]' : 'text-[var(--color-tertiary)]'
                      : isTransparent ? 'text-white/90 hover:text-white' : 'text-[var(--foreground)] hover:text-[var(--color-tertiary)]'
                  }`}
                >
                  {link.label}
                  {/* Animated gold underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] origin-left"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: luxuryEasing.reveal }}
                  />
                  {/* Hover underline (non-active) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-tertiary)]/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* PDF Download */}
            <Link
              href="/catalog-download"
              className={`hover:text-[var(--color-tertiary)] transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-[var(--color-primary)]'}`}
              aria-label="Download PDF Catalog"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"
                whileHover={{ y: 1.5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.92 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </motion.svg>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`relative hover:text-[var(--color-tertiary)] transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-[var(--color-primary)]'}`}
              aria-label="Wishlist"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.92 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </motion.svg>
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute -top-1.5 -right-2 bg-[var(--color-tertiary)] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center"
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* WhatsApp (desktop) */}
            <motion.a
              href={`https://wa.me/${shopInfo.phone2.replace(/\s+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-[var(--color-tertiary)] text-white items-center gap-2 py-2.5 px-5 text-[11px] font-bold tracking-[0.15em] uppercase shadow-md"
              whileHover={{ filter: 'brightness(0.9)', y: -1, boxShadow: '0 8px 24px -6px rgba(201,168,76,0.35)', transition: { duration: 0.22 } }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              WhatsApp
            </motion.a>

            {/* Hamburger — mobile only */}
            <motion.button
              type="button"
              className={`md:hidden flex items-center justify-center w-10 h-10 cursor-pointer transition-colors duration-300 ${isMobileMenuOpen ? 'text-[var(--color-primary)]' : isTransparent ? 'text-white' : 'text-[var(--foreground)]'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.svg key="close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg key="open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* ─── Mobile Sidebar ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              variants={backdropVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              key="mobile-drawer"
              variants={drawerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-[80vw] max-w-[320px] bg-white z-[95] md:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-secondary)]/20">
                <Logo width={40} height={40} theme="light" />
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[var(--color-primary)] p-1"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.88 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <motion.nav
                variants={fastStaggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col px-6 py-2 flex-1 overflow-y-auto"
              >
                {navLinks.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <motion.div key={item.href} variants={fadeUpVariant}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-4 border-b border-gray-100 text-[15px] font-semibold transition-colors ${
                          isActive ? 'text-[var(--color-tertiary)]' : 'text-[var(--color-primary)] hover:text-[var(--color-tertiary)]'
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* WhatsApp CTA */}
              <div className="px-6 py-6 border-t border-[var(--color-secondary)]/20">
                <motion.a
                  href={`https://wa.me/${shopInfo.phone2.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm"
                  whileHover={{ filter: 'brightness(0.9)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}