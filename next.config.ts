import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // REMOVE: output: "standalone"
  // REMOVE: outputFileTracingRoot
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
