"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { useHubConnectionWithCasinos } from "@/hooks/useHubConnectionWithCasinos";
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
  const { casinos: hubCasinos, setCasinos: setHubCasinos } = useHubConnectionWithCasinos(casinoInit);
  const [casinos, setCasinos] = useState<CasinoDto[]>(casinoInit);

  // Sync the casinoInit prop with the local casinos state
  useEffect(() => {
    setCasinos(casinoInit);
    setHubCasinos(casinoInit);
  }, [casinoInit, setHubCasinos]);
  return (
    <ul>
      {casinos.map((casino) => {
        return (
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
