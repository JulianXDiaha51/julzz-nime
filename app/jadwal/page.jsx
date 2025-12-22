// File: app/schedule/page.jsx
import { Suspense } from 'react';
import ScheduleDay from '@/components/Schedule/ScheduleDay';
import ScheduleLoading from '@/components/Schedule/ScheduleLoading';
import CurrentWeekIndicator from '@/components/Schedule/CurrentWeekIndicator';
import { fetchSchedule } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

// Generate metadata for SEO
export async function generateMetadata() {
  return await generateMetadata({
    title: 'Jadwal Rilis Anime',
    description: 'Lihat jadwal rilis anime terbaru setiap minggu. Pantau episode baru dari anime favoritmu berdasarkan hari tayang.',
    keywords: 'jadwal anime, rilis anime, anime terbaru, jadwal tayang, anime minggu ini',
  });
}

// Main schedule component
async function ScheduleContent() {
  const schedule = await fetchSchedule();
  
  if (!schedule?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Jadwal Belum Tersedia</h3>
          <p className="text-gray-400 mb-6">
            Jadwal rilis anime sedang tidak dapat diakses. Silakan coba lagi nanti.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
              Kembali ke Home
            </a>
            <a href="/trending" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
              Lihat Anime Trending
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Get current day for highlighting
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];

  return (
    <>
      {/* Current day indicator */}
      <div className="mb-10">
        <CurrentWeekIndicator schedule={schedule} currentDay={currentDay} />
      </div>
      
      {/* Schedule by day */}
      <div className="space-y-12">
        {schedule.map((day) => (
          <ScheduleDay
            key={day.day}
            day={day}
            isToday={day.day === currentDay}
            animeCount={day.animeList?.length || 0}
          />
        ))}
      </div>
    </>
  );
}

// Main page component
export default async function SchedulePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-green-500/20 text-green-500 text-sm font-medium rounded-full">
                Jadwal Terupdate
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">Minggu ini</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Jadwal Rilis
              <br />
              <span className="text-green-500">Anime Terbaru</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Pantau jadwal tayang anime favoritmu setiap minggu. Dapatkan notifikasi episode baru 
              dan jangan sampai ketinggalan update terbaru.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">7</div>
                <div className="text-sm text-gray-400">Hari dalam Seminggu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-gray-400">Anime Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Update Jadwal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Timezone Info */}
        <div className="mb-10 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-800 rounded-lg">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Timezone yang digunakan</p>
                <p className="text-white font-medium">WIB (UTC+7) • WITA (UTC+8) • WIT (UTC+9)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Set Pengingat
              </button>
            </div>
          </div>
        </div>

        {/* Schedule with Suspense */}
        <Suspense fallback={<ScheduleLoading />}>
          <ScheduleContent />
        </Suspense>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Tentang Jadwal Anime</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Jadwal anime berdasarkan hari tayang di Jepang. Waktu rilis bisa berbeda berdasarkan 
              platform streaming dan region. Kami update jadwal secara berkala untuk akurasi maksimal.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Waktu berdasarkan zona waktu Jepang (JST)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Subtitles biasanya tersedia 1-3 jam setelah rilis</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Beberapa anime mungkin tunda atau hiatus</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Tips Menonton</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                  <span className="text-green-500 text-sm font-bold">①</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Set Pengingat</h4>
                  <p className="text-gray-400 text-sm">Aktifkan notifikasi untuk anime favoritmu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                  <span className="text-green-500 text-sm font-bold">②</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Cek Streaming</h4>
                  <p className="text-gray-400 text-sm">Tersedia di berbagai platform legal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-lg flex-shrink-0">
                  <span className="text-green-500 text-sm font-bold">③</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Diskusi Komunitas</h4>
                  <p className="text-gray-400 text-sm">Bergabung di forum untuk bahas episode baru</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ingin Update Jadwal Otomatis?
            </h3>
            <p className="text-gray-400 mb-6">
              Berlangganan newsletter kami untuk mendapatkan jadwal mingguan langsung ke email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                Berlangganan Newsletter
              </button>
              <a
                href="/trending"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Lihat Anime Trending
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
      }
