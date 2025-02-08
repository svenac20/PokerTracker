import { fetchCasinos } from "@/lib/services";
import CasinoTable from "./components/CasinoTables";

export default async function Home() {
  const casinos = await fetchCasinos();
  console.log(casinos)
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <CasinoTable casinoInit={casinos}/>
    </>
  );
}
