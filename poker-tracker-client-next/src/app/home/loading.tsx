import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen p-0">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Skeleton className="w-64 h-64 md:w-80 md:h-80" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Overview Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-1/2 mb-6 mx-auto" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </section>

        {/* City Tabs Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-1/2 mb-8 mx-auto" />
          <div className="grid w-full grid-cols-4 gap-4 mb-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-1/2 mb-8 mx-auto" />
          <div className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-8 text-center">
          <Skeleton className="h-8 w-1/2 mb-4 mx-auto" />
          <Skeleton className="h-6 w-3/4 mb-6 mx-auto" />
          <Skeleton className="h-14 w-full" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mb-6 md:mb-0">
              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-300">
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
      </footer>
    </div>
  );
}