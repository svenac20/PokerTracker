"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { CasinoDto } from "@/lib/types";
import { FunctionComponent, useEffect, useState } from "react";

interface CasinoTableProps {
  casinoInit: CasinoDto[];
  showActions?: boolean;
}

const CasinosList: FunctionComponent<CasinoTableProps> = ({
  casinoInit,
  showActions,
}) => {
  const [casinos, setCasinos] = useState<CasinoDto[]>(casinoInit);

  // Sync the casinoInit prop with the local casinos state
  useEffect(() => {
    setCasinos(casinoInit);
  }, [casinoInit]);

  return (
    <ul>
      {casinos.map((casino) => {
        return casino.hide ? null : (
          <CasinoCard
            key={casino.id}
            casino={casino}
            showActions={showActions}
          />
        );
      })}
    </ul>
  );
};

export default CasinosList;
