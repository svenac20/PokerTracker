import TournamentCard from "@/components/custom/tournamentCard";
import { getCasinos, getTournaments, getTowns } from "@/lib/services";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const towns = await getTowns();
  const townNames = towns.map((town) => town.name);
  const keywords = towns.map((town) => `${town.name} poker tournaments`);
  const keywordsCroatian = towns.map((town) => `${town.name} poker turniri`);
  return {
    title: "Tournaments",
    description: `Explore all currently available poker tournaments in Croatia. Find tournaments in ${townNames.join(",")} and other cities. Get details on venues, start times, and tournament information.`,
    keywords: [
      ...keywords,
      ...keywordsCroatian,
      "croatia poker tournaments",
      "poker events Croatia",
      ],
  };
}

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
