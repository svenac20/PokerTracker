import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Providers from "../providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My account",
  description: "Get information about your user account",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <Providers session={session}>
      <SidebarProvider>
        <AppSidebar />
        <main className="px-6 pt-8 lg:px-24 lg:py-12 lg:h-screen w-full ">
          <SidebarTrigger />
          <div className="pt-6">{children}</div>
        </main>
      </SidebarProvider>
    </Providers>
  );
}