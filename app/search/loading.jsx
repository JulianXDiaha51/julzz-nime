// File: app/ongoing/loading.jsx

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge skeleton */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-6 w-40 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-gray-800 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-800 rounded w-3/5 mx-auto"></div>
            </div>
            
            {/* Description skeleton */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6 mx-auto"></div>
            </div>
            
            {/* Stats skeleton */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="text-center">
                  <div className="h-10 bg-gray-800 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Action bar skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl">
          <div>
            <div className="h-6 w-48 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-800 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="h-4 w-24 bg-gray-800 rounded mb-1"></div>
              <div className="h-5 w-36 bg-gray-800 rounded"></div>
            </div>
            <div className="h-10 w-36 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Anime grid skeleton with ongoing specific styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              {/* Ongoing indicator skeleton */}
              <div className="absolute top-3 left-3 z-10">
                <div className="h-6 w-16 bg-yellow-500/80 rounded-full"></div>
              </div>
              
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-shimmer z-10"></div>
              
              {/* Poster skeleton with ongoing theme */}
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 overflow-hidden">
                {/* Progress bar skeleton (for ongoing anime) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full w-1/2 bg-yellow-500"></div>
                </div>
                
                {/* Score badge skeleton */}
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-12 bg-gray-700/80 rounded-full"></div>
                </div>
              </div>

              {/* Title and info skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 bg-gray-800 rounded"></div>
                  <div className="h-3 w-16 bg-yellow-500/20 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            <div className="h-10 w-28 bg-gray-800 rounded-lg"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-10 bg-gray-800 rounded-lg"></div>
            ))}
            <div className="h-10 w-28 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Season info skeleton */}
        <div className="mt-16 bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gray-800 rounded-xl"></div>
            <div>
              <div className="h-8 w-64 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-800 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 w-40 bg-gray-800 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="h-4 flex-1 bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-800 rounded"></div>
                      <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related pages skeleton */}
        <div className="mt-16">
          <div className="h-8 w-48 bg-gray-800 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
                  <div className="h-6 w-32 bg-gray-800 rounded"></div>
                </div>
                <div className="h-3 bg-gray-800 rounded w-full"></div>
                <div className="h-3 bg-gray-800 rounded w-5/6 mt-2"></div>
              </div>
            ))}
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
