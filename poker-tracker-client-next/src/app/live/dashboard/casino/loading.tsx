import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          <Skeleton className="h-8 w-1/2" />
        </h1>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="cursor-pointer hover:bg-sidebar-accent">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
