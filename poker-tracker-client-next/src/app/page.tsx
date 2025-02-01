import CasinoCard from "@/components/ui/casinoCard";
import prisma from "@/lib/prisma";
import { fetchCasinos } from "@/lib/services";
import { GetCasinosResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
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
