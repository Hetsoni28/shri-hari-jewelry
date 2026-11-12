// Server component: only the pieces that need the browser (navbar, wishlist, widgets)
// ship JavaScript — the footer and this wrapper render as plain HTML.
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
      {/* Keyboard users can jump straight past the navigation */}
      <a
        href="#main"
        className="sr-only z-[10000] bg-[#1C1726] px-5 py-3 font-label text-[13px] font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
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
        <main id="main" tabIndex={-1} className="flex-grow w-full focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingCTA />
        <GoldRateWidget />
      </div>
    </WishlistProvider>
  );
}
