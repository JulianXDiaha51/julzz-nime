// File: app/loading.jsx

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Title Skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-gray-800 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-800 rounded w-1/2 mx-auto"></div>
            </div>
            
            {/* Search Bar Skeleton */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="h-14 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Stats Skeleton */}
            <div className="flex justify-center gap-8 mb-12">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-center">
                  <div className="h-10 bg-gray-800 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-800 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-800 rounded w-28"></div>
        </div>

        {/* Anime Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="group">
              {/* Poster Skeleton with gradient */}
              <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-3 overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-shimmer"></div>
                
                {/* Badge positions */}
                <div className="absolute top-3 left-3">
                  <div className="h-6 w-10 bg-gray-700/80 rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-12 bg-gray-700/80 rounded-full"></div>
                </div>
              </div>

              {/* Title and Info Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gray-800 rounded w-16"></div>
                  <div className="h-3 bg-gray-800 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-gray-800 rounded-lg"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-10 bg-gray-800 rounded-lg"></div>
            ))}
            <div className="h-10 w-24 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Featured Section Skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gray-800 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64 bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
