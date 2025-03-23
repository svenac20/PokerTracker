import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
        <Skeleton className="h-8 w-3/4" />
      </h1>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="mb-4">
            <Skeleton className="h-24 w-full" />
          </li>
        ))}
      </ul>
    </>
  );
}
