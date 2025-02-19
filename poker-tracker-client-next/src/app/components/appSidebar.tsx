import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { Roles } from "@/lib/types";
import { ChevronRight, Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import MyAccount from "./MyAccount";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import logo from "../../../public/poker-radar-logo.svg";

interface AppSidebarProps {}

const AppSidebar: FunctionComponent<AppSidebarProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-bold text-black h-40 py-4">
        <div className="relative h-full w-full p-6">
          <Image src={logo} alt="logo" fill/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>{" "}
            </SidebarMenuItem>
          </SidebarMenu>
          {session?.user.roleId == Roles.ADMIN && (
            <SidebarMenu>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>Admin</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={"/dashboard"}>Dashboard</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <Link href={"/dashboard/poker-game"}>Add poker game</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          )}
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
