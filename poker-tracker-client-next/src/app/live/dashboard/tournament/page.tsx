import TournamentCard from "@/components/custom/tournamentCard";
import { authOptions } from "@/lib/authOptions";
import {
  getCasinosDropdownForUser,
  getTournamentsByCasino,
} from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ViewTournamentAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinosForUser = await getCasinosDropdownForUser(session.user.id);
  const tournaments = await getTournamentsByCasino(
    casinosForUser.map((casino) => casino.id)
  );
  return (
    <>
      <div className="py-8 flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
            Add or Edit Tournaments
          </h1>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} editPage={true} />
          ))}
        </div>
      </div>
    </>
  );
}
