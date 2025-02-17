import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <div className="flex gap-4 flex-col">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton className="h-36 rounded-md w-full" key={index}/>
        ))}
      </div>{" "}
    </>
  );
}
