import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

const HomePageLoading: FunctionComponent = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <div className="flex gap-4 flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-12 rounded-full w-full" />
        ))}
      </div>
    </>
  );
};

export default HomePageLoading;
