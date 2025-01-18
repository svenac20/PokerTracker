import { FunctionComponent } from "react";
import { Casino } from "../../lib/types";
import { Card, CardContent } from "./card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

interface CasinoCardProps {
  casino: Casino;
}

const CasinoCard: FunctionComponent<CasinoCardProps> = ({ casino }) => {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="font-bold text-lg">{casino.name}</p>
            </AccordionTrigger>
            <AccordionContent>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
