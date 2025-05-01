"use client";

import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { Filter } from "@/components/custom/filter";
import { CasinoDto } from "@/lib/types";
import { FunctionComponent, useEffect, useState } from "react";

interface CasinoTableProps {
  casinos: CasinoDto[];
  countries: { value: number; label: string }[];
  towns: { value: number; label: string }[];
}

const MainPage: FunctionComponent<CasinoTableProps> = ({
  casinos,
  countries,
  towns,
}) => {
  const [filteredCasinos, setFilteredCasinos] = useState<CasinoDto[]>(casinos);

  const handleCountrySelect = (value: number | null) => {
    if (!value) {
      setFilteredCasinos(casinos);
    } else {
      const filtered = casinos.filter((casino) => casino.countryId === value);
      setFilteredCasinos(filtered);
    }
  };

  const handleTownSelect = (value: number | null) => {
    if (!value) {
      setFilteredCasinos(casinos);
    } else {
      const filtered = casinos.filter((casino) => casino.townId === value);
      setFilteredCasinos(filtered);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4 items-center pb-6 lg:pb-12">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl  pr-6">
          Current poker games
        </h1>
        <Filter
          data={countries}
          emptyText="All countries"
          placeholder="Select country"
          onSelect={handleCountrySelect}
        />
        <Filter
          data={towns}
          emptyText="All towns"
          placeholder="Select town"
          onSelect={handleTownSelect}
        />
      </div>
      <ul>
        <CasinosList casinoInit={filteredCasinos} />
      </ul>
    </>
  );
};

export default MainPage;
