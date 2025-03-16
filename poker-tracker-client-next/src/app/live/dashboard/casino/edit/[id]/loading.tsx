import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          <Skeleton className="h-8 w-1/2" />
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:w-1/2">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}