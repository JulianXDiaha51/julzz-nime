// File: app/genre/page.jsx
import Link from 'next/link';
import { Suspense } from 'react';
import GenreCard from '@/components/GenreCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchGenres } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata() {
  return await generateMetadata({
    title: 'Genre Anime',
    description: 'Jelajahi koleksi anime berdasarkan genre favoritmu. Dari Action hingga Romance, temukan anime terbaik di setiap kategori.',
    keywords: 'genre anime, kategori anime, action, romance, comedy, fantasy, adventure',
  });
}

// Main genre list component
async function GenreList() {
  const genres = await fetchGenres();
  
  if (!genres?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Genre Tidak Tersedia</h3>
          <p className="text-gray-400">
            Maaf, daftar genre anime sedang tidak dapat diakses. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
      {genres.map((genre) => (
        <GenreCard
          key={genre.genreId}
          genre={genre}
          showCount
          showIcon
        />
      ))}
    </div>
  );
}

// Loading skeleton for genres
function GenreLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-800 rounded-xl mb-2"></div>
          <div className="h-4 bg-gray-800 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// Main page component
export default async function GenrePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-red-500/20 text-red-500 text-sm font-medium rounded-full">
                Kategori
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">Total genre tersedia</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Jelajahi Anime
              <br />
              <span className="text-red-500">Berdasarkan Genre</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Temukan anime terbaik dari berbagai kategori. Dari petualangan epik hingga cerita romantis, 
              kami punya semua yang kamu cari.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24+</div>
                <div className="text-sm text-gray-400">Genre Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10,000+</div>
                <div className="text-sm text-gray-400">Anime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Terupdate</div>
                <div className="text-sm text-gray-400">Setiap Hari</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Semua Genre Anime</h2>
            <p className="text-gray-400 text-sm">
              Pilih genre favoritmu dan mulai jelajahi dunia anime yang menarik
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Urutkan:
            </div>
            <select 
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue="popular"
            >
              <option value="popular">Paling Populer</option>
              <option value="name">A-Z</option>
              <option value="count">Jumlah Anime</option>
            </select>
          </div>
        </div>

        {/* Genre Grid with Suspense */}
        <Suspense fallback={<GenreLoading />}>
          <GenreList />
        </Suspense>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Tentang Genre Anime</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Genre membantu kamu menemukan anime sesuai selera. Setiap genre memiliki karakteristik unik 
              dan cerita yang berbeda. Jelajahi berbagai kategori untuk pengalaman menonton yang lebih personal.
            </p>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Genre Paling Populer</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Action', 'Romance', 'Comedy', 'Fantasy', 'Adventure'].map((genre) => (
                <span key={genre} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg">
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Genre-genre ini selalu menjadi favorit para penggemar anime.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tidak Tahu Genre Apa yang Harus Ditonton?
            </h3>
            <p className="text-gray-400 mb-6">
              Coba fitur rekomendasi kami untuk menemukan anime terbaik berdasarkan preferensimu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trending"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Lihat Anime Trending
              </Link>
              <Link
                href="/completed"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Anime Sudah Tamat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
      }
