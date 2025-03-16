import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy",
  description: "Privacy policy and terms of service for Poker Radar",
  twitter: {
    card: "summary_large_image",
    images: "url/image.png",
    description:
      "Privacy policy and terms of service for Poker Radar",
  },
  openGraph: {
    title: "Policy | Poker Radar",
    description:
      "Privacy policy and terms of service for Poker Radar",
    images: "/opengraph-image.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
