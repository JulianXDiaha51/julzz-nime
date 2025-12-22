// File: app/layout.jsx
import { Inter, Roboto_Mono } from 'next/font/google';
import { Suspense } from 'react';
import { Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingProvider from '@/providers/LoadingProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import ScrollProgress from '@/components/ScrollProgress';

// Styles
import './globals.css';
import '@/styles/animations.css';

// Config
import { Config } from '@/config';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: true,
});

// Metadata
export const metadata = {
  metadataBase: new URL(Config.siteUrl || 'https://anime-stream.com'),
  title: {
    default: Config.name,
    template: `%s | ${Config.name}`,
  },
  description: Config.description,
  keywords: Config.keywords || [
    'anime streaming',
    'watch anime online',
    'anime gratis',
    'anime subtitle Indonesia',
    'anime terbaru',
  ],
  authors: [
    {
      name: Config.author,
      url: Config.authorUrl || 'https://github.com',
    },
  ],
  creator: Config.author,
  publisher: Config.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: Config.siteUrl || 'https://anime-stream.com',
    title: Config.name,
    description: Config.description,
    siteName: Config.name,
    images: [
      {
        url: Config.ogImage || Config.logo,
        width: 1200,
        height: 630,
        alt: Config.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: Config.name,
    description: Config.description,
    images: [Config.ogImage || Config.logo],
    creator: Config.twitterHandle || '@animestream',
  },
  icons: {
    icon: [
      {
        url: Config.logo,
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: Config.googleVerification || '',
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

// Error boundary component for layout
function ErrorBoundary({ children }) {
  return children;
}

// Loading wrapper for suspense boundaries
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 border-4 border-gray-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm">Loading application...</p>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={Config.apiUrl} />
        
        {/* Additional meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: Config.name,
              description: Config.description,
              url: Config.siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${Config.siteUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-main-gradient text-white antialiased min-h-screen`}>
        {/* Providers */}
        <ErrorBoundary>
          <ThemeProvider>
            <LoadingProvider>
              {/* Progress bar */}
              <ScrollProgress />
              
              {/* Skip to main content for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Skip to main content
              </a>
              
              {/* Background noise overlay */}
              <div className="bg-noise" aria-hidden="true" />
              
              {/* Main layout */}
              <div className="flex flex-col min-h-screen">
                {/* Sticky navbar */}
                <header className="sticky top-0 z-50">
                  <Suspense fallback={<div className="h-16 bg-gray-900/90 backdrop-blur-sm" />}>
                    <Navbar />
                  </Suspense>
                </header>
                
                {/* Main content */}
                <main 
                  id="main-content" 
                  className="flex-1 relative z-10"
                  role="main"
                >
                  <Suspense fallback={<LoadingFallback />}>
                    {children}
                  </Suspense>
                </main>
                
                {/* Footer */}
                <footer className="relative z-10">
                  <Suspense fallback={<div className="h-64 bg-gray-900" />}>
                    <Footer />
                  </Suspense>
                </footer>
              </div>
              
              {/* Analytics */}
              {process.env.NODE_ENV === 'production' && (
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              )}
              
              {/* Service worker registration (optional) */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    if ('serviceWorker' in navigator) {
                      window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/sw.js').then(
                          function(registration) {
                            console.log('ServiceWorker registration successful');
                          },
                          function(err) {
                            console.log('ServiceWorker registration failed: ', err);
                          }
                        );
                      });
                    }
                  `,
                }}
              />
            </LoadingProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
        }
