import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center h-full gap-4">
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
