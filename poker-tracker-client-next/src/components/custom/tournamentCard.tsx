import { TournamentDto } from "@/lib/types";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import Link from "next/link";

interface TournamentCardProps {
  tournament: TournamentDto;
  editPage?: boolean;
}

const TournamentCard: FunctionComponent<TournamentCardProps> = ({
  tournament,
  editPage = false,
}) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-[1fr_2fr] gap-6 pt-4">
        <div className="relative h-full">
          <Image
            src={tournament.imageUrl}
            alt="Tournament Image"
            height={300}
            width={300}
            className="rounded-md"
          />
        </div>

        <div className="text-sm md:text-lg flex flex-col gap-2">
          <div
            className={`grid ${editPage ? "grid-cols-[85%_15%]" : "grid-cols-1"} gap-2`}
          >
            <h2 className="font-semibold">Name: {tournament.name}</h2>
            {editPage && (
              <div className="flex justify-center gap-4">
                <Link
                  href={`/live/dashboard/tournament/edit/${tournament.id}`}
                  className="flex items-center"
                >
                  <Pencil />
                </Link>
                <Trash />
              </div>
            )}
          </div>
          <h3 className="font-semibold">Casino: {tournament.casinoName}</h3>
          <p className="font-semibold">
            Start: {format(tournament.startTime, "dd/MM/yyyy HH:mm")}
          </p>
          <div className="border-2 rounded-md p-4 text-sm text-gray-700 flex-1 whitespace-pre-wrap">
            {tournament.information}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
