import CasinoCard from "@/components/ui/casinoCard";
import { authOptions } from "@/lib/authOptions";
import { fetchCasinosForUser, fetchPokerGamesForUser } from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinos = await fetchCasinosForUser(session.user.id);
  const casinosWithPokerGames = await fetchPokerGamesForUser(session.user.id);
  return (
    <div className="py-8">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
        Edit poker games
      </h1>
      {/* <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <AddPokerGameForm casinos={casinos} />
      </div> */}
      {casinosWithPokerGames.map((casino) => (
        <CasinoCard casino={casino} key={casino.id} showActions={true}/>
      ))}
    </div>
  );
};

export default DashboardPage;
