import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { getCasinosDropdownForUser } from "@/lib/services";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddEditPokerGameForm from "./[id]/addEditPokerGameForm";
import { Metadata } from "next";
import { Road_Rage } from "next/font/google";
import { Roles } from "@/lib/types";

export const metadata: Metadata = {
  title: "Add poker game",
  description: "Add poker game",
};

export default async function AddPokerGame() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinos = await getCasinosDropdownForUser(session.user.id);
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          Add poker game
        </h1>
        <Link href="/live/dashboard">
          <Button variant={"default"}>Dashboard page</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1">
        <AddEditPokerGameForm casinos={casinos} />
      </div>
    </div>
  );
}
