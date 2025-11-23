// File: app/page.js

import AnimeCard from './components/AnimeCard';
import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from './components/SearchIcon';
import { Config } from './config';
import SearchBar from './components/SearchBar';

// Fungsi Fetch baru
async function getHomeData() {
  const res = await fetch('https://www.sankavollerei.com/anime/samehadaku/home', {
    next: { revalidate: 3600 } // Revalidasi data setiap 1 jam
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data dari API Samehadaku');
  }
  return res.json();
}

export default async function HomePage() {
  const homeApi = await getHomeData();
  const { recent, movie, top10 } = homeApi.data;

  // Logika untuk anime random di hero section (pakai data 'recent')
  const randomAnime = recent.animeList[Math.floor(Math.random() * recent.animeList.length)];

  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      
      {/* Hero Section (tidak berubah) */}
      <section className="flex flex-col items-center justify-center text-center px-4 mb-16">
        <div className="relative mb-4 md:mb-6">
          <Image
            src={Config.logo}
            alt="Hero GIF" width={160} height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-500/50 object-cover shadow-lg shadow-pink-500/20"
            unoptimized={true}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
          {Config.name}
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-md">
          {Config.description}
        </p>
        <SearchBar />
        <div className="text-gray-500 text-sm mb-10">
          <span>Top search:</span>
          <span className="ml-2 text-gray-400">Kimetsu no Yaiba, One Piece, Jujutsu Kaisen</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={Config.donateLink} target="_blank" rel="noopener noreferrer" className="border-2 border-pink-500 text-pink-500 font-bold py-3 px-10 rounded-full transition-all duration-300 hover:bg-pink-500 hover:text-white">
            Donate
          </Link>
          <Link href={`/anime/${randomAnime.animeId}`} className="bg-pink-600 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 hover:bg-pink-700 shadow-lg shadow-pink-500/20 transform hover:scale-105">
            Watch Anime
          </Link>
        </div>
      </section>

      {/* Bagian Rilisan Terbaru */}
      <h2 id="recent-anime" className="text-4xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Rilisan Terbaru
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recent.animeList.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            slug={anime.animeId}
            poster={anime.poster}
            title={anime.title}
            info={`Eps ${anime.episodes}`}
            releasedOn={anime.releasedOn}
          />
        ))}
      </div>

      {/* Bagian Top 10 Populer */}
      <h2 className="text-4xl font-bold text-white mt-12 mb-6 border-l-4 border-red-500 pl-4">
        Top 10 Populer
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {top10.animeList.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            slug={anime.animeId}
            poster={anime.poster}
            title={anime.title}
            rating={anime.score}
            rank={anime.rank}
          />
        ))}
      </div>

      {/* Bagian Rekomendasi Movie */}
      <h2 className="text-4xl font-bold text-white mt-12 mb-6 border-l-4 border-red-500 pl-4">
        Rekomendasi Movie
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movie.animeList.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            slug={anime.animeId}
            poster={anime.poster}
            title={anime.title}
            info="Movie"
            releasedOn={anime.releaseDate}
          />
        ))}
      </div>
    </main>
  );
}