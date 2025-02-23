import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
        Current poker games
      </h1>
      <div className="flex gap-4 flex-col">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton className="h-36 rounded-md w-full" key={index} />
        ))}
      </div>{" "}
    </>
  );
}
