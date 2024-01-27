/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'questhowth.ie', protocol: 'https' }],
  },
}

export default nextConfig
