/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['uploadthing.com', 'utfs.io'], // Add any other domains you'll be using for images
  },
}

export default nextConfig;
