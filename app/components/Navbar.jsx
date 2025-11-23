// File: app/components/Navbar.jsx

"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; 
import { Config } from '../config.js'; 
import SearchBar from './SearchBar'; 

const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
);
const ListIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" /></svg>
);


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', text: 'Beranda', icon: HomeIcon },
    { href: '/ongoing', text: 'Ongoing' },
    { href: '/completed', text: 'Completed' },
    { href: '/jadwal', text: 'Jadwal', icon: CalendarIcon },
    { href: '/genre', text: 'Genre', icon: ListIcon },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">
              {Config.name}
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`transition-colors ${
                  pathname === link.href ? 'text-pink-400 font-semibold' : 'text-gray-300 hover:text-pink-400'
                }`}>
                  {link.text}
                </Link>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none z-50 relative">
                {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className={`fixed inset-0 z-40 bg-gray-950/90 backdrop-blur-xl md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-8 px-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-2xl font-semibold text-gray-300 hover:text-pink-400 transition-colors">
              {link.icon && <link.icon className="w-7 h-7" />}
              <span>{link.text}</span>
            </Link>
          ))}
          <div className="w-full max-w-sm pt-8">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}