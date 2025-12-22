// File: components/AnimeCard.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Icon components untuk reusable
const PlayIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = ({ className = 'w-4 h-4', filled = true }) => (
  <svg className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Badge = ({ children, type = 'default', className = '' }) => {
  const typeStyles = {
    default: 'bg-gray-800 text-gray-300',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${typeStyles[type]} ${className}`}>
      {children}
    </span>
  );
};

// Main AnimeCard component
export default function AnimeCard({ 
  anime,
  slug, 
  poster, 
  title, 
  type,
  episodes,
  status,
  score,
  rank,
  releasedOn,
  showScore = true,
  showType = true,
  showEpisodeCount = false,
  className = '',
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = poster || anime?.poster;
  const animeTitle = title || anime?.title;
  const animeSlug = slug || anime?.animeId;
  const animeScore = score || anime?.score?.value || anime?.score;
  const animeType = type || anime?.type;
  const animeEpisodes = episodes || anime?.episodes;
  const animeStatus = status || anime?.status;

  // Format score display
  const formatScore = (score) => {
    if (!score) return null;
    return typeof score === 'number' ? score.toFixed(1) : score;
  };

  // Get status badge type
  const getStatusType = (status) => {
    if (!status) return 'default';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('ongoing')) return 'warning';
    if (statusLower.includes('completed')) return 'success';
    if (statusLower.includes('upcoming')) return 'info';
    return 'default';
  };

  return (
    <Link
      href={`/anime/${animeSlug}`}
      className={`group block relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${className}`}
      aria-label={`Detail anime ${animeTitle}`}
    >
      {/* Card container */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-full">
        {/* Image container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-gray-600 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Gagal memuat gambar</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={`Poster ${animeTitle}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
              <PlayIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {/* Left badges */}
            <div className="flex flex-col gap-2">
              {rank && (
                <Badge type="info" className="font-bold">
                  #{rank}
                </Badge>
              )}
              {showType && animeType && (
                <Badge type="danger">
                  {animeType}
                </Badge>
              )}
            </div>

            {/* Right badges */}
            <div className="flex flex-col items-end gap-2">
              {showScore && animeScore && (
                <Badge type="warning" className="flex items-center gap-1">
                  <StarIcon className="w-3 h-3" />
                  {formatScore(animeScore)}
                </Badge>
              )}
              {animeStatus && (
                <Badge type={getStatusType(animeStatus)}>
                  {animeStatus}
                </Badge>
              )}
            </div>
          </div>

          {/* Bottom gradient overlay for text */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        {/* Content section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 mb-2 group-hover:text-red-400 transition-colors duration-200 leading-tight">
            {animeTitle}
          </h3>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
            {/* Episode count */}
            {showEpisodeCount && animeEpisodes && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{animeEpisodes} eps</span>
              </div>
            )}

            {/* Release date */}
            {releasedOn && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{releasedOn}</span>
              </div>
            )}

            {/* View details hint */}
            <span className="text-red-500/70 group-hover:text-red-400 transition-colors ml-auto">
              Detail →
            </span>
          </div>
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-colors duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
}

// Prop types untuk development (opsional)
AnimeCard.propTypes = {
  anime: PropTypes.object,
  slug: PropTypes.string,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  episodes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  status: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rank: PropTypes.number,
  releasedOn: PropTypes.string,
  showScore: PropTypes.bool,
  showType: PropTypes.bool,
  showEpisodeCount: PropTypes.bool,
  className: PropTypes.string,
};

// Default props
AnimeCard.defaultProps = {
  showScore: true,
  showType: true,
  showEpisodeCount: false,
  className: '',
};
