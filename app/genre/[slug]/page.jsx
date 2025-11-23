import Link from 'next/link';
import AnimeCard from '../../components/AnimeCard';
import { Api, Config } from '@/app/config';

const PaginationControls = ({ currentPage, hasNextPage, hasPrevPage, genreSlug }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      {hasPrevPage ? (
        <Link 
          href={`/genre/${genreSlug}?page=${currentPage - 1}`}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          &laquo; Sebelumnya
        </Link>
      ) : (
        <span className="bg-gray-700 text-gray-500 font-bold py-2 px-6 rounded-lg cursor-not-allowed">
          &laquo; Sebelumnya
        </span>
      )}

      <span className="font-semibold text-lg text-white">
        Halaman {currentPage}
      </span>

      {hasNextPage ? (
        <Link 
          href={`/genre/${genreSlug}?page=${currentPage + 1}`}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Selanjutnya &raquo;
        </Link>
      ) : (
        <span className="bg-gray-700 text-gray-500 font-bold py-2 px-6 rounded-lg cursor-not-allowed">
          Selanjutnya &raquo;
        </span>
      )}
    </div>
  );
};

async function getAnimeByGenre(slug, page = 1) {
  try {
    const res = await fetch(`${Api}/genres/${slug}?page=${page}`);
    if (!res.ok) throw new Error('Gagal mengambil data genre');
    const data = await res.json();
    return data.data; 
  } catch (error) {
    console.error(error);
    return { animeList: [], pagination: null };
  }
}

export async function generateMetadata({ params }) {
  const genreTitle = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `${Config.name} - Anime Genre ${genreTitle}`,
  };
}

export default async function GenreSlugPage({ params, searchParams }) {
  const { slug } = params;
  const page = parseInt(searchParams.page || '1');
  
  const { animeList, pagination } = await getAnimeByGenre(slug, page);
  const genreTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Genre: <span className="text-pink-500">{genreTitle}</span>
      </h1>

      {animeList && animeList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animeList.map((anime) => (
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
          {pagination && (
            <PaginationControls
              currentPage={pagination.currentPage}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              genreSlug={slug}
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Tidak ada anime yang ditemukan untuk genre ini.</p>
        </div>
      )}
    </main>
  );
}