"use client";

import axios from "@/lib/axios";
import { DeletePokerGame, PokerGameDto } from "@/lib/types";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import useHubConnection from "@/hooks/useHubConnection";

type DeleteGameDialogProps = {
  pokerGame: PokerGameDto;
};

const DeleteGameDialog: FunctionComponent<DeleteGameDialogProps> = ({
  pokerGame,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const {connection} = useHubConnection();

  const deletePokerGame = async () => {
    await axios.delete(`api/pokerGame/${pokerGame.id}`);
    const pokerGameData: DeletePokerGame = {
      casinoId: pokerGame.casinoId,
      pokerGameId: pokerGame.id,
    }
    await connection?.send("DeletePokerGame", pokerGameData);
    setOpen(false);
    router.refresh()
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
