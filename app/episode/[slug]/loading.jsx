// File: app/anime/[slug]/loading.jsx

export default function Loading() {
  return (
    <div className="animate-pulse space-y-8 p-4 md:p-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <div className="h-4 w-20 bg-gray-800 rounded"></div>
        <div className="h-4 w-4 bg-gray-800 rounded"></div>
        <div className="h-4 w-40 bg-gray-800 rounded"></div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left column - Poster */}
        <div className="lg:col-span-1 mb-8 lg:mb-0">
          <div className="space-y-4">
            <div className="aspect-[2/3] bg-gray-800 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-10 bg-gray-800 rounded-lg"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-9 bg-gray-800 rounded-lg"></div>
                <div className="h-9 bg-gray-800 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Content */}
        <div className="lg:col-span-2">
          {/* Title skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-3"></div>
            <div className="h-5 bg-gray-800 rounded w-1/2"></div>
          </div>

          {/* Genre tags skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-7 w-24 bg-gray-800 rounded-full"></div>
            ))}
          </div>

          {/* Synopsis skeleton */}
          <div className="space-y-3 mb-8">
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-4 bg-gray-800 rounded w-full"></div>
            ))}
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>

          {/* Episodes skeleton */}
          <div>
            <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
