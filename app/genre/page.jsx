import Link from 'next/link';
import { Api, Config } from '../config';

async function getGenres() {
  try {
    const res = await fetch(`${Api}/genres`, {
      next: { revalidate: 3600 * 24 }
    });
    if (!res.ok) throw new Error('Gagal mengambil daftar genre');
    const data = await res.json();
    return data.data.genreList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const metadata = {
  title: `${Config.name} - Daftar Genre Anime`,
  description: 'Jelajahi anime berdasarkan genre favoritmu.',
};

export default async function GenrePage() {
  const genres = await getGenres();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10">
        Daftar Genre
      </h1>

      {genres && genres.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.genreId}
              href={`/genre/${genre.genreId}`}
              className="bg-gray-800/70 p-4 rounded-lg text-center font-semibold text-gray-200 transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-105"
            >
              {genre.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Gagal memuat daftar genre.</p>
        </div>
      )}
    </main>
  );
}