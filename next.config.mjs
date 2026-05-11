/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow ByteByteGo CDN images (used for lesson diagrams)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bytebytego.com',
      },
    ],
  },
};

//module.exports = nextConfig;
export default nextConfig;