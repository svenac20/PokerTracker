import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casinos | Poker Radar",
  description: "List of casinos available on Poker Radar website. Currently supporting Cezar Casino Zagreb and Cezar Casino Poreč.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
