import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import { Api, Config } from '../config';

async function getAnimeList(page = 1) {
  try {
    const res = await fetch(`${Api}/ongoing?page=${page}`);
    if (!res.ok) {
      console.error("API response not OK:", res.status, res.statusText);
      throw new Error('Gagal mengambil data ongoing');
    }
    const data = await res.json();
    if (data && data.data) {
      return data.data;
    } else {
      console.warn("API response missing 'data' object:", data);
      return { animeList: [], pagination: null };
    }
  } catch (error) {
    console.error(error);
    return { animeList: [], pagination: null };
  }
}

export const metadata = {
  title: `${Config.name} - Anime Ongoing`,
  description: 'Daftar anime yang sedang tayang.',
};

export default async function OngoingPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { animeList, pagination } = await getAnimeList(page);
  console.log("Data Pagination:", pagination);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Anime Ongoing</h1>
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
            <Pagination
              currentPage={pagination.currentPage}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              basePath="/ongoing"
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Tidak ada anime ongoing yang ditemukan.</p>
        </div>
      )}
    </main>
  );
}