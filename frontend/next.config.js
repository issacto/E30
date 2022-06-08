/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        //proxy
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
