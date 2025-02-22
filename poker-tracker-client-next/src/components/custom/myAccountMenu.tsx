"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";
import { signOut } from "next-auth/react";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

interface MyAccountProps {
  session: Session;
}

const MyAccountMenu: FunctionComponent<MyAccountProps> = ({ session }) => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {getInitials(session.user?.name || "")}
            </AvatarFallback>
          </Avatar>
          <span>{session.user.name || ""}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? "bottom" : "right"}
        className="mb-2"
      >
        <DropdownMenuItem className="cursor-pointer">
          <Link href={"/myAccount"} className="cursor-pointer font-bold">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="px-2 cursor-pointer"
          onClick={() => {
            signOut();
            redirect("/api/auth/signin");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccountMenu;
