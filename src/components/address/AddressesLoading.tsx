import { Skeleton } from "@/components/ui/skeleton";

export default function AddressesLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-64 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-36 bg-gray-200 dark:bg-gray-700" />
          </div>
          
          {/* Grid de skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
                <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-64 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-56 bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}