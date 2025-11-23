import Link from 'next/link';
import Image from 'next/image';
import { Config } from './config';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <Image
        src={Config.pages.notFound.logo}
        alt="Anime character looking lost"
        width={300}
        height={200}
        unoptimized={true}
        className="mb-8 rounded-lg"
      />
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
        {Config.pages.notFound.title}
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-gray-400">
        {Config.pages.notFound.description}
      </p>
      
      <Link 
        href="/"
        className="transform rounded-full bg-pink-600 px-8 py-3 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-pink-700"
      >
        🏠 Kembali ke Beranda
      </Link>
    </div>
  );
}