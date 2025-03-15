import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("http://poker-radar.com"),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Poker Radar",
    template: "%s | Poker Radar",
  },
  description: "Used for tracking poker games in Croatia",
  twitter: {
    card: "summary_large_image",
    images: 'url/image.png'
  },
  openGraph: {
    title: 'Poker Radar',
    description: 'Find Live Poker in Croatia',
    images: '/opengraph-image.png',
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
        <main className="lg:h-screen w-full ">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
