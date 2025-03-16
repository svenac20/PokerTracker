import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-96 flex gap-4 flex-col justify-center">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}