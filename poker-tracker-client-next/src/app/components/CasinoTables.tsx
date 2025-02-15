"use client";

import CasinoCard from "@/components/ui/casinoCard";
import { toast } from "@/hooks/use-toast";
import { Casino, PokerGame } from "@/lib/types";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { FunctionComponent, useEffect, useState } from "react";

interface CasinoTableProps {
  casinoInit: Casino[];
}

const CasinoTable: FunctionComponent<CasinoTableProps> = ({ casinoInit }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [casinos, setCasinos] = useState<Casino[]>(casinoInit);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNAL_R_URL}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {
        connect.on("NewPokerGame", (pokerGame: PokerGame) => {
          setCasinos((prevCasinos) => {
            console.log(pokerGame)
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                return {
                  ...casino,
                  pokerGames: [...casino.pokerGames, pokerGame],
                };
              }
              return casino;
            });
          });
          toast({
            title: `${pokerGame.casinoName} - New Poker Game added`,
            description: `New Poker Game at ${pokerGame.casinoName}`,
          })
        });
      })
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err)
      );

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);
  return (
    <ul>
      {casinos.map((casino) => {
        return <CasinoCard key={casino.id} casino={casino} />;
      })}
    </ul>
  );
};

export default CasinoTable;
