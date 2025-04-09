import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-2 md:py-8 flex flex-col h-full">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          <Skeleton className="h-8 w-3/4" />
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 grid grid-cols-[1fr_2fr] gap-6"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-32 w-full rounded-md" />

            {/* Text Skeleton */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-3/4" /> {/* Name */}
              <Skeleton className="h-4 w-1/2" /> {/* Casino */}
              <Skeleton className="h-4 w-1/3" /> {/* Start Date */}
              <Skeleton className="h-20 w-full" /> {/* Information */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}