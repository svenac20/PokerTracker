import { FunctionComponent } from "react";
import { Casino } from "../models/requests/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/shadcn/accordion";
import {
    Card,
    CardContent,
    CardFooter
} from "./ui/shadcn/card";

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
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CasinoCard;
