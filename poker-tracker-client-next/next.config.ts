import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:"standalone",
  distDir: 'build',
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src/app", "src/components/custom", "src/hooks", "src/lib"],
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
