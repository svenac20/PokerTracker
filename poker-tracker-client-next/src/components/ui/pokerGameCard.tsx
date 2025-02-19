import { PokerGame } from "@/lib/types";
import { FunctionComponent } from "react";
import { TableCell, TableRow } from "./table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { DialogTrigger } from "./dialog";
import DeleteGameDialog from "./delete-game-dialog";

interface PokerGameCardProps {
  pokerGame: PokerGame;
  showActions?: boolean;
}

const PokerGameCard: FunctionComponent<PokerGameCardProps> = ({
  pokerGame,
  showActions,
}) => {
  return (
    <TableRow>
      <TableCell className="font-bold">{pokerGame.gameType}</TableCell>
      <TableCell>{pokerGame.limit}</TableCell>
      <TableCell>{pokerGame.tablesNumber}</TableCell>
      <TableCell>{pokerGame.playerWaiting}</TableCell>
      {showActions && (
        <TableCell className="flex flex-row gap-2 justify-center">
          <Link href={`/dashboard/poker-game/${pokerGame.id}`}>
            <Pencil className="cursor-pointer" />
          </Link>
          <DeleteGameDialog pokerGame={pokerGame}/>
        </TableCell>
      )}
    </TableRow>
  );
};

export default PokerGameCard;
