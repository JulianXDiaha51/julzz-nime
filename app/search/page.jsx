// File: app/search/page.jsx
import { Suspense } from 'react';
import AnimeCard from '@/components/AnimeCard';
import SearchResultsInfo from '@/components/Search/SearchResultsInfo';
import SearchFilters from '@/components/Search/SearchFilters';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { searchAnime } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata({ searchParams }) {
  const query = searchParams.q || '';
  
  return await generateMetadata({
    title: query ? `Cari "${query}"` : 'Pencarian Anime',
    description: query 
      ? `Hasil pencarian untuk "${query}" - Temukan anime terbaik yang sesuai dengan pencarianmu.`
      : 'Cari anime favoritmu berdasarkan judul, genre, atau kata kunci.',
    keywords: query ? `anime ${query}, cari ${query}, ${query}` : 'pencarian anime, cari anime, anime search',
  });
}

// Main search results component
async function SearchResults({ query }) {
  if (!query || query.trim().length < 2) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Masukkan Kata Kunci</h3>
          <p className="text-gray-400 mb-6">
            Silakan masukkan kata kunci pencarian minimal 2 karakter.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/trending" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
              Lihat Anime Trending
            </a>
            <a href="/genre" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
              Jelajahi Genre
            </a>
          </div>
        </div>
      </div>
    );
  }

  const results = await searchAnime(query);
  
  if (!results?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Tidak ditemukan hasil untuk "{query}"
          </h3>
          <p className="text-gray-400 mb-6">
            Coba gunakan kata kunci yang berbeda, atau jelajahi anime populer lainnya.
          </p>
          
          {/* Search suggestions */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-white mb-3">Coba cari dengan:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {['One Piece', 'Jujutsu Kaisen', 'Demon Slayer', 'Attack on Titan'].map((suggestion) => (
                <a
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  {suggestion}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Results info */}
      <SearchResultsInfo 
        query={query} 
        count={results.length} 
        searchTime={Math.floor(Math.random() * 300) + 100} // Mock search time
      />
      
      {/* Filters */}
      <SearchFilters />
      
      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {results.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            anime={anime}
            showScore
            showType
            showEpisodeCount
            highlightQuery={query}
            variant="search"
          />
        ))}
      </div>
      
      {/* Pagination for search results */}
      {results.length >= 24 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-medium transition-colors">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Loading skeleton for search page
function SearchLoading() {
  return (
    <>
      {/* Search query skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-800 rounded w-1/2"></div>
      </div>
      
      {/* Filters skeleton */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-32 bg-gray-800 rounded-lg"></div>
        ))}
      </div>
      
      {/* Results grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-800 rounded mb-1"></div>
            <div className="h-3 bg-gray-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </>
  );
}

// Main page component
export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const decodedQuery = decodeURIComponent(query);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-white font-medium" aria-current="page">
                Pencarian
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            {/* Search icon */}
            <div className="mb-6">
              <div className="inline-flex p-3 bg-gray-800 rounded-xl">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {query ? (
                <>
                  Hasil Pencarian
                  <br />
                  <span className="text-red-500">"{decodedQuery}"</span>
                </>
              ) : (
                'Pencarian Anime'
              )}
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              {query 
                ? `Menemukan anime terbaik yang sesuai dengan pencarianmu "${decodedQuery}"`
                : 'Cari anime favoritmu berdasarkan judul, genre, studio, atau tahun rilis.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Search form */}
        <div className="mb-10">
          <form action="/search" method="GET" className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="search"
                name="q"
                defaultValue={decodedQuery}
                placeholder="Cari anime, genre, studio, atau tahun..."
                className="w-full px-6 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                autoComplete="off"
                aria-label="Search anime"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Cari
              </button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500">Cepat:</span>
              {['Action', 'Romance', '2023', 'Movie', 'Ghibli'].map((quick) => (
                <a
                  key={quick}
                  href={`/search?q=${encodeURIComponent(quick)}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {quick}
                </a>
              ))}
            </div>
          </form>
        </div>

        {/* Search Results with Suspense */}
        <Suspense fallback={<SearchLoading />}>
          <SearchResults query={decodedQuery} />
        </Suspense>

        {/* Alternative suggestions */}
        {query && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              Mungkin yang Anda Maksud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/trending" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-red-500/30 rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Anime Trending</h4>
                </div>
                <p className="text-gray-400 text-sm">Lihat anime yang sedang populer saat ini</p>
              </a>
              
              <a href="/ongoing" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-yellow-500/30 rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Sedang Tayang</h4>
                </div>
                <p className="text-gray-400 text-sm">Anime yang sedang tayang saat ini</p>
              </a>
              
              <a href="/genre" className="bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Jelajahi Genre</h4>
                </div>
                <p className="text-gray-400 text-sm">Temukan anime berdasarkan kategori</p>
              </a>
            </div>
          </div>
        )}

        {/* Search tips */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Tips Pencarian</h3>
              <p className="text-gray-400">Gunakan fitur pencarian dengan optimal</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Tips Efektif</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">Gunakan kata kunci spesifik (judul, studio, tahun)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">Coba berbagai ejaan jika tidak ditemukan</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">Minimal 2 karakter untuk pencarian</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Contoh Pencarian</h4>
              <div className="flex flex-wrap gap-2">
                <a href="/search?q=action+2023" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-colors">
                  action 2023
                </a>
                <a href="/search?q=studio+ghibli" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-colors">
                  studio ghibli
                </a>
                <a href="/search?q=movie" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-colors">
                  movie
                </a>
                <a href="/search?q=shonen" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-colors">
                  shonen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
              }
