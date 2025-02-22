import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { authOptions } from "@/lib/authOptions";
import { fetchCasinosForUser, fetchPokerGamesForUser } from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CasinoTables from "../../components/custom/casinoPokerGame/casinoTables";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinosWithPokerGames = await fetchPokerGamesForUser(session.user.id);
  return (
    <div className="py-8">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
        Edit poker games
      </h1>
      {casinosWithPokerGames.map((casino) => (
        <CasinoCard casino={casino} key={casino.id} showActions={true}/>
      ))}
    </div>
  );
};

export default DashboardPage;
