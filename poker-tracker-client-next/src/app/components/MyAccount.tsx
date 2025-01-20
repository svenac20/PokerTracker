"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";
import { signOut } from "next-auth/react";

interface MyAccountProps {
    session: Session
}

const MyAccount: FunctionComponent<MyAccountProps> = ({session}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage />
          <AvatarFallback>
            {getInitials(session.user?.name!) || "testteste"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="cursor-pointer">
          My Account
        </DropdownMenuLabel>
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

export default MyAccount;
