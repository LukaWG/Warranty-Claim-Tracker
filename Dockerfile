# syntax=docker/dockerfile:1

FROM node:22-slim AS base

WORKDIR /app

# ---------------------------------------------------------------------------
# Dependencies
# ---------------------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
FROM base AS builder
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at BUILD time.
# Changing any of them requires rebuilding the image — they cannot be
# overridden at runtime. Pass real values with `docker build --build-arg`.
ARG NEXT_PUBLIC_BASE_PATH=/
ARG NEXT_PUBLIC_API_URL=http://localhost:5001
ARG NEXT_PUBLIC_API_TIMEOUT=30000
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ARG NEXT_PUBLIC_ENABLE_MICROSOFT_SSO=false
ARG NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO=false
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_TIMEOUT=$NEXT_PUBLIC_API_TIMEOUT \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_ENABLE_MICROSOFT_SSO=$NEXT_PUBLIC_ENABLE_MICROSOFT_SSO \
    NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO=$NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO

# Build-time placeholders only — the real values are injected at runtime via
# container environment variables (compose `environment:` / k8s Secret).
ARG AUTH_DATABASE_URL=postgresql://build:build@localhost/build
ENV AUTH_DATABASE_URL=$AUTH_DATABASE_URL
ARG BETTER_AUTH_SECRET=build-time-placeholder
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET

RUN npx prisma generate
RUN npm run build

# ---------------------------------------------------------------------------
# Production image
# ---------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Full node_modules (includes the generated Prisma client and the prisma CLI)
# plus the schema, so this same image can run `npx prisma db push` to create
# the auth tables — see DEPLOYMENT.md.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000

# The standalone server reads PORT and HOSTNAME from the environment.
ENV PORT=3000 \
    HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
