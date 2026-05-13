const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/Warranty-Claim-Tracker';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  basePath: BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
