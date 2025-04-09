import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8 flex flex-col h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between lg:justify-normal lg:gap-6 xl:gap-24 items">
        <div>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
            Add or Edit Tournaments
          </h1>
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-40" /> {/* Button Skeleton */}
        </div>
      </div>

      {/* Tournaments Grid Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
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

      {/* No Tournaments Placeholder */}
      <div className="flex justify-center items-center h-2/3 flex-col">
        <Skeleton className="h-6 w-1/2 mb-4" /> {/* Placeholder Text */}
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}