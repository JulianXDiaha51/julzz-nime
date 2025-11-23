import Image from 'next/image';
import Link from 'next/link';

const StarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.663.293a.75.75 0 0 1 .428 1.317l-2.79 2.345.85 3.575a.75.75 0 0 1-1.108.806L8 11.97l-3.135 1.97a.75.75 0 0 1-1.108-.806l.85-3.575-2.79-2.345a.75.75 0 0 1 .427-1.317l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
  </svg>
);


const AnimeCard = ({ 
  slug, 
  poster, 
  title, 
  info,
  releasedOn,
  rating,
  rank
}) => {
  return (
    <Link
      href={`/anime/${slug}`}
      className="group relative block w-full overflow-hidden rounded-lg shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-pink-500/50"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-14 w-14 text-white/90">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="bg-gray-800 p-3">
        <h3 className="truncate text-sm font-semibold text-gray-100 transition-colors duration-300 group-hover:text-red-400 sm:text-base">
          {title}
        </h3>
        {releasedOn && (
           <p className="mt-1 text-xs text-gray-400">{releasedOn}</p>
        )}
      </div>

      {rank && (
        <div className="absolute top-2 left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white shadow-md">
          {rank}
        </div>
      )}

      {!rank && info && (
        <div className="absolute top-2 left-2 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {info}
        </div>
      )}

      {rating && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black shadow-md">
          <StarIcon className="h-3 w-3" />
          <span>{rating}</span>
        </div>
      )}
    </Link>
  );
};

export default AnimeCard;