import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "../globals.css";
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
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <Providers session={session}>
      <SidebarProvider>
        <AppSidebar />
        <main className="px-6 pt-8 lg:px-24 lg:py-12 lg:h-screen w-full ">
          <SidebarTrigger />
          <div className="pt-6">{children}</div>
          <Toaster />
        </main>
      </SidebarProvider>
    </Providers>
  );
}
