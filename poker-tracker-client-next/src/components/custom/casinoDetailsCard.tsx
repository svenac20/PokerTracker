import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CasinoCardData } from "@/lib/types";
import { MapPin } from "lucide-react";
import { FunctionComponent } from "react";

interface CasinoDetailsCardProps {
  casino: CasinoCardData;
}

const CasinoDetailsCard: FunctionComponent<CasinoDetailsCardProps> = ({
  casino,
}) => {
  return (
    <Card className="cursor-pointer hover:bg-sidebar-accent">
      <CardHeader>
        <CardTitle>{casino.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{casino.location}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-bold">Rake: </span>
          {casino.rake}
        </div>
      </CardContent>
      <CardFooter>
        <p className="whitespace-pre-wrap">{casino.information || ""} </p>
      </CardFooter>
    </Card>
  );
};

export default CasinoDetailsCard;
