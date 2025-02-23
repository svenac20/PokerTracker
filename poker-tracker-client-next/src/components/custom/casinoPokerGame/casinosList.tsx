"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { useHubConnectionWithCasinos } from "@/hooks/useHubConnectionWithCasinos";
import { CasinoDto } from "@/lib/types";
import { FunctionComponent } from "react";

interface CasinoTableProps {
  casinoInit: CasinoDto[];
  showActions?: boolean;
}

const CasinosList: FunctionComponent<CasinoTableProps> = ({
  casinoInit,
  showActions,
}) => {
  const { casinos } = useHubConnectionWithCasinos(casinoInit);
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
