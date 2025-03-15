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
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Building, ChevronRight, Home, Info, Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import logo from "../../../public/poker-radar-logo.svg";
import MyAccountMenu from "./myAccountMenu";
import SidebarMenuLink from "./sidebarMenuLink";

const AppSidebar: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-bold text-black h-40 py-4">
        <div className="relative h-full w-full p-6">
          <Image src={logo} alt="logo" fill priority />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarMenuLink href="/live" text="Live games" icon={<Home />} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarMenuLink href="/live/casinos" text="Casinos" icon={<Building />} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {session?.user.roleId == Roles.ADMIN && (
            <SidebarMenu>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Lock />
                      <span>Admin</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard"
                            text="Dashboard"
                          />
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard/poker-game"
                            text="Add poker game"
                          />
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard/casino"
                            text="Edit casino information"
                          />
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="font-bold">
                <SidebarMenuLink href="/" text="About us" icon={<Info />} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <>
          {session ? (
            <MyAccountMenu session={session} />
          ) : (
            <Link href="/api/auth/signin" className="w-full">
              <Button variant="default" className="w-full">
                Sign in
              </Button>
            </Link>
          )}
        </>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
