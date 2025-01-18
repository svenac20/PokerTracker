'use client';

import CasinoCard from "@/components/ui/casinoCard";
import { fetchCasinos } from "@/lib/services";
import { GetCasinosResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isLoading } = useQuery<GetCasinosResponse>({queryKey: ['casinos'], queryFn: fetchCasinos});

  console.log(data)
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <ul>
        {data?.casinos.map((casino) => {
          return <CasinoCard key={casino.id} casino={casino} />;
        })}
      </ul>
    </>
  );
}
