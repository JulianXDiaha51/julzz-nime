"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from './SearchIcon';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (!query.trim()) return; 
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul anime..."
        className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-600 hover:bg-pink-700 rounded-full p-3 transition-colors"
      >
        <SearchIcon className="w-6 h-6 text-white" />
      </button>
    </form>
  );
}