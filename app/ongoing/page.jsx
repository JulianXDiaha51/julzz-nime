// File: app/ongoing/page.jsx
import { Suspense } from 'react';
import AnimeCard from '@/components/AnimeCard';
import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchOngoingAnime } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata() {
  return await generateMetadata({
    title: 'Anime Sedang Tayang',
    description: 'Daftar anime yang sedang tayang saat ini. Pantau episode terbaru setiap minggu dan jangan sampai ketinggalan update.',
    keywords: 'anime ongoing, anime sedang tayang, anime update, episode baru, season terbaru',
  });
}

// Main anime list component
async function OngoingAnimeList({ page }) {
  const data = await fetchOngoingAnime(page);
  
  if (!data.animeList?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Anime Sedang Tayang</h3>
          <p className="text-gray-400 mb-6">
            Saat ini belum ada anime yang sedang tayang. Coba kunjungi halaman anime completed atau trending.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/completed" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
              Anime Sudah Tamat
            </a>
            <a href="/trending" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
              Anime Trending
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Anime Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {data.animeList.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            anime={anime}
            showScore
            showType
            showEpisodeCount
            showStatus
            variant="ongoing"
          />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && (
        <div className="mt-10">
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            hasNextPage={data.pagination.hasNextPage}
            hasPrevPage={data.pagination.hasPrevPage}
            basePath="/ongoing"
            showPageNumbers
            showFirstLast
          />
        </div>
      )}
    </>
  );
}

// Loading skeleton for ongoing page
function OngoingLoading() {
  return (
    <>
      {/* Anime grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-800 rounded mb-1"></div>
            <div className="h-3 bg-gray-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      
      {/* Pagination skeleton */}
      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-10 bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    </>
  );
}

// Main page component
export default async function OngoingPage({ searchParams }) {
  const currentPage = Math.max(1, parseInt(searchParams.page) || 1);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-medium rounded-full">
                Sedang Tayang
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">Update mingguan</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Anime
              <br />
              <span className="text-yellow-500">Sedang Tayang</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Pantau anime yang sedang tayang saat ini. Dapatkan episode baru setiap minggu dan 
              nikmati cerita yang sedang berkembang.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-400">Anime Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Update</div>
                <div className="text-sm text-gray-400">Setiap Minggu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Subtitles</div>
                <div className="text-sm text-gray-400">Tersedia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Semua Anime Sedang Tayang</h2>
            <p className="text-sm text-gray-400">
              Halaman <span className="text-white font-medium">{currentPage}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Filter oleh</div>
              <div className="text-white font-medium">Season • Studio • Genre</div>
            </div>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter & Sort
            </button>
          </div>
        </div>

        {/* Anime List with Suspense */}
        <Suspense fallback={<OngoingLoading />}>
          <OngoingAnimeList page={currentPage} />
        </Suspense>

        {/* Season Info */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Season {new Date().getFullYear()}</h3>
                <p className="text-gray-400">Anime yang tayang musim ini</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Musim Saat Ini</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <span className="text-gray-300">Winter {new Date().getFullYear()}</span>
                      <span className="text-xs text-gray-500 ml-2">(Jan - Mar)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <span className="text-gray-300">Spring {new Date().getFullYear()}</span>
                      <span className="text-xs text-gray-500 ml-2">(Apr - Jun)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <span className="text-gray-300">Summer {new Date().getFullYear()}</span>
                      <span className="text-xs text-gray-500 ml-2">(Jul - Sep)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <span className="text-gray-300">Fall {new Date().getFullYear()}</span>
                      <span className="text-xs text-gray-500 ml-2">(Oct - Dec)</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Tips Menonton</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                      <span className="text-yellow-500 text-sm font-bold">①</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Episode baru biasanya tayang setiap minggu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                      <span className="text-yellow-500 text-sm font-bold">②</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Subtitles tersedia beberapa jam setelah tayang</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                      <span className="text-yellow-500 text-sm font-bold">③</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Gunakan fitur pengingat untuk tidak ketinggalan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pages */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Lihat Juga</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/completed" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-red-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">Anime Sudah Tamat</h4>
              </div>
              <p className="text-gray-400 text-sm">Tonton anime yang sudah selesai tayang tanpa menunggu update</p>
            </a>
            
            <a href="/schedule" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-green-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">Jadwal Tayang</h4>
              </div>
              <p className="text-gray-400 text-sm">Lihat jadwal rilis anime setiap hari</p>
            </a>
            
            <a href="/trending" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">Anime Trending</h4>
              </div>
              <p className="text-gray-400 text-sm">Temukan anime yang sedang populer saat ini</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
            }
