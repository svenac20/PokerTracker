import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          <Skeleton className="h-8 w-1/2" />
        </h1>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-1/3" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 grid-rows-9 lg:grid-cols-2 lg:grid-rows-4 lg:gap-6">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full mb-4" />
              ))}
              <div className="sm:row-start-9 lg:col-span-2 lg:row-start-5 flex justify-center items-center">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}