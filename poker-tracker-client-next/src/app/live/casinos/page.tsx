import CasinoDetailsCard from "@/components/custom/casinoDetailsCard";
import { getCasinos } from "@/lib/services";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const casinos = await getCasinos();
  const casinoNames = casinos.map((casino) => casino.name);
  return {
    title: "Casinos Live Poker Games in Croatia | Poker Radar",
    description: `Explore casinos in Croatia that feature live poker games. Find details about ${casinoNames.join(",")} and other venues offering cash games and tournaments.`,
    keywords: ["poker venues Croatia", ...casinoNames],
  };
}

export default async function Casinos() {
  const casinosForUser = await getCasinos();

  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          Available Casinos
        </h1>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 grid-cols-1 gap-8">
        {casinosForUser.map((casino) => (
          <CasinoDetailsCard key={casino.id} casino={casino} />
        ))}
      </div>
    </div>
  );
}
