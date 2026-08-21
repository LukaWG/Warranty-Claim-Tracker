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
ARG NEXT_PUBLIC_API_TIMEOUT=30000
ARG NEXT_PUBLIC_APP_URL=http://localhost
ARG NEXT_PUBLIC_ENABLE_MICROSOFT_SSO=false
ARG NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO=false
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_API_TIMEOUT=$NEXT_PUBLIC_API_TIMEOUT \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_ENABLE_MICROSOFT_SSO=$NEXT_PUBLIC_ENABLE_MICROSOFT_SSO \
    NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO=$NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO

# AUTH_DATABASE_URL is baked into the final image below (see the runner
# stage) so the container works with no runtime env var at all. This default
# matches docker-compose.yaml's stock `auth` service out of the box — pass
# --build-arg AUTH_DATABASE_URL=... to point at a different Postgres.
ARG AUTH_DATABASE_URL=postgresql://adminuser:Password@auth:5432/warranty_claim_tracker
ENV AUTH_DATABASE_URL=$AUTH_DATABASE_URL

# Build-time placeholder only — the real value is injected at runtime via
# container environment variables (this one stays a per-deployment secret,
# unlike AUTH_DATABASE_URL above).
ARG BETTER_AUTH_SECRET=build-time-placeholder
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ARG DATA_API_URL=http://localhost:5001
ENV DATA_API_URL=$DATA_API_URL
ARG DATA_API_KEY=build-time-placeholder
ENV DATA_API_KEY=$DATA_API_KEY

RUN npx prisma generate
RUN npm run build

# ---------------------------------------------------------------------------
# Production image
# ---------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production

# Prisma's query engine binary is dynamically linked against OpenSSL, and
# this stage runs `npx prisma db push`/generate at container runtime (see
# COPY comment below), not just at build time — so it needs openssl too.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Re-declared here because Docker doesn't carry ARG/ENV across the FROM
# boundary from the builder stage — this is what actually reaches the
# running container. Same default/override rules as the builder stage's
# ARG above; the two are set to the same value by a single --build-arg.
ARG AUTH_DATABASE_URL=postgresql://adminuser:Password@auth:5432/warranty_claim_tracker
ENV AUTH_DATABASE_URL=$AUTH_DATABASE_URL

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

# TLS termination lives inside this container (no separate proxy service) —
# see tls-proxy.js for why a raw TCP proxy instead of an HTTP-level one.
# http-redirect.js just bounces plain HTTP on 80 to https:// on 443.
COPY tls-proxy.js ./tls-proxy.js
COPY http-redirect.js ./http-redirect.js
COPY scripts/gen-self-signed-cert.sh ./scripts/gen-self-signed-cert.sh
RUN chmod +x ./scripts/gen-self-signed-cert.sh \
    && mkdir -p /app/certs && chown nextjs:nodejs /app/certs

USER nextjs

EXPOSE 3000 80 443

# The standalone server reads PORT and HOSTNAME from the environment.
ENV PORT=3000 \
    HOSTNAME=0.0.0.0

# bash (not sh/dash) for `wait -n`, so the container exits — and gets
# restarted by `restart: unless-stopped` — if any process dies. The cert
# script must finish (it's synchronous, outside the subshell) before either
# node process starts, since tls-proxy.js reads the cert file on boot.
CMD ["bash", "-c", "./scripts/gen-self-signed-cert.sh && (node server.js & node tls-proxy.js & node http-redirect.js & wait -n)"]
