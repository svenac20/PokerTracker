import { authOptions } from "@/lib/authOptions";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddEditTournamentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          Add poker game
        </h1>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1">
      </div>
    </div>
  );
}