import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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
    canonical: '/home',
  },
  title: {
    default: "Policy | Poker Radar",
    template: "%s | Poker Radar",
  },
  description: "Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.",
  twitter: {
    card: "summary_large_image",
    images: 'url/image.png',
    description: 'Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.',
  },
  openGraph: {
    title: 'Home | Poker Radar',
    description: 'Find Live Poker games in Zagreb and throughout Croatia. Come and try your luck.',
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
