/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*', // or only the routes you actually iframe
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              'frame-ancestors ' +
                [
                  "'self'", // allow same-origin
                  'http://localhost:*', // local dev
                  'https://*.vercel.app', // any Vercel subdomain
                  'https://*.e2b.app', // any E2B subdomain
                ].join(' '),
            ].join('; '),
          },
          // (make sure you do NOT send an X-Frame-Options header that conflicts)
        ],
      },
    ]
  },
}

export default nextConfig
