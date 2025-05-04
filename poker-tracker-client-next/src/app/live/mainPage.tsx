"use client";

import CasinosList from "@/components/custom/casinoPokerGame/casinosList";
import { Filter } from "@/components/custom/filter";
import { useHubConnectionWithCasinos } from "@/hooks/useHubConnectionWithCasinos";
import { CasinoDto } from "@/lib/types";
import { FunctionComponent } from "react";

interface CasinoTableProps {
  casinosInit: CasinoDto[];
  countries: { value: number; label: string }[];
  towns: { value: number; label: string }[];
}

const MainPage: FunctionComponent<CasinoTableProps> = ({
  casinosInit,
  countries,
  towns,
}) => {
  const { casinos, setCasinos } = useHubConnectionWithCasinos(casinosInit);

  const handleCountrySelect = (value: number | null) => {
    if (!value) {
      const allCasinos = casinosInit.map((casino) => {
        casino.hide = false;
        return casino;
      });
      setCasinos(allCasinos);
    } else {
      const filtered = casinos.map((casino) => {
        if (casino.countryId !== value) {
          casino.hide = true;
        } else {
          casino.hide = false;
        }
        return casino;
      });
      setCasinos(filtered);
    }
  };

  const handleTownSelect = (value: number | null) => {
    if (!value) {
      const allCasinos = casinosInit.map((casino) => {
        casino.hide = false;
        return casino;
      });
      setCasinos(allCasinos);
    } else {
      const filtered = casinos.map((casino) => {
        if (casino.townId !== value) {
          casino.hide = true;
        } else {
          casino.hide = false;
        }
        return casino;
      });
      setCasinos(filtered);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:items-center pb-6 lg:pb-12">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pr-6">
          Current poker games
        </h1>
        <div className="flex flex-row gap-2 md:gap-4">
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
      </div>
      <ul>
        <CasinosList casinoInit={casinos} />
      </ul>
    </>
  );
};

export default MainPage;
