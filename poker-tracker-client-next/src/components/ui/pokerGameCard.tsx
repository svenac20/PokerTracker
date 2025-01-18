import { PokerGame } from "@/lib/types";
import { FunctionComponent } from "react";
import { Card, CardContent } from "./card";

interface PokerGameCardProps {
  pokerGame: PokerGame;
}

const PokerGameCard: FunctionComponent<PokerGameCardProps> = ({
  pokerGame,
}) => {
  return <Card>
    <CardContent>
        <div className="flex justify-between flex-row">
            <p className="font-bold text-lg">{pokerGame.limit}</p>
            <p className="font-bold text-lg">{pokerGame.gameType}</p>
        </div>
    </CardContent>
  </Card>;
};

export default PokerGameCard;
