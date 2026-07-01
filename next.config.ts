import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // ─── Dev origins (tunnel / local network support) ──────────────────────────
  allowedDevOrigins: [
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1:3000",
    "192.168.1.10",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.ngrok-free.app",
    "*.loca.lt",
    "*.serveo.net",
    "*.gitpod.io",
    "*.app.github.dev",
    "*.csb.app",
  ],

  // ─── World-class image optimization ────────────────────────────────────────
  images: {
    // In local dev, Sanity CDN resolves to a NAT64 private IP which blocks
    // Next.js image proxy. Setting unoptimized=true in dev serves images
    // directly from Sanity CDN (already globally optimized). Production on
    // Vercel uses full Next.js optimization pipeline — no trade-off.
    unoptimized: isDev,

    // All quality levels used across the codebase
    qualities: [75, 85, 90, 95],

    // Responsive breakpoints tuned for jewelry grid:
    //   mobile 2-col → ~200px, tablet 3-col → ~300px,
    //   desktop 4–6 col → 400–600px, full-width hero → 1080–1920px
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes:  [24, 48, 96, 128, 200, 300, 400, 600],

    // Cache optimized images for 30 days on the CDN edge
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Allow images from Sanity CDN and Unsplash
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // Use modern AVIF then WebP — smallest file size, best quality
    formats: ["image/avif", "image/webp"],
  },

  // ─── Production hardening ───────────────────────────────────────────────────
  compress: true,          // Gzip/Brotli all responses
  poweredByHeader: false,  // Don't expose "X-Powered-By: Next.js"
};

export default nextConfig;
