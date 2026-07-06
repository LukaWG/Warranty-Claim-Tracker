import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a stub file for missing turbopack modules
const stubPath = path.resolve(__dirname, 'turbopack-stub.js');
if (!fs.existsSync(stubPath)) {
  fs.writeFileSync(stubPath, 'export const connect = () => {};');
}

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.0.182', '192.168.1.144', 'lukas-mbp.local', 'localhost'],
  // allowedHosts: ['192.168.0.182', '192.168.1.144', 'lukas-mbp.local', 'localhost'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;


    // config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname
