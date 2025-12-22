// File: app/genre/[slug]/loading.jsx

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-4 w-16 bg-gray-800 rounded"></div>
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 w-32 bg-gray-800 rounded"></div>
          </div>

          {/* Title section */}
          <div className="max-w-4xl mb-8">
            <div className="h-10 w-48 bg-gray-800 rounded-full mb-4"></div>
            <div className="h-12 bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-800 rounded w-1/2"></div>
          </div>

          {/* Stats skeleton */}
          <div className="flex flex-wrap gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
                <div>
                  <div className="h-4 w-20 bg-gray-800 rounded mb-2"></div>
                  <div className="h-6 w-16 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Action bar skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl">
          <div>
            <div className="h-6 w-40 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="h-4 w-20 bg-gray-800 rounded mb-1"></div>
              <div className="h-5 w-32 bg-gray-800 rounded"></div>
            </div>
            <div className="h-10 w-32 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Anime grid skeleton with shimmer effect */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-shimmer z-10"></div>
              
              {/* Poster skeleton */}
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 overflow-hidden">
                {/* Badge positions */}
                <div className="absolute top-3 left-3">
                  <div className="h-6 w-10 bg-gray-700/80 rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-12 bg-gray-700/80 rounded-full"></div>
                </div>
              </div>

              {/* Title and info skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 bg-gray-800 rounded"></div>
                  <div className="h-3 w-12 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-gray-800 rounded-lg"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-10 bg-gray-800 rounded-lg"></div>
            ))}
            <div className="h-10 w-24 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Related genres skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-gray-800 rounded mb-6"></div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-24 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Genre info skeleton */}
        <div className="mt-16 bg-gray-900/50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gray-800 rounded-xl"></div>
            <div>
              <div className="h-8 w-64 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-800 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="h-4 flex-1 bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-6 w-40 bg-gray-800 rounded mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 w-28 bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
          }
