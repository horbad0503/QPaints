import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    // Allow images from your cPanel domain
    remotePatterns: [{ protocol: "https", hostname: "www.ugwuuvuoma.com" }],
  },
  async rewrites() {
    return [
      {
        source: "/api/php/:path*",
        // 1. Point to your cPanel folder
        // 2. Append .php because the file is a PHP script
        destination: "https://www.ugwuuvuoma.com/qualitas-api/api/:path*.php",
      },
    ];
  },
};

export default nextConfig;