import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { Filter } from "@/components/custom/filter";
import {
  getCasinos,
  getCasinosWithPokerGames,
  getCountriesForFilter,
  getTowns,
  getTownsForFilter,
} from "@/lib/services";
import { Metadata } from "next";
import MainPage from "./mainPage";

export async function generateMetadata(): Promise<Metadata> {
  const casinos = await getCasinos();
  const towns = await getTowns();
  //flatten the array of arrays into a single array
  const casinoNames = casinos.map((casino) => casino.name);
  const townKeywords = towns.map((town) => `${town.name} poker`);
  return {
    title: "Live",
    description: `List of live poker games. Find the best poker games in Croatia. Currently suppporting ${casinoNames.join(", ")}. `,
    keywords: ["poker Zagreb", "live poker games Zagreb", ...townKeywords],
  };
}

export default async function Home() {
  const casinos = await getCasinosWithPokerGames();
  const countries = await getCountriesForFilter();
  const towns = await getTownsForFilter();
  return <MainPage casinos={casinos} countries={countries} towns={towns} />;
}
