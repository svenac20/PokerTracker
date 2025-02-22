"use client";

import CasinoCard from "@/components/custom/casinoPokerGame/casinoCard";
import { toast } from "@/hooks/use-toast";
import { useHubConnectionWithCasinos } from "@/hooks/useHubConnectionWithCasinos";
import { Casino, DeletePokerGame, PokerGameDto } from "@/lib/types";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { FunctionComponent, useEffect, useState } from "react";

interface CasinoTableProps {
  casinoInit: Casino[];
  showActions?: boolean;
}

const CasinosList: FunctionComponent<CasinoTableProps> = ({ casinoInit, showActions }) => {
  const {casinos} = useHubConnectionWithCasinos(casinoInit)

  return (
    <ul>
      {casinos.map((casino) => {
        return <CasinoCard key={casino.id} casino={casino} showActions={showActions}/>;
      })}
    </ul>
  );
};

export default CasinosList;
