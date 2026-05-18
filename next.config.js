const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.0.182'],
  webpack(config) {
    config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname
    return config
  },
};

export default nextConfig;