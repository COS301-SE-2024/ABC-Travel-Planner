/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["rgfpdfcxkoepvqtmtxir.supabase.co", "firebasestorage.googleapis.com", 'places.googleapis.com', 'lh3.googleusercontent.com', 'abctravelplanner-backend-f1ec00338193.herokuapp.com'],
  },
};

export default nextConfig;