import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/opengraph-image.png",
          "/home",
          "/live",
          "/live/casinos",
          "/login",
          "/register",
          "/myAccount",
          "/policy",
        ],
        disallow: [
          "/live/dashboard",
          "/live/dashboard/casino",
          "/live/dashboard/poker-game",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_DEFAULT_DOMAIN}/sitemap.xml`,
  };
}
