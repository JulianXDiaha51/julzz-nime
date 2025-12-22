// File: components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Config } from '@/config';

// Search Icon Component
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// NavLink Component
const NavLink = ({ href, children, className = '' }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 font-medium transition-colors duration-200 ${className} ${
        isActive 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full"></span>
      )}
    </Link>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trending', href: '/trending' },
    { label: 'Completed', href: '/completed' },
    { label: 'Ongoing', href: '/ongoing' },
    { label: 'Genre', href: '/genre' },
    { label: 'Schedule', href: '/schedule' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-gradient-to-b from-gray-900 to-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{Config.name}</h1>
                  <p className="text-xs text-gray-400 -mt-1">Stream Anime</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Notification Bell */}
              <button
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Notifications"
              >
                <BellIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Profile */}
              <button
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                aria-label="User menu"
              >
                <UserIcon />
                <span className="text-sm font-medium">Login</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-800 animate-slideDown">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Cari anime, genre, atau tahun..."
                    className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors">
                    Search
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Trending:</span>
                  {['One Piece', 'Jujutsu Kaisen', 'Demon Slayer', 'Attack on Titan'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-slideDown">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <button className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <UserIcon />
                    <span>Login / Register</span>
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    v{Config.version || '1.0.0'} • {Config.status || 'Online'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add these styles to your globals.css for animations */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
      }
