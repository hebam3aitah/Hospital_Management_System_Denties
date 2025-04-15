/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
      appDir: true // إضافة هذه الخاصية إذا كنت تستخدم إصدار قديم من Next.js (قبل 13.4)
    },
  }
  
  export default nextConfig;