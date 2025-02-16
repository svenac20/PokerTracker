import { FunctionComponent } from "react";
import { Casino } from "../../lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Card, CardContent } from "./card";
import PokerGamesTable from "./pokerGamesTable";

interface CasinoCardProps {
  casino: Casino;
}

const CasinoCard: FunctionComponent<CasinoCardProps> = ({ casino }) => {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="font-bold text-lg">{casino.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              <PokerGamesTable pokerGames={casino.pokerGames} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
