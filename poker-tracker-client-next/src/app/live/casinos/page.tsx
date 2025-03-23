import CasinoDetailsCard from "@/components/custom/casinoDetailsCard";
import { getCasinos } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casinos | Poker Radar",
  keywords: "casinos, poker, poker games, poker radar",
  description:
    "List of casinos available on Poker Radar website. Currently supporting Cezar Casino Zagreb and Cezar Casino Poreč.",
};

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
