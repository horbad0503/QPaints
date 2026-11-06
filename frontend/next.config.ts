import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.ugwuuvuoma.com" }],
  },
  async rewrites() {
    // Only used locally (production calls API directly via NEXT_PUBLIC_API_URL)
    if (process.env.NEXT_PUBLIC_API_URL) return [];
    return [
      {
        source: "/api/php/:path*",
        destination: "http://localhost/qualitas-rebuild/backend/api/:path*.php",
      },
    ];
  },
};

export default nextConfig;