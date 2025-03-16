import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.",
  twitter: {
    card: "summary_large_image",
    images: "url/image.png",
    description:
      "Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.",
  },
  openGraph: {
    title: "Home | Poker Radar",
    description:
      "Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.",
    images: "/opengraph-image.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lg:h-screen w-full ">{children}</div>;
}
