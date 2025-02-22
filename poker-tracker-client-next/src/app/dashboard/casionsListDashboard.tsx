"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import useHubConnection from "@/hooks/useHubConnection";
import { Casino } from "@/lib/types";
import { HubConnection } from "@microsoft/signalr";
import { createContext, FunctionComponent } from "react";

interface CasinosListDashboardProps {
  casinos: Casino[];
}

export const ConnectionContext = createContext<HubConnection | null>(null);

const CasinosListDashboard: FunctionComponent<CasinosListDashboardProps> = ({
  casinos,
}) => {
  const { connection } = useHubConnection();
  return (
    <ConnectionContext.Provider value={connection}>
      <ul>
        {casinos.map((casino) => {
          return (
            <CasinoCard
              key={casino.id}
              casino={casino}
              showActions={true}
            />
          );
        })}
      </ul>
    </ConnectionContext.Provider>
  );
};

export default CasinosListDashboard;
