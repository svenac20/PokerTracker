import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { getCasinosWithPokerGames } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "Live games",
  description: "List of live poker games. Find the best poker games in Croatia.",
}

export default async function Home() {
  const casinos = await getCasinosWithPokerGames();
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
        Current poker games
      </h1>
      <ul>
        <CasinosList casinoInit={casinos}/>
      </ul>
    </>
  );
}
