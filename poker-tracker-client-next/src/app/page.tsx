import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { fetchCasinos } from "@/lib/services";

export default async function Home() {
  const casinos = await fetchCasinos();
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl py-6 lg:pb-12">
        Current poker games
      </h1>
      <ul>
        {casinos.map((casino) => {
          return <CasinoCard key={casino.id} casino={casino} />;
        })}
      </ul>
    </>
  );
}
