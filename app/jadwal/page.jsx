import Image from 'next/image';
import Link from 'next/link';
import { Api, Config } from '../config';

async function getScheduleData() {
  try {
    const res = await fetch(`${Api}/schedule`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Gagal mengambil jadwal');
    const data = await res.json();
    return data.data.days;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const metadata = {
  title: `${Config.name} - Jadwal Rilis Anime`,
  description: 'Lihat jadwal rilis anime terbaru setiap harinya.',
};

export default async function SchedulePage() {
  const schedule = await getScheduleData();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10">
        Jadwal Rilis Anime
      </h1>

      <div className="space-y-12">
        {schedule.map((day) => (
          <section key={day.day}>
            <h2 className="text-3xl font-bold text-pink-400 mb-6 border-l-4 border-pink-400 pl-4">
              {day.day}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {day.animeList.map((anime) => (
                <Link key={anime.animeId} href={`/anime/${anime.animeId}`} className="group bg-gray-800/50 rounded-lg overflow-hidden flex items-start gap-4 p-4 transition-all duration-300 hover:bg-gray-700/70 hover:scale-[1.02]">
                  <div className="relative w-20 h-28 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={anime.poster}
                      alt={anime.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-2">{anime.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{anime.genres}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      {anime.score && (
                        <span className="flex items-center gap-1 font-semibold text-yellow-400">
                          ⭐ {anime.score}
                        </span>
                      )}
                      <span className="text-green-400 font-semibold">{anime.estimation}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}