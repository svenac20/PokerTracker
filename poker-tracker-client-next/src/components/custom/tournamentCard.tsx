import { TournamentDto } from "@/lib/types";
import { format, toZonedTime } from "date-fns-tz"; // Import date-fns-tz
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Card, CardContent } from "../ui/card";
import DeleteTournamentDialog from "./deleteTournamentDialog";

interface TournamentCardProps {
  tournament: TournamentDto;
  editPage?: boolean;
}

const TournamentCard: FunctionComponent<TournamentCardProps> = ({
  tournament,
  editPage = false,
}) => {
  const localStartTime = toZonedTime(tournament.startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);
  return (
    <Card className="hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">
      <CardContent className="grid grid-cols-[45%_55%] md:grid-cols-[1fr_2fr] gap-2 md:gap-6 pt-4">
        <div className="relative 2xl:h-[350px]">
          <Image
            src={tournament.imageUrl}
            alt="Tournament Image"
            fill
            priority
            className="rounded-md"
          />
        </div>

        <div className="text-sm md:text-lg flex flex-col gap-2">
          <div
            className={`grid ${editPage ? "grid-cols-[85%_15%]" : "grid-cols-1"} gap-2`}
          >
            <div className="flex items-center justify-center sm:justify-normal">
              <h2 className="font-semibold">{tournament.name}</h2>
            </div>
            {editPage && (
              <div className="flex justify-center gap-4 flex-col sm:flex-row">
                <Link
                  href={`/live/dashboard/tournament/edit/${tournament.id}`}
                  className="flex items-center"
                >
                  <Pencil />
                </Link>
                <DeleteTournamentDialog tournament={tournament} />
              </div>
            )}
          </div>
          <h3 className="font-semibold">{tournament.casinoName}</h3>
          <p className="font-semibold">
            Start: {format(localStartTime, "dd/MM HH:mm")}
          </p>
          <div className="border-2 rounded-md p-4 text-sm text-gray-700 flex-1 whitespace-pre-wrap break-words">
            {tournament.information}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
