import { PokerGame } from "@/lib/types";
import { FunctionComponent } from "react";
import { Card, CardContent } from "./card";
import { TableCell, TableRow } from "./table";

interface PokerGameCardProps {
  pokerGame: PokerGame;
}

const PokerGameCard: FunctionComponent<PokerGameCardProps> = ({
  pokerGame,
}) => {
  return (
    <TableRow>
      <TableCell className="font-bold">{pokerGame.gameType}</TableCell>
      <TableCell>{pokerGame.limit}</TableCell>
      <TableCell>{pokerGame.tablesNumber}</TableCell>
      <TableCell>{pokerGame.playerWaiting}</TableCell>
    </TableRow>
  );
};

export default PokerGameCard;
