/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [ 
      'rgfpdfcxkoepvqtmtxir.supabase.co',
      'places.googleapis.com'
    ],
  },
};

export default nextConfig;