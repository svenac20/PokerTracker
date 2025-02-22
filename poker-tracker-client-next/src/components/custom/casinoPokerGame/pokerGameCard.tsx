import { PokerGameDto } from "@/lib/types";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import DeleteGameDialog from "../deleteGameDialog";
import { TableCell, TableRow } from "@/components/ui/table";


interface PokerGameCardProps {
  pokerGame: PokerGameDto;
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
