import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { Roles } from "@/lib/types";
import { BadgePlus, Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FunctionComponent } from "react";
import MyAccount from "./MyAccount";
import Image from "next/image";

interface AppSidebarProps {}

const AppSidebar: FunctionComponent<AppSidebarProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-bold text-black">
        <div className="flex flex-col">
          <Image
            src="/poker-radar-logo.svg"
            alt="logo"
            height={200}
            width={350}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>{" "}
              </SidebarMenuItem>
              {session?.user.roleId == Roles.ADMIN && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                      <BadgePlus />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>{" "}
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session ? (
          <MyAccount session={session} />
        ) : (
          <Link href="/api/auth/signin" className="w-full">
            <Button variant="default" className="w-full">
              Sign in
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
