import { authOptions } from "@/lib/authOptions";
import { fetchCasinosForUser } from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddPokerGameForm from "./addPokerGameForm";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinos = await fetchCasinosForUser(session.user.id);
  return (
    <div className="py-8">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
        Edit Poker games
      </h1>
      <div className="grid grid-cols-2 grid-rows-1">
        <AddPokerGameForm casinos={casinos} />
      </div>
    </div>
  );
};

export default DashboardPage;
