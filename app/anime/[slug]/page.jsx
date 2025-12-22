// File: app/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import { Api, Config } from '@/config';

// Data fetching dengan error handling yang lebih baik
async function fetchAnimeDetail(slug) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    const response = await fetch(`${Api}/anime/${slug}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`Request timeout untuk slug: ${slug}`);
    } else {
      console.error('Gagal mengambil detail anime:', error.message);
    }
    return null;
  }
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }) {
  const data = await fetchAnimeDetail(params.slug);
  
  if (!data?.data) {
    return {
      title: 'Anime Tidak Ditemukan | ' + Config.name,
      description: 'Halaman anime tidak ditemukan atau telah dihapus.',
    };
  }
  
  const { english, synopsis, poster } = data.data;
  const description = synopsis?.paragraphs?.[0]?.substring(0, 160) || `Nonton ${english} dengan kualitas terbaik`;
  
  return {
    title: `${english} | ${Config.name}`,
    description,
    openGraph: {
      title: `${english} | ${Config.name}`,
      description,
      images: [{ url: poster, width: 350, height: 500, alt: english }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${english} | ${Config.name}`,
      description,
      images: [poster],
    },
  };
}

// Komponen kecil untuk detail item
function DetailRow({ label, children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 ${className}`}>
      <dt className="font-medium text-gray-300 min-w-[120px] flex-shrink-0">{label}</dt>
      <dd className="text-gray-400 flex-1">{children}</dd>
    </div>
  );
}

// Komponen untuk genre tags
function GenreTag({ genre }) {
  return (
    <span className="inline-block bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200">
      {genre.title}
    </span>
  );
}

// Komponen untuk episode card
function EpisodeCard({ episode }) {
  return (
    <Link
      href={`/episode/${episode.episodeId}`}
      className="group block bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-red-500/30 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500 font-medium">Episode</span>
          <h3 className="text-white font-semibold mt-1 truncate">{episode.title}</h3>
        </div>
        <div className="text-gray-500 group-hover:text-red-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// Main page component
export default async function AnimeDetailPage({ params }) {
  const data = await fetchAnimeDetail(params.slug);
  
  if (!data?.data) {
    notFound();
  }
  
  const anime = data.data;
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
  } = anime;

  return (
    <>
      <Head>
        <link rel="icon" type="image/jpeg" href={poster} />
        <meta name="keywords" content={genreList.map(g => g.title).join(', ')} />
      </Head>
      
      <main className="min-h-screen pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-red-500 font-medium truncate" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Poster & Basic Info */}
            <div className="lg:col-span-1 mb-8 lg:mb-0">
              <div className="sticky top-6">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={poster}
                    alt={`Poster ${title}`}
                    width={350}
                    height={525}
                    className="w-full aspect-[2/3] object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  {score?.value && (
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold">{score.value}</span>
                      <span className="text-xs text-gray-300">({score.users})</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {batchList?.[0]?.samehadakuUrl && (
                    <a
                      href={batchList[0].samehadakuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/20"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Batch
                      </span>
                    </a>
                  )}
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Simpan
                    </button>
                    <ShareButton 
                      title={title} 
                      slug={params.slug}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 bg-gray-900/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Info Singkat</h3>
                  <dl className="space-y-2">
                    <DetailRow label="Status">{status}</DetailRow>
                    <DetailRow label="Tipe">{type}</DetailRow>
                    <DetailRow label="Episode">{episodes}</DetailRow>
                    <DetailRow label="Durasi">{duration}</DetailRow>
                    <DetailRow label="Studio">{studios}</DetailRow>
                    <DetailRow label="Tayang">{aired}</DetailRow>
                  </dl>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              {/* Title Section */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {title}
                </h1>
                <p className="text-lg text-gray-400 font-japanese mb-6">{japanese}</p>
                
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {genreList.map((genre) => (
                    <GenreTag key={genre.genreId} genre={genre} />
                  ))}
                </div>
              </header>

              {/* Synopsis */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">
                  Sinopsis
                </h2>
                <div className="prose prose-invert max-w-none">
                  {synopsis?.paragraphs?.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Episode List */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Daftar Episode</h2>
                  <span className="text-sm text-gray-500 bg-gray-900 px-3 py-1 rounded-full">
                    {episodeList.length} episode
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {episodeList.slice(0, 12).map((episode) => (
                    <EpisodeCard key={episode.episodeId} episode={episode} />
                  ))}
                </div>
                
                {episodeList.length > 12 && (
                  <div className="mt-6 text-center">
                    <Link
                      href={`/anime/${params.slug}/episodes`}
                      className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
                    >
                      Lihat semua episode ({episodeList.length})
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </section>

              {/* Additional Info */}
              <section className="bg-gray-900/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Informasi Lengkap</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailRow label="Produser">{producers}</DetailRow>
                  <DetailRow label="Skor">{`${score.value} (${score.users} pengguna)`}</DetailRow>
                  <DetailRow label="Tayang Perdana">{aired}</DetailRow>
                  <DetailRow label="Studio">{studios}</DetailRow>
                  <DetailRow label="Durasi per Episode">{duration}</DetailRow>
                  <DetailRow label="Status">{status}</DetailRow>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// CSS untuk font japanese (tambahkan di globals.css)
/*
@font-face {
  font-family: 'Japanese';
  src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap');
}
.font-japanese {
  font-family: 'Noto Sans JP', sans-serif;
}
*/
