import { PokerGame } from "@/lib/types";
import { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import PokerGameCard from "./pokerGameCard";

interface PokerGamesTableProps {
  pokerGames: PokerGame[];
}

const PokerGamesTable: FunctionComponent<PokerGamesTableProps> = ({
  pokerGames,
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokerGames.map((game) => (
            <PokerGameCard key={game.id} pokerGame={game} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PokerGamesTable;
