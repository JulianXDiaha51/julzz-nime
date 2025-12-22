// File: app/schedule/loading.jsx

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge skeleton */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-6 w-32 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-gray-800 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-800 rounded w-2/3 mx-auto"></div>
            </div>
            
            {/* Description skeleton */}
            <div className="max-w-3xl mx-auto mb-8">
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
        {/* Timezone info skeleton */}
        <div className="mb-10 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
              <div>
                <div className="h-4 w-32 bg-gray-800 rounded mb-2"></div>
                <div className="h-5 w-48 bg-gray-800 rounded"></div>
              </div>
            </div>
            <div className="h-10 w-40 bg-gray-800 rounded-lg"></div>
          </div>
        </div>

        {/* Week navigation skeleton */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day, i) => (
              <div key={day} className="h-12 w-24 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
          <div className="h-6 w-64 bg-gray-800 rounded"></div>
        </div>

        {/* Schedule days skeleton */}
        <div className="space-y-12">
          {[1, 2, 3, 4, 5, 6, 7].map(dayIndex => (
            <section key={dayIndex} className="relative">
              {/* Day header skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-800 rounded-xl"></div>
                  <div>
                    <div className="h-8 w-32 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-800 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-20 bg-gray-800 rounded mb-2"></div>
                  <div className="h-6 w-16 bg-gray-800 rounded"></div>
                </div>
              </div>

              {/* Anime list skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(animeIndex => (
                  <div key={animeIndex} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                    <div className="flex gap-4">
                      {/* Poster skeleton */}
                      <div className="w-20 h-28 bg-gray-800 rounded-lg"></div>
                      
                      {/* Info skeleton */}
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-gray-800 rounded w-full"></div>
                        <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="h-4 w-24 bg-gray-800 rounded"></div>
                          <div className="h-3 w-12 bg-gray-800 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Info sections skeleton */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
              <div className="h-8 w-48 bg-gray-800 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
              <div className="h-8 w-32 bg-gray-800 rounded"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-800 rounded"></div>
                    <div className="h-3 w-48 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
