import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CasinoCardData } from "@/lib/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { FunctionComponent } from "react";

interface CasinoDetailsCardProps {
  casino: CasinoCardData;
}

const CasinoDetailsCard: FunctionComponent<CasinoDetailsCardProps> = ({
  casino,
}) => {
  return (
    <Card className="cursor-pointer hover:bg-sidebar-accent hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">
      <CardContent className="pt-4">
        <div className="flex flex-col lg:gap-4 gap-2">
          <div className="grid gap-4 grid-cols-[25%_75%]">
            {casino.imageUrl && (
              <div>
                <Image
                  src={casino.imageUrl}
                  alt="casino image"
                  width={400}
                  height={400}
                />
              </div>
            )}
            <div
              className={`flex flex-col justify-center ${casino.imageUrl ? "" : "col-span-2"}`}
            >
              <div>
                <CardTitle>{casino.name}</CardTitle>
              </div>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{casino.location}</span>
                </div>
              </CardDescription>
            </div>
          </div>
          <div>
            <span className="font-bold">Rake: </span>
            {casino.rake}
          </div>
          <p className="whitespace-pre-wrap">{casino.information || ""} </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasinoDetailsCard;
