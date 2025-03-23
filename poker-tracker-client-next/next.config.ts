import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:"standalone",
  distDir: 'build',
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src/app", "src/components/custom", "src/hooks", "src/lib"],
  },
  images: {
    domains: ["localhost", "pokerradarsa.blob.core.windows.net", "poker-radar.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
