import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { fetchCasinos } from "@/lib/services";

export default async function Home() {
  const casinos = await fetchCasinos();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <ul>
        {casinos.map((casino) => {
          return (
            <CasinoCard key={casino.id} casino={casino} />
          );
        })}
      </ul>
    </>
  );
}
