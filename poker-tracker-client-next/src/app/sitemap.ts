import { getCasinos } from "@/lib/services";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/home`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/policy`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/live`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/live/casinos`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/login`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/myAccount`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/register`
        },
    ]
}