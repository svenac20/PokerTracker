import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;
  return [
    {
      url: `${domain}/home`,
    },
    {
      url: `${domain}/policy`,
    },
    {
      url: `${domain}/live`,
    },
    {
      url: `${domain}/live/casinos`,
    },
    {
      url: `${domain}/login`,
    },
    {
      url: `${domain}/myAccount`,
    },
    {
      url: `${domain}/register`,
    },
  ];
}
