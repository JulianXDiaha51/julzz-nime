// File: app/loading.jsx
'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [show, setShow] = useState(false);

  // Delay sedikit agar tidak flash terlalu cepat
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-12 h-12 border-3 border-gray-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-500 text-sm animate-pulse">
          Memuat konten...
        </p>
      </div>
    </div>
  );
}
