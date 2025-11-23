import AnimeCard from '../components/AnimeCard';
import { Api } from '../config';


async function searchAnime(query) {
  if (!query) {
    return [];
  }
  try {
    const res = await fetch(`${Api}/search?q=${query}`);
    if (!res.ok) {
      throw new Error('Gagal melakukan pencarian');
    }
    const data = await res.json();
    return data.data.animeList; 
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const searchResults = await searchAnime(query);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Hasil Pencarian untuk: <span className="text-pink-500">"{query}"</span>
      </h1>

      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {searchResults.map((anime) => (
            <AnimeCard
              key={anime.animeId}
              slug={anime.animeId}
              poster={anime.poster}
              title={anime.title}
              info={anime.type}
              rating={anime.score}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Yah, tidak ada hasil yang ditemukan.</p>
          <p className="text-gray-500 mt-2">Coba gunakan kata kunci lain.</p>
        </div>
      )}
    </main>
  );
}