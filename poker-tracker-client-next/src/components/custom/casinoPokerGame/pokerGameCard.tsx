import { PokerGameDto } from "@/lib/types";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import DeleteGameDialog from "../deleteGameDialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface PokerGameCardProps {
  pokerGame: PokerGameDto;
  showActions?: boolean;
}

const PokerGameCard: FunctionComponent<PokerGameCardProps> = ({
  pokerGame,
  showActions,
}) => {
  return (
    <TableRow className={pokerGame.gameStarted ? "bg-green-100" : ""}>
      <TableCell className="font-bold">
        {pokerGame.gameStarted
          ? "LIVE"
          : format(pokerGame.startTime, "dd/MM HH:mm")}
      </TableCell>
      <TableCell className="font-bold">{pokerGame.gameType}</TableCell>
      <TableCell>{pokerGame.limit}</TableCell>
      <TableCell>{pokerGame.tablesNumber}</TableCell>
      <TableCell>{pokerGame.playerWaiting}</TableCell>
      {showActions && (
        <TableCell className="flex flex-row gap-2 justify-center">
          <Link href={`/live/dashboard/poker-game/${pokerGame.id}`}>
            <Pencil className="cursor-pointer" />
          </Link>
          <DeleteGameDialog pokerGame={pokerGame} />
        </TableCell>
      )}
    </TableRow>
  );
};

export default PokerGameCard;
