import { MapPin, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FunctionComponent } from "react";
import { CasinoCardData } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";

interface HomePageCasinoCardProps {
  casino: CasinoCardData;
}

const HomePageCasinoCard: FunctionComponent<HomePageCasinoCardProps> = ({casino}) => {
  return (
    <Card className="flex flex-col h-full flex-1">
      <CardHeader>
        <CardTitle>{casino.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {casino.location}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          <strong>Rake:</strong> {casino.rake}
        </p>
        <p className="mb-4">
          <strong>Games:</strong> PLO, NLH
        </p>
        <p className="whitespace-pre-wrap">{casino.information}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full">
          <Link href="/live/casinos" prefetch={false}>
            <span className="flex items-center justify-center w-full">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomePageCasinoCard;
