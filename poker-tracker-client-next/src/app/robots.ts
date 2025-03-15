import { MetadataRoute } from "next";

export default function robots() : MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/live", "/live/casinos", "/login", "/register"],
                disallow: ["/live/dashboard", "/live/dashboard/casino", "/policy", "/live/dashboard/poker-game"]
            }
        ],
        sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`
    }
}