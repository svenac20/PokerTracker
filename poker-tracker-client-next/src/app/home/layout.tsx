import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
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
