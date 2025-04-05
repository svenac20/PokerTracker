import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { getCasinos, getCasinosWithPokerGames, getTowns } from "@/lib/services";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const casinos = await getCasinos();
  const towns = await getTowns();
  //flatten the array of arrays into a single array
  const casinoNames = casinos.map((casino) => casino.name);
  const townKeywords = towns.map((town) => `${town.name} poker`);
  return {
    title: "Live",
    description: `List of live poker games. Find the best poker games in Croatia. Currently suppporting ${casinoNames.join(", ")}. `,
    keywords: [
      "poker Zagreb",
      "live poker games Zagreb",
      ...townKeywords,
    ],
  };
}

export default async function Home() {
  const casinos = await getCasinosWithPokerGames();
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
        Current poker games
      </h1>
      <ul>
        <CasinosList casinoInit={casinos} />
      </ul>
    </>
  );
}
