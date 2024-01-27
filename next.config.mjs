/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'questhowth.ie', protocol: 'https' },
      { hostname: 'res.cloudinary.com', protocol: 'https' },
    ],
  },
}

export default nextConfig
