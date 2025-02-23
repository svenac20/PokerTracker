import { FunctionComponent } from "react";
import { CasinoDto } from "../../../lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Card, CardContent } from "../../ui/card";
import PokerGamesTable from "./pokerGamesTable";

interface CasinoCardProps {
  casino: CasinoDto;
  showActions?: boolean;
}

const CasinoCard: FunctionComponent<CasinoCardProps> = ({
  casino,
  showActions,
}) => {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="font-bold text-lg">{casino.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              <PokerGamesTable
                pokerGames={casino.pokerGames}
                showActions={showActions}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
