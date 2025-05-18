import Image from "next/image";
import { FunctionComponent } from "react";
import { CasinoDto } from "../../../lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";
import PokerGamesTable from "./pokerGamesTable";
import Link from "next/link";

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
                {casino.imageUrl && (
                  <div className="w-[20%] md:w-[15%]">
                    <Image
                      src={casino.imageUrl}
                      alt={`casino ${casino.name} image`}
                      width={590}
                      height={590}
                    />
                  </div>
                )}
                <p className="font-bold text-lg ">{casino.name}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {!!casino.rake && (
                  <Card className="rounded-sm">
                    <CardHeader className="font-extrabold">
                      <CardDescription>
                        <div className="flex items-center font-bold">
                          <svg
                            className="h-4 w-4 mr-2 lucide lucide-map-pin-icon lucide-map-pin"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{casino.location}</span>
                        </div>
                      </CardDescription>
                      {casino.countryId != 2 && <p>Rake: {casino.rake}</p>}
                      {casino.countryId == 2 && (
                        <Link
                          href="https://pokerradarsa.blob.core.windows.net/casinos-rake/casino-adjara-rake-info.png"
                          target="_blank"
                          className="underline"
                        >
                            <div>Rake information here</div>
                        </Link>
                      )}
                    </CardHeader>
                    <CardContent className="whitespace-pre-wrap">
                      {casino.information}
                    </CardContent>
                  </Card>
                )}
                <PokerGamesTable
                  pokerGames={casino.pokerGames}
                  showActions={showActions}
                  currencySymbol={casino.countryId == 2 ? "$" : "€"}
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
