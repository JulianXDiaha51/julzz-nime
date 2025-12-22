// File: components/Footer.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Config } from '@/config';

// Icon Components
const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const HeartIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const DiscordIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.38 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.416-4.486-.56-9.02-3.547-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.41 0-1.325.956-2.41 2.157-2.41 1.21 0 2.176 1.095 2.157 2.41 0 1.325-.956 2.41-2.157 2.41zm7.975 0c-1.183 0-2.157-1.085-2.157-2.41 0-1.325.955-2.41 2.157-2.41 1.21 0 2.176 1.095 2.157 2.41 0 1.325-.946 2.41-2.157 2.41z" />
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

// Main Footer Component
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation links
  const footerLinks = [
    {
      title: 'Anime',
      links: [
        { label: 'Trending', href: '/trending' },
        { label: 'Completed', href: '/completed' },
        { label: 'Ongoing', href: '/ongoing' },
        { label: 'Upcoming', href: '/upcoming' },
      ],
    },
    {
      title: 'Genre',
      links: [
        { label: 'Action', href: '/genre/action' },
        { label: 'Romance', href: '/genre/romance' },
        { label: 'Comedy', href: '/genre/comedy' },
        { label: 'Fantasy', href: '/genre/fantasy' },
      ],
    },
    {
      title: 'Bantuan',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Kontak', href: '/contact' },
        { label: 'Syarat & Ketentuan', href: '/terms' },
        { label: 'Kebijakan Privasi', href: '/privacy' },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      href: 'https://github.com',
      color: 'hover:text-gray-300',
    },
    {
      name: 'Discord',
      icon: <DiscordIcon />,
      href: 'https://discord.gg',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      href: 'https://twitter.com',
      color: 'hover:text-sky-400',
    },
  ];

  return (
    <>
      <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 mt-20">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 right-0 transform -translate-y-full overflow-hidden">
          <svg className="relative w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gray-900" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {Config.name}
                  </h2>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  {Config.pages?.Footer?.about || 'Platform streaming anime terbaik dengan kualitas tinggi dan update tercepat. Nikmati anime favoritmu kapan saja, di mana saja.'}
                </p>
              </div>

              {/* Social Media */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Terhubung dengan Kami</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* API Credit */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <GitHubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">API Powered by</p>
                    <a
                      href="https://sankanime.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors group"
                    >
                      JulianzzGITHUB
                      <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} {Config.name}. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Made with <HeartIcon className="w-3 h-3 inline text-red-500 mx-1" /> by{' '}
                <span className="text-gray-300 font-medium">{Config.author}</span>
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link href="/disclaimer" className="text-gray-500 hover:text-gray-300 transition-colors">
                Disclaimer
              </Link>
              <Link href="/dmca" className="text-gray-500 hover:text-gray-300 transition-colors">
                DMCA
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">
                Kontak
              </Link>
            </div>

            {/* Stats (Optional) */}
            <div className="hidden lg:flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Status: Online
              </span>
              <span>•</span>
              <span>v{Config.version || '1.0.0'}</span>
            </div>
          </div>

          {/* Visitor Counter (Optional) */}
          <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-600">
              Total kunjungan: <span className="text-gray-400 font-medium">1,234,567</span> • 
              Anime tersedia: <span className="text-gray-400 font-medium">10,000+</span> • 
              Update harian
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  );
  }
