import Link from 'next/link';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);


export default function Pagination({ currentPage, hasNextPage, hasPrevPage, basePath }) {
  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 mt-12">
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={`flex items-center gap-2 px-5 py-2 font-bold text-white rounded-lg transition-colors
          ${!hasPrevPage
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed pointer-events-none'
            : 'bg-pink-600 hover:bg-pink-700'
          }`
        }
        aria-disabled={!hasPrevPage}
        tabIndex={!hasPrevPage ? -1 : undefined}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Sebelumnya
      </Link>
      <span className="font-semibold text-lg text-white">
        Halaman {currentPage}
      </span>
      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={`flex items-center gap-2 px-5 py-2 font-bold text-white rounded-lg transition-colors
          ${!hasNextPage
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed pointer-events-none'
            : 'bg-pink-600 hover:bg-pink-700'
          }`
        }
        aria-disabled={!hasNextPage}
        tabIndex={!hasNextPage ? -1 : undefined}
      >
        Selanjutnya
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
};