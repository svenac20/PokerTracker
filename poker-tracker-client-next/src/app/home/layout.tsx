import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Discover live poker cash games and tournaments in Croatia. Get real-time updates on poker games in Zagreb, Poreč, Split, and other cities. Find venues, game types, rake details, and more.",
  title: "Home",
  keywords: [
    "poker radar",
    "live poker Croatia",
    "poker cash games Croatia",
    "Zagreb poker games",
    "Poreč poker games",
    "Split poker games",
    "Croatia poker tracker",
    "poker tournaments Croatia",
    "real-time poker updates",
    "poker venues Croatia",
  ],
  alternates: {
    canonical: "/home",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lg:h-screen w-full ">{children}</div>;
}
