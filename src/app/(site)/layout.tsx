'use client';

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import WhatsAppFloatingCTA from "@/components/molecules/WhatsAppFloatingCTA";
import NavigationProgress from "@/components/molecules/NavigationProgress";
import GoldRateWidget from "@/components/organisms/GoldRateWidget";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      {/* Gold top progress bar — appears immediately on every link click */}
      <NavigationProgress />
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        {/*
          NO AnimatePresence / opacity transition here.
          Reason: AnimatePresence mode="sync" caused BOTH old + new pages to
          render simultaneously at opacity=0, revealing the black html background
          → blank/black screen on every navigation.
          The loading.tsx skeleton for each route handles the visual transition
          while the server fetches data. The gold top bar gives instant feedback.
        */}
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingCTA />
        <GoldRateWidget />
      </div>
    </WishlistProvider>
  );
}
