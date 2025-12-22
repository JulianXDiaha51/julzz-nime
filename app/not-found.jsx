// File: app/not-found.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Config } from '@/config';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  // Popular anime suggestions
  const popularAnime = [
    { name: 'One Piece', href: '/search?q=one+piece' },
    { name: 'Jujutsu Kaisen', href: '/search?q=jujutsu+kaisen' },
    { name: 'Demon Slayer', href: '/search?q=demon+slayer' },
    { name: 'Attack on Titan', href: '/search?q=attack+on+titan' },
    { name: 'My Hero Academia', href: '/search?q=my+hero+academia' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Parallax effect containers */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        {/* Floating elements */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {['⚔️', '✨', '❤️', '🎬', '🔥'][i - 1]}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 1 
            }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="text-[200px] md:text-[250px] font-black text-gray-900/50 tracking-tighter">
                404
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                404
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Halaman Tidak Ditemukan
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Sepertinya halaman yang kamu cari sudah pindah dimensi, atau mungkin belum pernah ada.
            <br />
            Jangan khawatir, masih banyak anime seru lainnya!
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Redirect otomatis dalam</span>
              </div>
              <div className="px-3 py-1 bg-red-500/20 rounded-lg">
                <span className="text-white font-bold">{countdown}s</span>
              </div>
            </div>
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span>🏠</span>
                <span>Kembali ke Beranda</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() => router.back()}
              className="group px-8 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:bg-gray-900/70"
            >
              <div className="flex items-center justify-center gap-3">
                <span>↩️</span>
                <span>Kembali Sebelumnya</span>
              </div>
            </button>
          </motion.div>

          {/* Popular Anime Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Atau coba anime populer ini
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularAnime.map((anime, index) => (
                <Link
                  key={anime.name}
                  href={anime.href}
                  className="group px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-gray-300 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:border-red-500/30 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="flex items-center gap-2">
                    <span className="group-hover:text-red-400 transition-colors">
                      ▶️
                    </span>
                    {anime.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Search Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl flex-shrink-0">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Butuh Bantuan Mencari?
                </h4>
                <p className="text-gray-400 mb-4">
                  Gunakan fitur pencarian untuk menemukan anime yang ingin kamu tonton.
                </p>
                <form action="/search" method="GET" className="flex gap-2">
                  <input
                    type="search"
                    name="q"
                    placeholder="Cari anime..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cari
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Stats / Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 pt-8 border-t border-gray-800/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-sm text-gray-400">Anime Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-gray-400">Update</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-gray-400">Gratis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">⚡</div>
                <div className="text-sm text-gray-400">Fast Streaming</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 text-xs text-gray-500 bg-black/50 p-2 rounded">
            🐛 404 - Halaman tidak ditemukan
          </div>
        )}
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
      `}</style>
    </div>
  );
      }
