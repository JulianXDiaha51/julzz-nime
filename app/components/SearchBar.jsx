// File: components/SearchBar/SearchBar.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { searchAnime } from '@/lib/api';

// Search Icon Component
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ClearIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Search Suggestion Item
function SearchSuggestionItem({ anime, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(anime.title)}
      className="flex items-center gap-3 p-3 hover:bg-gray-800 w-full text-left transition-colors"
    >
      <div className="flex-shrink-0 w-12 h-16 bg-gray-700 rounded overflow-hidden">
        {anime.poster && (
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-sm truncate">{anime.title}</h4>
        <div className="flex items-center gap-3 mt-1">
          {anime.type && (
            <span className="text-xs text-gray-400">{anime.type}</span>
          )}
          {anime.score && (
            <span className="text-xs text-yellow-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {anime.score.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// Main SearchBar Component
export default function SearchBar({
  placeholder = "Cari anime...",
  size = "md",
  showSuggestions = true,
  autoFocus = false,
  className = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  // Size variants
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-4',
    lg: 'py-4 px-5 text-lg',
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Close suggestions
    setIsFocused(false);
    
    // Navigate to search page
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Handle suggestion select
  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion);
    setIsFocused(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchAnime(debouncedQuery, 1, 5);
        setSuggestions(data.animeList || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (showSuggestions) {
      fetchSuggestions();
    }
  }, [debouncedQuery, showSuggestions]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const handleClear = () => {
    setQuery('');
    setIsFocused(false);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Popular searches
  const popularSearches = [
    'One Piece',
    'Jujutsu Kaisen',
    'Demon Slayer',
    'Attack on Titan',
    'My Hero Academia',
  ];

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full bg-gray-900/80 border border-gray-700 text-white rounded-xl
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
            transition-all duration-200
            ${sizeClasses[size]}
            ${isFocused ? 'ring-2 ring-red-500 border-transparent' : ''}
          `}
          aria-label="Search anime"
        />
        
        {/* Search Icon */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Search"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <ClearIcon className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Search Suggestions */}
      {showSuggestions && isFocused && (
        <div
          ref={suggestionsRef}
          className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-red-500 border-t-transparent"></div>
              <p className="mt-2 text-sm text-gray-400">Mencari...</p>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-gray-800">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Hasil Pencarian
                </h3>
              </div>
              {suggestions.map((anime) => (
                <SearchSuggestionItem
                  key={anime.animeId}
                  anime={anime}
                  onSelect={handleSuggestionSelect}
                />
              ))}
              <div className="p-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Lihat semua hasil untuk "{query}"
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && suggestions.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-400">Tidak ditemukan anime dengan kata kunci "{query}"</p>
            </div>
          )}

          {/* Empty State - Show popular searches */}
          {!isLoading && !query && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                Pencarian Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => handleSuggestionSelect(search)}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  Tekan Enter untuk mencari, atau gunakan kata kunci lebih spesifik
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Bonus: useDebounce hook (create hooks/useDebounce.js)
```jsx
// File: hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
