import { FunctionComponent, useEffect, useState } from "react";
import { Casino } from "../../lib/types";
import { Card, CardContent, CardFooter } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import PokerGameCard from "./pokerGameCard";
import PokerGamesTable from "./pokerGamesTable";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

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
              <PokerGamesTable pokerGames={casino.pokerGames} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CasinoCard;
