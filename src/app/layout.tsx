import type { Metadata } from "next";
import "./globals.css";
import { shopInfo } from "@/data/shopInfo";

export const metadata: Metadata = {
  title: `${shopInfo.name} | ${shopInfo.services[0]}`,
  description: `${shopInfo.name} ${shopInfo.subtitle} - ${shopInfo.services.join(', ')}. Located at ${shopInfo.address.city}.`,
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
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-body">
        {children}
      </body>
    </html>
  );
}
