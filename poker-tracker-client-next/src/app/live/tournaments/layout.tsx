import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tournaments",
  description: "List of tournaments available on Poker Radar website. Currently supporting Cezar Casino Zagreb and Cezar Casino Poreč. Find the best poker tournaments in Croatia. Tournament registrations coming soon!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
