import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow connection from common tunnel services and proxies
  // Add your specific URL here if you still see the error
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
    "*.csb.app"
  ],
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
