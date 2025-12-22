// File: components/Pagination.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Icon Components
const ChevronLeftIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDoubleLeftIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
);

const ChevronDoubleRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

// Pagination Item Component
function PaginationItem({ page, currentPage, basePath, searchParams }) {
  const isActive = page === currentPage;
  const params = new URLSearchParams(searchParams.toString());
  params.set('page', page.toString());
  
  const href = `${basePath}?${params.toString()}`;

  return (
    <Link
      href={href}
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
      className={`
        min-w-[42px] h-10 flex items-center justify-center rounded-lg font-medium text-sm
        transition-all duration-200
        ${isActive
          ? 'bg-red-600 text-white shadow-lg shadow-red-500/20 cursor-default'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {page}
    </Link>
  );
}

// Main Pagination Component
export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  basePath,
  showPageNumbers = true,
  showFirstLast = false,
  className = '',
}) {
  const searchParams = useSearchParams();
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = 5;
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Build URL with current search params
  const buildPageUrl = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // Render ellipsis
  const renderEllipsis = (key) => (
    <span
      key={key}
      className="min-w-[42px] h-10 flex items-center justify-center text-gray-500"
      aria-hidden="true"
    >
      ...
    </span>
  );

  return (
    <nav 
      className={`flex items-center justify-center ${className}`}
      aria-label="Pagination navigation"
    >
      <div className="flex items-center gap-2">
        {/* First Page Button */}
        {showFirstLast && (
          <Link
            href={buildPageUrl(1)}
            className={`
              h-10 px-4 flex items-center gap-2 rounded-lg font-medium text-sm
              transition-colors duration-200
              ${hasPrevPage && currentPage > 2
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed pointer-events-none'
              }
            `}
            aria-label="Go to first page"
            tabIndex={hasPrevPage && currentPage > 2 ? 0 : -1}
          >
            <ChevronDoubleLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">First</span>
          </Link>
        )}

        {/* Previous Page Button */}
        <Link
          href={buildPageUrl(currentPage - 1)}
          className={`
            h-10 px-4 flex items-center gap-2 rounded-lg font-medium text-sm
            transition-colors duration-200
            ${hasPrevPage
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed pointer-events-none'
            }
          `}
          aria-label="Go to previous page"
          tabIndex={hasPrevPage ? 0 : -1}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </Link>

        {/* Page Numbers */}
        {showPageNumbers && (
          <div className="hidden sm:flex items-center gap-2">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return renderEllipsis(`ellipsis-${index}`);
              }
              
              return (
                <PaginationItem
                  key={page}
                  page={page}
                  currentPage={currentPage}
                  basePath={basePath}
                  searchParams={searchParams}
                />
              );
            })}
          </div>
        )}

        {/* Current Page Info (Mobile) */}
        {showPageNumbers && (
          <div className="sm:hidden px-4 py-2 bg-gray-800 rounded-lg">
            <span className="text-sm font-medium text-white">
              {currentPage} <span className="text-gray-400">/ {totalPages}</span>
            </span>
          </div>
        )}

        {/* Next Page Button */}
        <Link
          href={buildPageUrl(currentPage + 1)}
          className={`
            h-10 px-4 flex items-center gap-2 rounded-lg font-medium text-sm
            transition-colors duration-200
            ${hasNextPage
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed pointer-events-none'
            }
          `}
          aria-label="Go to next page"
          tabIndex={hasNextPage ? 0 : -1}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>

        {/* Last Page Button */}
        {showFirstLast && (
          <Link
            href={buildPageUrl(totalPages)}
            className={`
              h-10 px-4 flex items-center gap-2 rounded-lg font-medium text-sm
              transition-colors duration-200
              ${hasNextPage && currentPage < totalPages - 1
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed pointer-events-none'
              }
            `}
            aria-label="Go to last page"
            tabIndex={hasNextPage && currentPage < totalPages - 1 ? 0 : -1}
          >
            <span className="hidden sm:inline">Last</span>
            <ChevronDoubleRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Page Info Summary */}
      <div className="hidden lg:flex items-center gap-4 ml-8">
        <div className="text-sm text-gray-400">
          Showing page <span className="text-white font-semibold">{currentPage}</span> of{' '}
          <span className="text-white font-semibold">{totalPages}</span>
        </div>
        {/* Quick Jump Input (Optional) */}
        {totalPages > 10 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const page = parseInt(formData.get('page'));
              if (page >= 1 && page <= totalPages) {
                window.location.href = buildPageUrl(page);
              }
            }}
            className="flex items-center gap-2"
          >
            <label htmlFor="jump-page" className="sr-only">
              Jump to page
            </label>
            <input
              type="number"
              id="jump-page"
              name="page"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              className="w-20 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Page"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              Go
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}

// Prop Types (optional for better dev experience)
Pagination.defaultProps = {
  showPageNumbers: true,
  showFirstLast: false,
  className: '',
};
