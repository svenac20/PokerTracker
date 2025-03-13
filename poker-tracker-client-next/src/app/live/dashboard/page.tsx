import { authOptions } from "@/lib/authOptions";
import { getCasinosWithPokerGamesForUser } from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CasinosListDashboard from "./casionsListDashboard";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinosWithPokerGames = await getCasinosWithPokerGamesForUser(session.user.id);
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl py-6 lg:pb-12">
        Dashboard
      </h1>
      <CasinosListDashboard
        casinos={casinosWithPokerGames}
      />
    </>
  );
};

export default DashboardPage;
