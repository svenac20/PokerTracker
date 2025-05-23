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
import {
  Building,
  ChevronRight,
  CirclePlus,
  Home,
  Info,
  LayoutDashboard,
  Lock,
  Pencil,
  Trophy,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import pokerRadarImage from "../../../public/poker-radar-logo.svg";
import MyAccountMenu from "./myAccountMenu";
import SidebarMenuLink from "./sidebarMenuLink";

const AppSidebar: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-bold text-black h-40 py-4 mb-2">
        <div className="relative h-full w-full p-6">
          <Image
            src={pokerRadarImage.src}
            alt="Poker Radar logo"
            fill
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarMenuLink
                  href="/live"
                  text="Live games"
                  icon={<Home />}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarMenuLink
                  href="/live/casinos"
                  text="Casinos"
                  icon={<Building />}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SidebarMenuLink
                  href="/live/tournaments"
                  text="Tournaments"
                  icon={<Trophy />}
                />
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
                            icon={<LayoutDashboard />}
                          />
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard/poker-game"
                            text="Add poker game"
                            icon={<CirclePlus />}
                          />
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard/casino"
                            text="Edit casinos"
                            icon={<Pencil />}
                          />
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <SidebarMenuLink
                            href="/live/dashboard/tournament"
                            text="Edit Tournaments"
                            icon={<Trophy />}
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
