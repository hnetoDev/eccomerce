/** @type {import('next').NextConfig} */
const nextConfig = {
  image: {
    remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '80',
  
        },
    ],
},
};

export default nextConfig;
