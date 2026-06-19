FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DATABASE_URL is required by prisma generate but no real connection is made at build time
ARG DATABASE_URL=postgresql://build:build@localhost/build
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets only if the directory exists in the source repository
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js", "--hostname", "0.0.0.0"]
