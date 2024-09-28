/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["rgfpdfcxkoepvqtmtxir.supabase.co", "firebasestorage.googleapis.com", 'places.googleapis.com', 'lh3.googleusercontent.com'], // Add your Supabase domain here
  },
};

export default nextConfig;