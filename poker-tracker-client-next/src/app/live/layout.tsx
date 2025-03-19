import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "Live games",
  alternates: {
    canonical: '/live',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <div className="lg:h-screen w-full ">
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
    </div>
  );
}
