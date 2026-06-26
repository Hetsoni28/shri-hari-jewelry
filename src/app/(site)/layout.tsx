'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import WhatsAppFloatingCTA from "@/components/molecules/WhatsAppFloatingCTA";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <WishlistProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            className="flex-grow w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppFloatingCTA />
      </div>
    </WishlistProvider>
  );
}
