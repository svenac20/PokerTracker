import TournamentCard from "@/components/custom/tournamentCard";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import {
  getCasinosDropdownForUser,
  getTournamentsByCasino,
} from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
        <div className="flex flex-col md:flex-row justify-between lg:justify-normal lg:gap-6 xl:gap-24 items">
          <div>
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
              Add or Edit Tournaments
            </h1>
          </div>
          <div className="flex justify-center">
            <Link href="/live/dashboard/tournament/add">
              <Button>Add New Tournament</Button>
            </Link>
          </div>
        </div>
        {tournaments && tournaments.length > 0 && (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                editPage={true}
              />
            ))}
          </div>
        )}
        {(!tournaments || tournaments.length === 0) && (
          <div className="flex justify-center items-center h-2/3 flex-col">
            <h2 className="text-gray-700 font-bold">
              No tournaments available. Please add your tournament .
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
