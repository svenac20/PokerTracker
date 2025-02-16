import { Button } from "@/components/ui/button";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FunctionComponent } from "react";
import MyAccount from "./MyAccount";
import { authOptions } from "@/lib/authOptions";
import  Image  from "next/image"

const Navbar: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)

  return (
    <div className="flex justify-between items-center h-[10%]">
      <Image alt="page-logo" src="/poker-radar-logo.jpg" width={200} height={200}/>
      <div className="flex flex-row gap-8">
        <Link href="/">
          <Button variant="default">Home</Button>
        </Link>
        {session?.user.roleId === Roles.ADMIN && 
          <Link href="/dashboard">
            <Button variant="default">Dashboard</Button>
          </Link>
        }
      </div>
      <div className="pr-4">
        {!session && (
          <Link href="/api/auth/signin">
            <Button variant="default">Sign in</Button>
          </Link>
        )}
        {session && <MyAccount session={session}/>}
      </div>
    </div>
  );
};

export default Navbar;
