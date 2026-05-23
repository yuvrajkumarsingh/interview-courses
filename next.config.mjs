/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Interview Courses CDN images (used for lesson diagrams)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'interview-courses.com',
      },
    ],
  },
};

//module.exports = nextConfig;
export default nextConfig;