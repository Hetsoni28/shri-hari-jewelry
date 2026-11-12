import type { Metadata, Viewport } from "next";
import "./globals.css";
import { shopInfo } from "@/data/shopInfo";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import LuxuryLoader from "@/components/loading/LuxuryLoader";

const DEFAULT_TITLE = `${SITE_NAME} | Gold & Silver Jewellery in Mogar, Anand`;
const DEFAULT_DESCRIPTION =
  'Handcrafted gold and silver jewellery by Shri Hari Jewellers (Padrawala), Mogar, Anand. BIS hallmarked gold rings, mala, sets and made-to-order pieces.';

// Site-wide defaults — every page overrides title, description and canonical (see lib/seo.ts)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'jewellers in Mogar', 'jewellery shop Anand', 'gold jewellery Anand', 'BIS hallmarked gold',
    'gold mangalsutra', 'gold mala', 'silver jewellery', 'custom jewellery Gujarat', 'Shri Hari Jewellers Padrawala',
  ],
  authors: [{ name: shopInfo.owner }],
  creator: SITE_NAME,
  category: 'shopping',
  // (no site-wide canonical: each page sets its own, so error pages don't claim the home URL)
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} – gold and silver jewellery, Mogar` }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Google Search Console: set GOOGLE_SITE_VERIFICATION on Vercel to the code Google gives you
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      // the inline script below may add data-welcome before React hydrates
      suppressHydrationWarning
    >
      <head>
        {/* Welcome animation plays once per session: mark repeat visits before first
            paint so the overlay is hidden by CSS and never flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('sh_welcome_seen'))document.documentElement.dataset.welcome='seen'}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)] font-body">
        {/* Welcome animation — first page load of each visit */}
        <LuxuryLoader />
        {children}
      </body>
    </html>
  );
}

