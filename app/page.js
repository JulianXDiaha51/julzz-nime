// File: app/page.jsx
import { Suspense } from 'react';
import HeroSection from '@/components/Home/HeroSection';
import AnimeSection from '@/components/Home/AnimeSection';
import LoadingSkeleton from '@/components/Home/LoadingSkeleton';
import StatsBar from '@/components/Home/StatsBar';
import FeaturedSection from '@/components/Home/FeaturedSection';
import { fetchHomeData } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata() {
  return await generateMetadata({
    title: 'Stream Anime Gratis - Kualitas HD',
    description: 'Nonton anime terbaru dan terpopuler dengan subtitle Indonesia. Koleksi lengkap anime dari berbagai genre dengan streaming gratis dan kualitas HD.',
    keywords: 'nonton anime, anime subtitle Indonesia, anime terbaru, anime gratis, streaming anime HD',
  });
}

// Main home content component
async function HomeContent() {
  const data = await fetchHomeData();
  
  if (!data) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Data Tidak Tersedia</h3>
          <p className="text-gray-400">
            Maaf, data anime sedang tidak dapat diakses. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  const { recent, movie, top10 } = data;

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        randomAnime={recent?.animeList?.[0]}
        totalAnime={data.totalAnime || 10000}
      />

      {/* Stats Bar */}
      <StatsBar stats={{
        total: data.totalAnime || 10000,
        recent: recent?.animeList?.length || 24,
        top: top10?.animeList?.length || 10,
        movie: movie?.animeList?.length || 12,
      }} />

      {/* Recent Releases */}
      <AnimeSection
        title="Rilisan Terbaru"
        subtitle="Episode terbaru yang baru saja rilis"
        animeList={recent?.animeList}
        type="recent"
        viewAllLink="/recent"
        emptyMessage="Belum ada anime terbaru yang dirilis"
      />

      {/* Top 10 Popular */}
      <AnimeSection
        title="Top 10 Populer"
        subtitle="Anime paling populer minggu ini"
        animeList={top10?.animeList}
        type="top"
        showRank
        viewAllLink="/trending"
        emptyMessage="Belum ada data anime populer"
      />

      {/* Movie Recommendations */}
      <AnimeSection
        title="Rekomendasi Movie"
        subtitle="Film anime terbaik untuk ditonton"
        animeList={movie?.animeList}
        type="movie"
        viewAllLink="/genre/movie"
        emptyMessage="Belum ada rekomendasi movie"
      />

      {/* Featured Collections */}
      <FeaturedSection
        collections={[
          {
            title: 'Anime Musim Ini',
            description: 'Temukan anime yang sedang tayang musim ini',
            href: '/ongoing',
            count: 50,
            icon: '🌸',
            color: 'from-pink-500 to-rose-500',
          },
          {
            title: 'Sudah Tamat',
            description: 'Tonton anime lengkap dari awal sampai akhir',
            href: '/completed',
            count: 5000,
            icon: '✅',
            color: 'from-green-500 to-emerald-500',
          },
          {
            title: 'By Genre',
            description: 'Jelajahi anime berdasarkan genre favorit',
            href: '/genre',
            count: 24,
            icon: '🏷️',
            color: 'from-purple-500 to-violet-500',
          },
        ]}
      />
    </>
  );
}

// Main page component
export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Loading with suspense */}
        <Suspense fallback={<LoadingSkeleton />}>
          <HomeContent />
        </Suspense>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
              <div className="inline-flex p-3 bg-red-500/20 rounded-xl mb-6">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mulai Streaming Sekarang
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Bergabung dengan jutaan penggemar anime yang sudah menikmati koleksi terlengkap kami.
                Gratis, tanpa iklan mengganggu, dan selalu update.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/trending"
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Lihat Trending
                </a>
                <a
                  href="/schedule"
                  className="px-8 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800/70 transition-all duration-300"
                >
                  Cek Jadwal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Dapatkan Update</h3>
              <p className="text-gray-400 mb-6">
                Dapatkan notifikasi ketika anime favoritmu update episode baru.
              </p>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Email kamu"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Kami tidak akan spam email kamu. Hanya update penting tentang anime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
    }
