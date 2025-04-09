import TournamentCard from "@/components/custom/tournamentCard";
import { getTournaments } from "@/lib/services";
import Link from "next/link";

export default async function AddEditTournamentsPage() {
  const tournaments = await getTournaments();
  return (
    <>
      <div className="py-2 md:py-8 flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
            Tournaments
          </h1>
        </div>
        <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-4">
          {tournaments.map((tournament) => (
            <Link
              target="_blank"
              key={tournament.id}
              href={tournament.imageUrl}
            >
              <TournamentCard tournament={tournament}></TournamentCard>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
