import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a stub file for missing turbopack modules
const stubPath = path.resolve(__dirname, 'turbopack-stub.js');
if (!fs.existsSync(stubPath)) {
  fs.writeFileSync(stubPath, 'export const connect = () => {};');
}

const isDev = process.env.NODE_ENV === 'development';

// No external scripts/fonts/images are loaded anywhere in this app (see
// SECURITY_AUDIT.md Finding 8), so this can stay 'self'-only. style-src needs
// 'unsafe-inline' because the app renders inline `<style>` blocks and inline
// `style={{...}}` attributes extensively (Layout.jsx, login/signup pages) —
// switching to nonces would need those threaded through every component.
// script-src needs 'unsafe-eval'/'unsafe-inline' in dev only, for Turbopack's
// HMR runtime.
const csp = [
  "default-src 'self'",
  `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Harmless to send over plain HTTP today (browsers only honor it once a
  // connection is already HTTPS) — future-proofs for when TLS termination
  // is added in front of the app.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: csp },
];

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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;


    // config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname
