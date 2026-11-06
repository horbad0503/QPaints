import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.ugwuuvuoma.com" }], // Update for cPanel images
  },
  async rewrites() {
    return [
      {
        source: "/api/php/:path*",
        // Point to your live cPanel folder
        destination: "https://www.ugwuuvuoma.com/qualitas-api/api/:path*",
      },
    ];
  },
};
export default nextConfig;