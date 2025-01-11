"use client";

import Link from "next/link";
import { FunctionComponent } from "react";
import {signIn, useSession, signOut} from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { redirect } from "next/navigation";

const Navbar: FunctionComponent = () => {
  const {data: session} = useSession()
  
  return (
    <div className="flex justify-between items-center h-[10%]">
      <Link href="/">
        <Button variant="default">Home</Button>
      </Link>
      <div className="pr-4">
        {!session && (
          <Link href="/api/auth/signin">
            <Button variant="default">Sign in</Button>
          </Link>
        )}
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {getInitials(session.user?.name!) || "SS"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
