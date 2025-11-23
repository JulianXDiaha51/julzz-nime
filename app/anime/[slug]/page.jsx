import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';
import ShareButton from '../../components/ShareButton';
import { Api, Config } from "@/app/config";

async function getAnimeDetail(slug) {
  try {
    const res = await fetch(`${Api}/anime/${slug}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Gagal mengambil detail anime:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
    const animeData = await getAnimeDetail(params.slug);
    if (!animeData || !animeData.data) {
        return {
            title: 'Anime Tidak Ditemukan'
        }
    }
    return {
        title: `${Config.name} - ${animeData.data.english}`,
        description: animeData.data.synopsis.paragraphs[0],
    }
}

export default async function DetailPage({ params }) {
  const animeData = await getAnimeDetail(params.slug);

  if (!animeData || !animeData.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">404 | Anime Tidak Ditemukan</h1>
      </div>
    );
  }

  const {
    english: title,
    japanese,
    poster,
    score,
    producers,
    type,
    status,
    episodes,
    duration,
    aired,
    studios,
    genreList,
    synopsis,
    batchList,
    episodeList,
  } = animeData.data;

  const DetailItem = ({ label, value }) => (
    <div>
      <span className="font-bold text-gray-200">{label}: </span>
      <span className="text-gray-400">{value}</span>
    </div>
  );

  return (
    <>
    <Head>
      <link rel="icon" href={poster} />
    </Head>
    <div className="container mx-auto px-4 py-10">
      <section className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Image
            src={poster}
            alt={`Poster ${title}`}
            width={350}
            height={500}
            className="w-full rounded-lg object-cover shadow-lg shadow-pink-500/10"
            priority
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{title}</h1>
          <p className="text-lg text-gray-400 mb-4">{japanese}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {genreList.map((genre) => (
              <span key={genre.genreId} className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                {genre.title}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <ShareButton title={title} slug={params.slug} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 border-l-4 border-red-500 pl-3">Sinopsis</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed mb-6">
            {synopsis.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <DetailItem label="Rating" value={`⭐ ${score.value} (by ${score.users} users)`} />
            <DetailItem label="Status" value={status} />
            <DetailItem label="Produser" value={producers} />
            <DetailItem label="Total Episode" value={episodes} />
            <DetailItem label="Tipe" value={type} />
            <DetailItem label="Durasi" value={duration} />
            <DetailItem label="Studio" value={studios} />
            <DetailItem label="Tanggal Tayang" value={aired} />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-red-500 pl-3">Daftar Episode</h2>
        {batchList && batchList.length > 0 && (
          <Link href={batchList[0].samehadakuUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-600 text-white font-bold py-2 px-5 rounded-lg mb-4 transition-transform hover:scale-105">
            Download Batch
          </Link>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {episodeList.map((episode) => (
            <Link 
              key={episode.episodeId} 
              href={`/episode/${episode.episodeId}`}
              className="block bg-gray-800 text-gray-300 text-center p-3 rounded-md hover:bg-red-500 hover:text-white transition-colors truncate"
            >
              Episode {episode.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}