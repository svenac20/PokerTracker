import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "../providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Poker Radar",
    template: "%s | Poker Radar",
  },
  description: "Used for tracking poker games",
  twitter: {
    card: "summary_large_image"
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <Providers>
            <SidebarProvider>
              <AppSidebar />
              <main className="lg:h-screen w-full ">
                <div>{children}</div>
                <Toaster />
              </main>
            </SidebarProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
