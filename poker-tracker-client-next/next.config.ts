import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:"standalone",
  distDir: 'build',
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
