import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            <Skeleton className="h-[200px] w-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 animate-pulse" />
              <div className="pt-2">
                <Skeleton className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse" />
              </div>
              <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700 animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
