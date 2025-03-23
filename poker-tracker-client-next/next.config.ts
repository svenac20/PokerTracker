import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: "build",
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src/app", "src/components/custom", "src/hooks", "src/lib"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokerradarsa.blob.core.windows.net",
        port: "",
        pathname: "/casinos-images/**",
        search: "",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
