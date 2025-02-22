import CasinosList from "@/components/custom/casinoPokerGame/casinoTables";
import { fetchCasinos } from "@/lib/services";

export default async function Home() {
  const casinos = await fetchCasinos();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <CasinosList casinoInit={casinos}/>
    </>
  );
}
