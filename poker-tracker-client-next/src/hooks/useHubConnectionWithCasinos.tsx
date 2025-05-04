"use client";

import { CasinoDto, DeletePokerGameMessage, PokerGameDto } from "@/lib/types";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";

export function useHubConnectionWithCasinos(casinosList: CasinoDto[]) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [casinos, setCasinos] = useState<CasinoDto[]>(casinosList);

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
        connect.on("NewPokerGame", (pokerGame: PokerGameDto) => {
          setCasinos((prevCasinos) => {
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                const updatedPokerGames = [...casino.pokerGames, pokerGame];
                updatedPokerGames.sort((a, b) => {
                  if (a.gameStarted === b.gameStarted) {
                    return (
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                    );
                  }
                  return a.gameStarted ? -1 : 1;
                });
                console.log(updatedPokerGames);
                return {
                  ...casino,
                  pokerGames: updatedPokerGames,
                };
              }
              return casino;
            });
          });
          toast({
            title: `${pokerGame.casinoName} - New Poker Game added`,
            description: `New Poker Game at ${pokerGame.casinoName}`,
          });
        });

        connect.on("UpdatePokerGame", (pokerGame: PokerGameDto) => {
          console.log(pokerGame);
          setCasinos((prevCasinos) => {
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                const updatedPokerGames = casino.pokerGames.map((game) =>
                  game.id === pokerGame.id ? pokerGame : game,
                );
                updatedPokerGames.sort((a, b) => {
                  if (a.gameStarted === b.gameStarted) {
                    return (
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                    );
                  }
                  return a.gameStarted ? -1 : 1;
                });
                return {
                  ...casino,
                  pokerGames: updatedPokerGames,
                };
              }
              return casino;
            });
          });
          toast({
            title: `${pokerGame.casinoName} - Poker game updated`,
            description: `Poker Game updated at ${pokerGame.casinoName}`,
          });
        });

        connect.on("DeletePokerGame", (pokerGame: DeletePokerGameMessage) => {
          console.log(pokerGame.casinoId);
          setCasinos((prevCasinos) => {
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                console.log(
                  casino.pokerGames.filter(
                    (game) => game.id !== pokerGame.pokerGameId,
                  ),
                );
                return {
                  ...casino,
                  pokerGames: casino.pokerGames.filter(
                    (game) => game.id !== pokerGame.pokerGameId,
                  ),
                };
              }
              return casino;
            });
          });
          toast({
            title: "Poker game deleted",
            description: `Poker Game deleted`,
          });
        });
      })
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err),
      );

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  return { connection, casinos, setCasinos };
}
