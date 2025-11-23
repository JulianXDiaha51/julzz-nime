import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import VideoPlayer from '@/app/components/VideoPlayer';
import { Api, Config } from '@/app/config';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-2.12 0l-2.12 2.12a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.5 1.5 0 0 0 2.12 0l2.12-2.12a1.5 1.5 0 0 0 0-2.12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5A2.25 2.25 0 0 1 6.75 15.75c-1.24 0-2.25-1.01-2.25-2.25 0-1.24 1.01-2.25 2.25-2.25.46 0 .88.14 1.24.37m4.02 6.38a2.25 2.25 0 0 0-2.12-2.12" />
  </svg>
);

async function getEpisodeData(slug) {
  try {
    const res = await fetch(`${Api}/episode/${slug}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Gagal mengambil data episode:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const episodeData = await getEpisodeData(params.slug);

  if (!episodeData || !episodeData.data) {
    return {
      title: 'Episode Tidak Ditemukan'
    };
  }

  const { title, synopsis } = episodeData.data;

  return {
    title: `${Config.name} - ${title}`,
    description: synopsis.paragraphs[0],
    openGraph: {
      title: title,
      description: synopsis.paragraphs[0],
    },
  };
}

export default async function EpisodePage({ params }) {
  const episodeData = await getEpisodeData(params.slug);

  if (!episodeData || !episodeData.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">404 | Episode Tidak Ditemukan</h1>
      </div>
    );
  }

  const {
    title,
    animeId,
    poster,
    defaultStreamingUrl,
    hasPrevEpisode,
    prevEpisode,
    hasNextEpisode,
    nextEpisode,
    downloadUrl,
    server,
    recommendedEpisodeList
  } = episodeData.data;

  return (
    <>
     <Head>
        <link rel="icon" href={poster} />
      </Head>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">{title}</h1>
      <VideoPlayer 
        initialStreamUrl={defaultStreamingUrl} 
        servers={server.qualities} 
      />
      <div className="flex justify-between items-center gap-2 mb-10">
  {hasPrevEpisode ? (
    <Link 
      href={`/episode/${prevEpisode.episodeId}`} 
      className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors p-3 md:px-4 md:py-2 md:gap-2"
    >
      <ArrowLeftIcon className="w-6 h-6 md:w-5 md:h-5" />
      <span className="hidden md:inline">Prev</span>
    </Link>
  ) : (
    <div className="w-12 md:w-28" />
  )}
  <Link 
    href={`/anime/${animeId}`} 
    className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-4 md:px-6 rounded-lg transition-colors text-center text-sm md:text-base whitespace-nowrap"
  >
    Semua Episode
  </Link>
  {hasNextEpisode ? (
    <Link 
      href={`/episode/${nextEpisode.episodeId}`} 
      className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors p-3 md:px-4 md:py-2 md:gap-2"
    >
      <span className="hidden md:inline">Next</span>
      <ArrowRightIcon className="w-6 h-6 md:w-5 md:h-5" />
    </Link>
  ) : (
    <div className="w-12 md:w-28" />
  )}
</div>

      <section className="bg-gray-800/50 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-3 flex items-center gap-2">
          <DownloadIcon className="w-7 h-7" />
          Link Download
        </h2>
        
        <div className="space-y-8">
          {downloadUrl.formats.map((format) => (
            <div key={format.title}>
              <h3 className="text-xl font-semibold text-pink-400 mb-3">{format.title}</h3>
              <div className="space-y-3">
                {format.qualities.map((quality) => (
                  <div key={quality.title} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="bg-gray-700 font-bold w-24 text-center py-1 rounded flex-shrink-0">{quality.title.trim()}</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {quality.urls.map((link) => (
                        <a 
                          key={link.title.trim()}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-pink-400 underline underline-offset-2 transition-colors"
                        >
                          {link.title.trim()}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
  <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-red-500 pl-3">
    Episode Lainnya
  </h2>
  <div className="flex gap-4 overflow-x-auto pb-4">
    {recommendedEpisodeList.map((recEpisode) => (
      <Link 
        key={recEpisode.href}
        href={`/episode/${recEpisode.episodeId}`} 
        className="group flex-shrink-0 w-48"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={recEpisode.poster}
            alt={recEpisode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <p className="mt-2 text-sm text-gray-300 group-hover:text-pink-400 truncate">{recEpisode.title}</p>
      </Link>
    ))}
  </div>
</section>
    </div>
  </>
  );
}