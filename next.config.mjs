/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v1.samehadaku.how', 
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'files.catbox.moe', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;