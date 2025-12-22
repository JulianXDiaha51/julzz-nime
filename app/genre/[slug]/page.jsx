// File: app/genre/[slug]/page.jsx
import { Suspense } from 'react';
import AnimeCard from '@/components/AnimeCard';
import Pagination from '@/components/Pagination';
import GenreHeader from '@/components/Genre/GenreHeader';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchAnimeByGenre, fetchGenreInfo } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const genreSlug = params.slug;
  const genreInfo = await fetchGenreInfo(genreSlug);
  const genreName = genreInfo?.title || genreSlug.charAt(0).toUpperCase() + genreSlug.slice(1);
  
  return await generateMetadata({
    title: `${genreName} Anime`,
    description: `Koleksi anime ${genreName} terbaik dengan kualitas tinggi. Temukan dan tonton anime ${genreName} favoritmu sekarang!`,
    keywords: `anime ${genreName}, ${genreName}, genre ${genreName}, anime ${genreName} terbaik`,
  });
}

// Main genre anime list component
async function GenreAnimeList({ slug, page }) {
  const data = await fetchAnimeByGenre(slug, page);
  const genreInfo = await fetchGenreInfo(slug);
  
  if (!data.animeList?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Belum Ada Anime {genreInfo?.title || 'Genre Ini'}
          </h3>
          <p className="text-gray-400 mb-6">
            Maaf, anime dengan genre ini sedang tidak tersedia. Coba genre lainnya atau kunjungi nanti.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/genre" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
              Lihat Semua Genre
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
            variant="genre"
          />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && (
        <div className="mt-10">
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={Math.ceil(data.pagination.totalItems / data.pagination.perPage)}
            hasNextPage={data.pagination.hasNextPage}
            hasPrevPage={data.pagination.hasPrevPage}
            basePath={`/genre/${slug}`}
            showPageNumbers
            showFirstLast
          />
        </div>
      )}
    </>
  );
}

// Loading skeleton for genre page
function GenreLoading() {
  return (
    <>
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </div>

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
export default async function GenreDetailPage({ params, searchParams }) {
  const genreSlug = params.slug;
  const currentPage = Math.max(1, parseInt(searchParams.page) || 1);
  
  // Fetch genre info for header
  const genreInfo = await fetchGenreInfo(genreSlug);
  const genreName = genreInfo?.title || genreSlug.charAt(0).toUpperCase() + genreSlug.slice(1);
  const genreDescription = genreInfo?.description || `Koleksi anime ${genreName} terbaik dengan kualitas tinggi.`;

  return (
    <main className="min-h-screen">
      {/* Genre Header */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black border-b border-gray-800 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <a href="/genre" className="text-gray-400 hover:text-white transition-colors">
                  Genre
                </a>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-white font-medium truncate" aria-current="page">
                {genreName}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            {/* Genre Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-500 text-sm font-medium rounded-full">
                {genreName}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">Genre Anime</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Anime <span className="text-red-500">{genreName}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed mb-6">
              {genreDescription}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total anime</div>
                  <div className="text-xl font-bold text-white">
                    <span className="text-red-500">●</span> 500+
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Terupdate</div>
                  <div className="text-xl font-bold text-white">Harian</div>
                </div>
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
            <h2 className="text-lg font-semibold text-white mb-1">
              Semua Anime {genreName}
            </h2>
            <p className="text-sm text-gray-400">
              Halaman <span className="text-white font-medium">{currentPage}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Filter oleh</div>
              <div className="text-white font-medium">Tahun • Skor • Status</div>
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
        <Suspense fallback={<GenreLoading />}>
          <GenreAnimeList slug={genreSlug} page={currentPage} />
        </Suspense>

        {/* Related Genres */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">
            Genre Terkait
          </h3>
          <div className="flex flex-wrap gap-3">
            {['Action', 'Adventure', 'Fantasy', 'Drama', 'Supernatural'].map((relatedGenre) => (
              <a
                key={relatedGenre}
                href={`/genre/${relatedGenre.toLowerCase()}`}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-medium transition-colors"
              >
                {relatedGenre}
              </a>
            ))}
          </div>
        </div>

        {/* Genre Info Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Tentang Genre {genreName}</h3>
                <p className="text-gray-400">Karakteristik dan ciri khas</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Ciri Khas</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-300">Cerita yang penuh aksi dan ketegangan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-300">Karakter dengan kemampuan khusus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-gray-300">Plot yang cepat dan dinamis</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Anime Terkenal</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm">Attack on Titan</span>
                  <span className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm">Demon Slayer</span>
                  <span className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm">Jujutsu Kaisen</span>
                  <span className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm">One Punch Man</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
        }
