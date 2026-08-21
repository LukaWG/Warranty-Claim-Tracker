# Deployment Guide

How to build, deploy, and update the Warranty Claim Tracker with Docker
Compose on a single host.

## Architecture

```text
Browser ──http(80)/https(443)──> Next.js app container (port 3000, this repo)
                                    ├─ http-redirect.js sends plain HTTP on 80 to https://
                                    ├─ tls-proxy.js terminates HTTPS (self-signed cert) on 443, forwards to the
                                    │  plain-HTTP Next.js server on 3000 — no separate proxy container
                                    ├─> PostgreSQL (Better Auth users/sessions, Prisma)
                                    └─(server-side)─> /api/data proxy ──> Data API (port 5001, separate service)
```

Two external dependencies:

- **PostgreSQL** — stores Better Auth users/sessions. Included in the
  compose file.
- **Data API (`DATA_API_URL`, port 5001)** — the claims/sites/brands
  backend. It is **not in this repo**. All calls to it go through this app's
  own session- and role-checked proxy (`src/pages/api/data/[...path].ts`),
  which forwards server-side using `DATA_API_KEY`. The browser never talks
  to the Data API directly, so its URL only needs to be reachable from
  inside the cluster/host running this app, not from user machines.

## Pre-deployment notes

The local-dev mocks this repo used to carry (mocked auth, a mocked data
client, a disabled `AuthProvider`) have all been removed from the codebase —
there's nothing left to revert. Two real pre-production items worth a
decision before going live, though:

1. `sendResetPassword` in `src/lib/auth.ts` only logs the password-reset
   link instead of emailing it — password reset won't actually reach real
   users until this is wired to an email sender.
2. `MICROSOFT_TENANT_ID` defaults to `"common"`, which lets any Microsoft
   tenant attempt sign-in (backstopped only by the `@hendy-group.com` email
   check). Fine while SSO is disabled; set it to Hendy's real Entra tenant
   GUID before turning `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` on.

## Environment variables

**Build-time (baked into the JS bundle — changing them requires rebuilding the image):**

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Base path for internal navigation | `/` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app itself | `http://warranty.local` |
| `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` | Show the SSO login button | `false` |
| `NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO` | Skip login form, go straight to SSO | `false` |

**Runtime (set on the container via compose `environment:`):**

| Variable | Purpose |
|---|---|
| `AUTH_DATABASE_URL` | Postgres connection string for Better Auth/Prisma |
| `BETTER_AUTH_SECRET` | Session signing secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Public URL users reach the app on (must match ingress host) |
| `DATA_API_URL` | Data API URL, as reachable from inside the cluster/host (not from user browsers) |
| `DATA_API_KEY` | Must match the Data API's `INTERNAL_API_KEY` |
| `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` / `MICROSOFT_TENANT_ID` | Only if SSO is enabled |
| `SSL_CERT_HOSTS` | Docker Compose only — comma-separated hostnames/IPs the in-container self-signed cert covers |

## Build the image

```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=http://warranty.local \
  -t lukawg/warranty-claim-tracker:latest .

docker push lukawg/warranty-claim-tracker:latest
```

CI does this automatically: `.github/workflows/deploy.yml` builds and pushes
`lukawg/warranty-claim-tracker:latest` (plus a `:<git-sha>` tag) on every push
to `main`. Set the `NEXT_PUBLIC_*` values as repository **variables** and the
Docker Hub credentials as **secrets** in GitHub.

## Deploy — Docker Compose (single host)

`docker-compose.yaml` runs Postgres + the app, pulling the pre-built image
from Docker Hub — nothing is built on this machine. Copy
`.env.deploy.example` to `.env` next to it and fill in real values
(`BETTER_AUTH_SECRET` and `DATA_API_KEY` are required; everything else has a
default).

The app container serves HTTPS on port 443, terminated by `tls-proxy.js`
running alongside the Next.js server inside the same container (see
`Dockerfile`'s `CMD`) — there's no separate proxy container to run or
manage. It uses a **self-signed certificate**, generated once on first boot
into the `ssl_certs` volume. Browsers will show a certificate-trust warning
on first visit — this is expected; accept it to continue. The cert's
hostnames/IPs come from `SSL_CERT_HOSTS` in `.env` (defaults to
`localhost,127.0.0.1,192.168.1.144,lukas-mbp.local`); add an entry there for
any other hostname/IP you'll browse to, then remove the `ssl_certs` volume
to force regeneration. Plain HTTP on port 80 (`http-redirect.js`) just
redirects to HTTPS, so visiting `http://<host>` still lands on the app.

```bash
docker compose pull
docker compose up -d

# App: https://<host>   (self-signed cert warning is expected)
```

The app container runs `prisma db push` itself before starting, so there's
no separate migration step. Postgres is not exposed on the host — only the
app container can reach it.

**To update:** after a new image is pushed, `docker compose pull && docker compose up -d`.

## Troubleshooting

Common issues:

- **Login fails / redirects loop** — `BETTER_AUTH_URL` must exactly match the
  URL in the browser address bar (scheme, host, port).
- **Data never loads but login works** — `NEXT_PUBLIC_API_URL` is wrong or the
  data API isn't reachable *from the user's browser*. Check the browser dev
  tools network tab; remember this value is baked in at build time.
- **`relation "user" does not exist`** — the db-push job hasn't been run.

## Cleanup

```bash
docker compose down             # add -v to also delete Postgres data
```
