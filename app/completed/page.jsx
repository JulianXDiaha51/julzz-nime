import Link from 'next/link';
import AnimeCard from '../components/AnimeCard';
import { Api, Config } from '../config';

const PaginationControls = ({ currentPage, hasNextPage, hasPrevPage, listPath }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      {hasPrevPage ? (
        <Link href={`${listPath}?page=${currentPage - 1}`} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">&laquo; Sebelumnya</Link>
      ) : (
        <span className="bg-gray-700 text-gray-500 font-bold py-2 px-6 rounded-lg cursor-not-allowed">&laquo; Sebelumnya</span>
      )}
      <span className="font-semibold text-lg text-white">Halaman {currentPage}</span>
      {hasNextPage ? (
        <Link href={`${listPath}?page=${currentPage + 1}`} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Selanjutnya &raquo;</Link>
      ) : (
        <span className="bg-gray-700 text-gray-500 font-bold py-2 px-6 rounded-lg cursor-not-allowed">Selanjutnya &raquo;</span>
      )}
    </div>
  );
};

async function getAnimeList(page = 1) {
  try {
    const res = await fetch(`${Api}/completed?page=${page}`);
    if (!res.ok) throw new Error('Gagal mengambil data completed');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return { animeList: [], pagination: null };
  }
}

export const metadata = {
  title: `${Config.name} - Anime Completed`,
  description: 'Daftar anime yang sudah tamat.',
};

export default async function CompletedPage({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const { animeList, pagination } = await getAnimeList(page);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Anime Completed</h1>
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
              listPath="/completed"
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Tidak ada anime completed yang ditemukan.</p>
        </div>
      )}
    </main>
  );
}