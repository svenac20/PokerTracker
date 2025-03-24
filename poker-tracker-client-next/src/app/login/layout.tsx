import AppSidebar from "@/components/custom/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to the poker radar app and become a member of the poker community. Use google login or use your email to login.",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-6 pt-8 lg:px-24 lg:py-12 lg:h-screen w-full ">
        <SidebarTrigger />
        <div className="pt-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
