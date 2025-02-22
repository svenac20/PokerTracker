import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "../components/custom/SessionProvider";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poker Tracker",
  description: "Used for tracking poker games",
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
              <main className="px-4 lg:px-24 lg:py-12 py-4 h-screen w-full">
                <SidebarTrigger></SidebarTrigger>
                {children}
                <Toaster />
              </main>
            </SidebarProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
