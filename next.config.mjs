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
        protocol: 'https',
        hostname: 'bearshop-images-s3.s3.sa-east-1.amazonaws.com', // Seu bucket do S3
        pathname: '/**', // Permitir qualquer caminho de imagens do S3
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Adicionado o domínio do Google
        pathname: '/**', // Permitir qualquer caminho de imagens do Google
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }

    ]
  }
};

export default nextConfig;
