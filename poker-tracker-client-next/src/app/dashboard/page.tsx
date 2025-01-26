import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Roles } from "@/lib/types";
import { redirect } from "next/navigation";
import { fetchCasinosForUser } from "@/lib/services";
import AddPokerGameForm from "../components/AddPokerGameForm";

interface DashboardPageProps {}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinos = await fetchCasinosForUser(session?.user.id!);
  return (
    <div className="py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-12">
        Edit Poker games
      </h1>
      <div className="grid grid-cols-2 grid-rows-1">
        <AddPokerGameForm casinos={casinos} />
      </div>
    </div>
  );
};

export default DashboardPage;
