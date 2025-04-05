import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ogImage from "./opengraph-image.png";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poker-radar.com"),
  title: {
    default: "Home | Poker Radar - Live Poker Games in Croatia",
    template: "%s | Poker Radar - Live Poker Games in Croatia",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
    description:
      "Get instant information about active cash games and waiting lists at all poker venues in Zagreb and throughout Croatia. Compare rake rates, game types, and player counts to find the perfect poker game for your preferences and bankroll.",
  },
  openGraph: {
    title: "Home | Poker Radar",
    description:
      "Get instant information about active cash games and waiting lists at all poker venues in Zagreb and throughout Croatia. Compare rake rates, game types, and player counts to find the perfect poker game for your preferences and bankroll.",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
