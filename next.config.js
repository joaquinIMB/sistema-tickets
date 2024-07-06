/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
      return [
          {
              source: '/api/:path*',
              headers: [
                  { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
                  { key: 'Pragma', value: 'no-cache' },
                  { key: 'Expires', value: '0' },
                  { key: 'Surrogate-Control', value: 'no-store' },
              ],
          },
      ];
  },
};

module.exports = nextConfig;
