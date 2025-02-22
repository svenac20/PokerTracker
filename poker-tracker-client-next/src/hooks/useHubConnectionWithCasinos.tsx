import { Casino, DeletePokerGame, PokerGameDto } from "@/lib/types";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";

export function useHubConnectionWithCasinos(casinosList: Casino[]) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [casinos, setCasinos] = useState<Casino[]>(casinosList);

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
          });
        });

        connect.on("UpdatePokerGame", (pokerGame: PokerGameDto) => {
          setCasinos((prevCasinos) => {
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                return {
                  ...casino,
                  pokerGames: casino.pokerGames.map((game) =>
                    game.id === pokerGame.id ? pokerGame : game
                  ),
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
      
        connect.on("DeletePokerGame", (pokerGame: DeletePokerGame) => {
          console.log(pokerGame.casinoId)
          setCasinos((prevCasinos) => {
            return prevCasinos.map((casino) => {
              if (casino?.id === pokerGame.casinoId) {
                console.log(casino.pokerGames.filter((game) => game.id !== pokerGame.pokerGameId))
                return {
                  ...casino,
                  pokerGames: casino.pokerGames.filter((game) =>
                    game.id !== pokerGame.pokerGameId
                  ),
                };
              }
              return casino;
            });
          });
          toast({
            title: 'Poker game deleted',
            description: `Poker Game deleted`,
          });
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

  return {connection, casinos, setCasinos}
}
