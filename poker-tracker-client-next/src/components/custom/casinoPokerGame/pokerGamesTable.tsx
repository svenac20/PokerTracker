"use client";
import { PokerGameDto } from "@/lib/types";
import { FunctionComponent } from "react";
import PokerGameRow from "./pokerGameCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { redirect } from "next/navigation";

interface PokerGamesTableProps {
  pokerGames: PokerGameDto[];
  showActions?: boolean;
}

const PokerGamesTable: FunctionComponent<PokerGamesTableProps> = ({
  pokerGames,
  showActions,
}) => {
  if (pokerGames.length === 0) {
    return (
      <Table>
        <TableCaption>No currently running tables</TableCaption>
      </Table>
    );
  }
  return (
    <>
      <Table>
        <TableCaption>A list of all currently running tables.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Game type</TableHead>
            <TableHead>Limit (€)</TableHead>
            <TableHead>Tables</TableHead>
            <TableHead>Waiting list</TableHead>
            {showActions && (
              <TableHead className="flex justify-center">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokerGames.map((game) => (
            <PokerGameRow
              key={game.id}
              pokerGame={game}
              showActions={showActions}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PokerGamesTable;
