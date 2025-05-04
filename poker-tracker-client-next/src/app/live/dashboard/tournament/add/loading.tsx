import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8 flex flex-col h-full">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          <Skeleton className="h-8 w-1/2" />
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:gap-6 lg:w-2/5">
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
