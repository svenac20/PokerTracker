import { getCasinos } from "@/lib/services";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const casinos = await getCasinos()
    const casinoEditEntries = casinos.map(({id}) => { 
        return {
            url: `${process.env.NEXT_PUBLIC_API_URL}/live/dashboard/casino/edit/${id}`
        }
    })

    return [
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
            url: `${process.env.NEXT_PUBLIC_API_URL}/live/dashboard`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/live/dashboard/casino`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/live/dashboard/poker-game`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/login`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/myAccount`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/home`
        },
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/register`
        },
        ...casinoEditEntries
    ]
}