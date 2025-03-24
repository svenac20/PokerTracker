import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { getCasinosWithPokerGames } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tournaments",
  keywords: "poker, tournaments, cash games, Zagreb, Poreč, Croatia", 
  description:
    "List of current and upcoming poker tournaments. Find the best tournaments for poker cash games in Zagreb, Poreč and other cities in Croatia.",
};

export default async function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
        Tournaments
      </h1>
    </>
  );
}
