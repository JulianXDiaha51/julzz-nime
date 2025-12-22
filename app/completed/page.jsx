// File: app/completed/page.jsx
import { Suspense } from 'react';
import AnimeCard from '@/components/AnimeCard';
import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchCompletedAnime } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata untuk SEO
export async function generateMetadata() {
  return await generateMetadata({
    title: 'Anime Selesai',
    description: 'Daftar lengkap anime yang sudah tamat dan bisa ditonton langsung tanpa menunggu update.',
  });
}

// Komponen utama yang async
async function CompletedAnimeList({ page }) {
  const data = await fetchCompletedAnime(page);
  
  if (!data.animeList?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Anime Selesai</h3>
          <p className="text-gray-400">
            Data anime yang sudah selesai masih kosong. Coba lagi nanti atau kunjungi halaman lainnya.
          </p>
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
            basePath="/completed"
            showPageNumbers
            showFirstLast
          />
        </div>
      )}
    </>
  );
}

// Loading skeleton untuk suspense
function CompletedLoading() {
  return (
    <>
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
export default async function CompletedPage({ searchParams }) {
  const currentPage = Math.max(1, parseInt(searchParams.page) || 1);

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-500 text-sm font-medium rounded-full">
                Completed
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">Total tayang</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Anime <span className="text-red-500">Sudah Tamat</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Koleksi anime yang sudah selesai tayang. Tonton langsung tanpa menunggu update mingguan!
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Semua Anime Selesai</h2>
            <p className="text-sm text-gray-400">
              Halaman <span className="text-white font-medium">{currentPage}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Total ditemukan</div>
              <div className="text-white font-semibold">
                <span className="text-red-500">●</span> 1000+ anime
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Anime List dengan Suspense */}
        <Suspense fallback={<CompletedLoading />}>
          <CompletedAnimeList page={currentPage} />
        </Suspense>

        {/* Info Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-3">
              📺 Nikmati Anime Tanpa Tunggu
            </h3>
            <p className="text-gray-400 text-sm">
              Semua anime di halaman ini sudah selesai tayang. Anda bisa menontonnya dari episode 1 
              sampai tamat tanpa jeda. Perfect untuk maraton weekend!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
      }
