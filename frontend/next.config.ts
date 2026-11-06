import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost" }],
  },
  async rewrites() {
    return [
      {
        source: "/api/php/:path*",
        // Append .php so Apache serves the actual PHP file (bypasses .htaccess requirement)
        destination: "http://localhost/qualitas-rebuild/backend/api/:path*.php",
      },
    ];
  },
};

export default nextConfig;