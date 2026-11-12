import type { Metadata } from "next";
import "./globals.css";
import { shopInfo } from "@/data/shopInfo";
import LuxuryLoader from "@/components/loading/LuxuryLoader";

export const metadata: Metadata = {
  metadataBase: new URL('https://shri-hari-jewellers-eta.vercel.app'),
  title: {
    default: `${shopInfo.name} | ${shopInfo.services[0]}`,
    template: `%s | ${shopInfo.name}`,
  },
  description: `${shopInfo.name} ${shopInfo.subtitle} - ${shopInfo.services.join(', ')}. Located at ${shopInfo.address.city}.`,
  openGraph: {
    title: `${shopInfo.name} | ${shopInfo.services[0]}`,
    description: `${shopInfo.name} ${shopInfo.subtitle} - ${shopInfo.services.join(', ')}. Located at ${shopInfo.address.city}.`,
    url: 'https://shri-hari-jewellers-eta.vercel.app',
    siteName: shopInfo.name,
    images: [
      {
        url: 'https://shri-hari-jewellers-eta.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${shopInfo.name} - Gold & Silver Jewellers`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${shopInfo.name} | ${shopInfo.services[0]}`,
    description: `${shopInfo.name} ${shopInfo.subtitle} - ${shopInfo.services.join(', ')}. Located at ${shopInfo.address.city}.`,
    images: ['https://shri-hari-jewellers-eta.vercel.app/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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

