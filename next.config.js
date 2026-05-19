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
  allowedDevOrigins: ['192.168.0.182'],
  webpack(config, { isServer }) {
    config.resolve.alias['@'] = path.resolve(__dirname, './src')
    config.resolve.alias['@vercel/turbopack-ecmascript-runtime/browser/dev/hmr-client/hmr-client.ts'] = stubPath
    return config
  },
};

export default nextConfig;


    // config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname
