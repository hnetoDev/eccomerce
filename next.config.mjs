/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**', // Permitir imagens do Firebase Storage
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }

    ]
  }
};

export default nextConfig;
