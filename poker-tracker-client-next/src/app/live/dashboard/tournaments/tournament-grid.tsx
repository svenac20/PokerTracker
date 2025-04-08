import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FunctionComponent } from "react";
import Image from "next/image";
import { TournamentDto } from "@/lib/types";

interface TournamentGridProps {
  tournaments: Record<number, TournamentDto[]>;
  casinoId: number;
}

const TournamentGrid: FunctionComponent<TournamentGridProps> = ({
  tournaments,
  casinoId,
}) => {
  return (
    <>
      {tournaments[casinoId] && tournaments[casinoId].length > 0 ? (
        <Carousel className="w-2/3">
          <CarouselContent>
            {tournaments[casinoId].map((tournament) => (
              <CarouselItem key={tournament.id} className="relative h-[500px]">
                <Image
                  src={tournament.imageUrl}
                  alt="Image of tournament"
                  fill
                  objectFit="contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-2xl">
            No tournaments available currently. Please check back later
          </h1>
        </div>
      )}
    </>
  );
};

export default TournamentGrid;
