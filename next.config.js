const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  basePath: BASE_PATH,
  // Removed deprecated eslint config - use next lint command instead
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
