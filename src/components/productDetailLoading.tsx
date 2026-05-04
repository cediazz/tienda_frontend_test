import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Grid de detalle - 2 columnas en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Información skeleton */}
          <div className="space-y-6">
            {/* Título */}
            <Skeleton className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            
            {/* Categoría */}
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            
            {/* Precio */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-10 w-40 bg-gray-300 dark:bg-gray-600 animate-pulse" />
            </div>
            
            {/* Descripción */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
            
            {/* Rating */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-40 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-md" />
              <Skeleton className="h-12 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
