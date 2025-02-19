"use client";

import { FunctionComponent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import { Trash } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./button";
import { DeletePokerGame, PokerGame } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import axios from "@/lib/axios";
import { connect } from "http2";
import PokerGameCard from "./pokerGameCard";
import { revalidatePath } from "next/cache";

type DeleteGameDialogProps = {
  pokerGame: PokerGame;
};

const DeleteGameDialog: FunctionComponent<DeleteGameDialogProps> = ({
  pokerGame,
}) => {
  const [open, setOpen] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNAL_R_URL}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {})
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err)
      );

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const deletePokerGame = async () => {
    await axios.delete(`api/pokerGame/${pokerGame.id}`);
    const pokerGameData: DeletePokerGame = {
      casinoId: pokerGame.casinoId,
      pokerGameId: pokerGame.id,
    }
    await connection?.send("DeletePokerGame", pokerGameData);
    setOpen(false);
    revalidatePath("/dashboard")
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <Trash className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold">
          <DialogTitle>Do you want to delete this poker game?</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game type</TableHead>
              <TableHead>Limit (€)</TableHead>
              <TableHead>Tables</TableHead>
              <TableHead>Waiting list</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-bold">{pokerGame.gameType}</TableCell>
              <TableCell>{pokerGame.limit}</TableCell>
              <TableCell>{pokerGame.tablesNumber}</TableCell>
              <TableCell>{pokerGame.playerWaiting}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-red-700"
            onClick={() => deletePokerGame()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGameDialog;
