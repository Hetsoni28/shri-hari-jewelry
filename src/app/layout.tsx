import type { Metadata } from "next";
import "./globals.css";
import { shopInfo } from "@/data/shopInfo";
import LuxuryLoader from "@/components/loading/LuxuryLoader";

export const metadata: Metadata = {
  title: `${shopInfo.name} | ${shopInfo.services[0]}`,
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
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)] font-body">
        {/* Luxury loader — shows on every page load / refresh */}
        <LuxuryLoader />
        {children}
      </body>
    </html>
  );
}

