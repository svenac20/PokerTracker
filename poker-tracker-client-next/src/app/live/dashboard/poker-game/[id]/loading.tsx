import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPokerGameForm() {
  <div className="py-8">
    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
      Edit poker games
    </h1>
    <div className="grid grid-cols-2 grid-rows-1">
      <div className="grid grid-cols-2 grid-rows-3 w-full gap-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-12 rounded-md w-full" key={index} />
        ))}
        <Skeleton className="h-12 rounded-md w-full col-span-2" />
      </div>
    </div>
  </div>;
}
