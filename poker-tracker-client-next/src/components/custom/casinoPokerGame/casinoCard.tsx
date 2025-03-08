import { FunctionComponent } from "react";
import { CasinoDto } from "../../../lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Card, CardContent, CardHeader } from "../../ui/card";
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
              <div className="flex gap-4 items-center">
                <p className="font-bold text-lg ">{casino.name}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {!!casino.rake && !!casino.information && (
                  <Card className="rounded-sm">
                    <CardHeader className="font-extrabold">
                      <p>Location: {casino.location}</p>
                      <p>Rake: {casino.rake}</p>
                    </CardHeader>
                    <CardContent>{casino.information}</CardContent>
                  </Card>
                )}
                <PokerGamesTable
                  pokerGames={casino.pokerGames}
                  showActions={showActions}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
