"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import useHubConnection from "@/hooks/useHubConnection";
import { Casino } from "@/lib/types";
import { HubConnection } from "@microsoft/signalr";
import { createContext, FunctionComponent } from "react";

interface CasinosListDashboardProps {
  casinos: Casino[];
  showActions?: boolean;
}

export const ConnectionContext = createContext<HubConnection | null>(null);

const CasinosListDashboard: FunctionComponent<CasinosListDashboardProps> = ({
  casinos,
  showActions,
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
              showActions={showActions}
            />
          );
        })}
      </ul>
    </ConnectionContext.Provider>
  );
};

export default CasinosListDashboard;
