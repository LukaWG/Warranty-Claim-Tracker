const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // turbopack: {
  //   resolveAlias: {
  //     '@': new URL('./src', import.meta.url).pathname
  //   }
  // }
  webpack(config) {
    config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname
    return config
  },
};

export default nextConfig;