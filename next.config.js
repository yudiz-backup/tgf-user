/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tradefantasygame.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tfg-frontend-s3.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // hostname: process.env.NEXT_PUBLIC_S3_MEDIA_HOST,
        hostname: "tfg-frontend-s3.s3.ap-south-1.amazonaws.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

