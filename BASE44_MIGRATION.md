# base44 → Local Deployment: Migration History

This document catalogs the changes required to take this app from a
**base44 export** (a hosted no-code app builder that provided auth, entity
storage, and hosting) to something **deployable on a local/self-hosted
server**. It covers the full git history — 368 commits, `2026-05-06` (the
base44 export) through `2026-07-21` (latest), all on `origin/main`.

**Scope:** this document is deliberately narrow. It covers only the
*architecture* of the transformation — framework, data layer, auth,
deployment infrastructure. It excludes UI/design changes, bug fixes,
business-logic changes, and refactors — those are already covered by
[`CODE_AUDIT.md`](./CODE_AUDIT.md) and [`CODE_AUDIT V2.md`](./CODE_AUDIT%20V2.md),
which this document doesn't duplicate.

Commit hashes below are short SHAs on `origin/main` (`git show <hash>` to
inspect any of them).

---

## A. Framework: Vite + React Router → Next.js Pages Router

The app was exported from base44 as a Vite SPA using `react-router-dom`,
calling the base44 SDK directly for entities and auth. It was rebuilt on
Next.js so it could be built into a standalone server process and deployed
as a container, rather than depending on base44's hosting.

| Date | Commit | Change |
|---|---|---|
| 2026-05-06 | `a497b58` | Initial commit ("Project taken from Base44"): Vite + `react-router-dom` SPA. `entities/*` (base44 schema exports), `src/api/base44Client.js` (`@base44/sdk`), `src/api/entities.js` (`Query`/`User` → `base44.entities`/`base44.auth`), `src/api/integrations.js`, `src/main.jsx`, `src/App.jsx`, `vite.config.js`, `src/components/ProtectedRoute.jsx` (React-Router `<Outlet>` guard), `src/lib/AuthContext.jsx`, `src/lib/VisualEditAgent.jsx` / `src/lib/NavigationTracker.jsx` (base44 editor-iframe integration), `src/lib/app-params.js` (base44 localStorage keys) — all present from day one. |
| 2026-05-08 | `83c4686`, `262bd41`, `69a2d9b`, `2047e5a` | "Remove base44" (×4) — base44 SDK calls stripped from Approvals/Reporting/Dashboard/Layout, replaced by local mock data. |
| **2026-05-13** | **`166cf7e`** | **"NextJS migration" — the founding commit.** Converts Vite + React Router → Next.js 14 Pages Router in one shot: adds `next.config.js` (`output: 'standalone'`, `basePath`), `src/pages/_app.jsx`, `src/pages/index.jsx`, `src/pages/[...page].jsx` (catch-all replacing React-Router's route table), `src/pages/404.jsx`; converts `useNavigate`/`<Link to=>`/`useLocation` → `useRouter`/`<Link href=>`/`router.asPath` across `Layout.jsx`, `SearchModal.jsx`, `NavigationTracker.jsx`, `PageNotFound.jsx`, `ClaimForm.jsx`, `Home.jsx`, `ChangeUser.jsx`, `utils/index.ts`; `package.json` scripts `vite`/`vite build`/`vite preview` → `next dev`/`next build`/`next start`. **In the same commit**: the first Dockerfile, first Kubernetes manifests, first CI→K8s pipeline, `DEPLOYMENT.md`, `MIGRATION_SUMMARY.md` (see [Section D](#d-deployment-infrastructure-docker-compose-kubernetes-cicd)) — moving off base44/Vite and adding self-hosted deploy infra happened together. |
| 2026-05-13 | `c15a334` | "Refactor application to remove Base44 SDK dependencies and implement mock functionality" — deletes `src/api/base44Client.js` / `src/api/integrations.js` outright; rewrites `src/api/entities.js` into no-op `console.log` stubs; rewrites `src/lib/app-params.js` to hardcode values instead of reading base44 env vars. |
| 2026-05-19 | `061f0d9` | "Bug chasing" — deletes `vite.config.js`, the last Vite artifact, ~6 days after the Next.js cutover. |
| 2026-07-13 | `e434636` | "Fix messages flow" — a late straggler: a leftover React-Router `useNavigate()` call in `MessageThread.jsx` replaced with `next/router`, two months after the "completed" migration. |

**Left behind, never deleted:** `src/main.jsx`, `src/App.jsx`,
`src/components/ProtectedRoute.jsx`, `src/lib/AuthContext.jsx` are all dead
since 2026-05-13/15 but still exist at HEAD — see [Section E](#e-known-current-drift--open-issues).

---

## B. Data layer: base44 SDK → Supabase (abandoned) → JSON/JS mock → external HTTP Data API

base44 provided hosted entity storage. Replacing it took several attempts
before landing on the architecture the app has today: a thin HTTP client
against a separate, external "Data API" service.

| Date | Commit | Change |
|---|---|---|
| 2026-05-06 | `3b46181` | "Connect Supabase" — first replacement attempt: raw `postgres` npm package, hardcoded connection string, one query (`Configuration.jsx` sites) switched off base44. |
| 2026-05-07 | `290aa08` | "Upload data" — rewrote to `@supabase/supabase-js`; **also added the `data/*.json` fixture dumps** (Alert, AlertResolution, Brand, ClaimAudit, ClaimNote, PendingUserInvite, Site, WarrantyClaim) exported from the live base44/Supabase data — this is the seed data still in the repo today. |
| 2026-05-07 | `3f93ccd` | "Remove supabase dependency to fix GitHub Action" — the Supabase client broke CI; removed after less than 24 hours. |
| 2026-05-07 | `21f5450` | "Remove supabase" — reverts the one converted query back to `base44.entities.Site.list(...)`, ending the Supabase attempt entirely. |
| 2026-05-07 | `3522a9f` | "json file structure test" — first `src/api/databaseClient.js`: a Node `fs`/`path`-based reader of `../data/<Entity>.json`. |
| 2026-05-07 | `415fa41`, `a82e364`, `cf9f5d7`, `3e33f8a`, `a613b4b`, `944a601`, `3cc3690`, `6f12e26`, `d7cb8bc`, `b46c508` | Churn discovering Node's `fs` module doesn't work in a browser bundle; converts the "JSON file" mock into `src/api/data.js`, an importable JS-module-literal mock that works client-side. |
| 2026-05-07/08 | `4f98e87`, `e77d526` | Formalizes a `DatabaseClient`/`DatabaseClients` class wrapping the in-memory JS arrays (create/get/update/delete — writes back into the imported arrays, never persisted to disk). |
| **2026-06-11** | **`28327b4`** | **"Migrate to API for data persistence" — the real pivot.** Rewrites `databaseClient.js` into a thin `fetch()`-based HTTP client: `API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'`. The old JS-array implementation is preserved as `src/api/databaseClientold.js` rather than deleted. |
| 2026-06-17 | `4a4a4f0` | "Update to run without auth and api container running" — temporary local-dev fallback: swaps `databaseClient.js` back to the JS-array mock (hardcoded `TEMP_USER_DETAILS`); the still-working HTTP-API version is stashed as `src/api/databaseClientNew.js`. |
| 2026-06-18 | `eaee2d2` | "Revert to using API for data storage" — reverts course: `databaseClient.js` restored to the HTTP-API version (port bumped `5000` → `5001` here), `databaseClientNew.js` deleted, the JS-array mock renamed to `src/api/databaseClientOld.js` (kept as an unused backup). |
| 2026-07-16 | `208fe4c` | "Remove old databaseclient" — deletes `databaseClientOld.js` for good. From here, exactly one `databaseClient.js` exists, calling the external Data API exclusively since 2026-06-18. |

> **Correction to a claim repeated in this repo's own docs** (`CLAUDE.md`,
> `CONTRIBUTING.md`, `DEPLOYMENT.md`): those describe `databaseClientNew.js`
> as "the Prisma-backed production data client." Per the commit history, it
> was **never** Prisma-backed in any revision — it was a parked copy of the
> same fetch-based HTTP client, and it was deleted 2026-06-18. See
> [Section E](#e-known-current-drift--open-issues).

**Important:** the Prisma+Postgres+Better-Auth stack (see
[Section C](#c-auth-base44-hosted-auth--better-auth--prisma--postgres)) is a
**separate subsystem** that only ever stored users/sessions. It never became
the storage for `WarrantyClaim`/`Site`/`Brand`/etc. business data — that
data has lived behind the external HTTP Data API (port 5001, **not part of
this repo**) since 2026-06-18.

---

## C. Auth: base44 hosted auth → Better Auth + Prisma + Postgres

base44 also provided the app's authentication. This was replaced with a
self-hosted stack (Better Auth + Prisma + Postgres) — with two later
episodes of a local-dev-only mock layered on top so the app could run on a
laptop without a live database, both fully reverted.

### Building the real thing

| Date | Commit | Change |
|---|---|---|
| 2026-05-06 | `a497b58` | base44 auth via `AuthContext.jsx` (`base44.auth.me()` / `.logout()` / `.redirectToLogin()`) + `ProtectedRoute.jsx` (React-Router `<Outlet>` guard). |
| 2026-05-13 | `c15a334` | First mock/stub swap (pre-Better-Auth): `AuthContext.jsx` rewritten to auto-login as a hardcoded local user, `logout()`/`navigateToLogin()` become plain `window.location.href` redirects. Still React-Router based. |
| **2026-05-15** | **`e5b9391`** | **"Start auth implementation" — the pivotal commit.** Adds `prisma/schema.prisma` (`user`/`session`/`account`/`verification`), `src/lib/prisma.ts`, `src/lib/auth.ts` (`betterAuth` + Prisma adapter, email/password), `src/lib/auth-client.ts`, **`middleware.ts`** (cookie-check gate redirecting unauthenticated requests to `/login`), the `/api/auth/[...all]` handler, `login.tsx`/`signup.tsx`. Per-page auth added via `getServerSideProps` + `auth.api.getSession()`. Phases out React-Router auth: `ProtectedRoute.jsx`'s auth logic and all of `AuthContext.jsx` are commented out (not deleted). |
| 2026-05-18 | `c01fabb` | "Fix login implementation" — moves the auth API route to `src/pages/api/auth/[...all].ts` (the correct Pages-Router location); disables required email verification. |
| 2026-05-20 | `aa8a3c4`, `f933fec` | "Fix user log in" — adds `firstName`, `lastName`, `customRole`, `defaultSite`, `mustChangePassword` to the Prisma schema; adds Better Auth's `admin()` plugin + role/ban fields; adds `src/api/authClient.js`, `forgot-password.tsx`, `reset-password.tsx`. |
| 2026-05-20 | `408ebfb` | "Add SSO" — `auth.ts` gains a Microsoft `socialProviders` entry (env-driven); login/signup pages gain an SSO button gated by `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO`. |
| 2026-05-26 | `eb0874e` | "Allow dev login from external host" — `auth.ts` `baseURL`/`trustedOrigins` become dev-only localhost/LAN allowlists. |
| 2026-06-10 | `96915a3` | "Admins now use default brand instead of site" — `defaultBrands` added to the schema and to `auth.ts`'s `additionalFields`. |

### Local-mock episode #1 — short-lived, incomplete

| Date | Commit | Change |
|---|---|---|
| 2026-06-17 | `4a4a4f0` | `auth.ts`'s real config commented out, replaced with a hardcoded `getSession` stub. **`middleware.ts` was not touched** — the real cookie-check stayed active, so this mock alone likely still redirect-looped. |
| 2026-06-18 | `ce4c44f` | "Add code documentation from claude" — adds `CLAUDE.md`, documenting this state ("Auth is mocked... revert these three changes for production"). |
| 2026-06-19 | `072317f` | "Revert to using auth database" — `auth.ts` restored to the real config; adds `CODE_AUDIT.md`. `CLAUDE.md`'s "Auth is mocked" text is **not** corrected here — the first instance of the docs going stale. |

### Local-mock episode #2 — complete ("Hendy laptop" mode, per `NOTES.md`)

| Date | Commit | Change |
|---|---|---|
| 2026-07-10 | `f24d6da` | "Mock auth" — `auth.ts` replaced with a full mock: `MOCK_USER`/`MOCK_SESSION`/`MOCK_ACCOUNT` + a handler covering every `/api/auth/*` sub-path the app calls, so any login credentials succeed. **`middleware.ts` bypassed too this time** (unconditional pass-through, real check preserved in a comment). `CLAUDE.md` updated to a 4-item caveat list. |
| 2026-07-13 | `71d9a87` | "Update prisma schema" — `auth.ts` reverted to the real config (mock preserved as a comment). `middleware.ts` **not** touched — still bypassed. |
| **2026-07-16** | **`ab30d40`** | **"Revert local-dev auth mocks and fix production deploy issues"** — completes the revert: `middleware.ts` real cookie-check restored; `_app.jsx` drops a leftover commented `AuthProvider` import; `auth.ts` gains bootstrap logic (first-ever signup becomes `customRole: "Owner"`, `role: "admin"`). |
| 2026-07-16 | `2b153ca` | "New code audit" — adds `CODE_AUDIT V2.md`, which documents that real auth/middleware are active again — and that `CLAUDE.md` was **not** updated to match (explicitly deferred). |
| 2026-07-16 | `b558442` | "Restrict admin actions to Owner/Group Manager and hide password reset for SSO users" — server-side authz hardening on real Better Auth. |
| 2026-07-20 | `cd16f64` | "Extract current-user session logic out of DatabaseClient" — moves Better-Auth session lookup out of `databaseClient.js` into `src/api/currentUser.js`, separating the data client from auth concerns. |

**Real auth has been active continuously since 2026-07-16.** `CLAUDE.md`
still (at HEAD) describes the app as running with mocked auth and bypassed
middleware — see [Section E](#e-known-current-drift--open-issues).

---

## D. Deployment infrastructure: Docker, Compose, Kubernetes, CI/CD

None of this existed in the base44 export — base44 hosted the app itself.
Everything below was added to make the app buildable into a container and
runnable on a local/self-hosted server.

### GitHub Pages era (no containers)

| Date | Commit | Change |
|---|---|---|
| 2026-05-06 | `946f8dc` | First CI: `.github/workflows/deploy.yml` — "Deploy Vite App to GitHub Pages" (Node 20, static build → GH Pages). Several same-day fixes: `c54d9ba` (YAML indentation), `718067b`/`653a8f5` (Node version, `npm ci`→`npm install`). |
| 2026-05-07 → 05-12 | various | Branch-trigger churn (`debug`/`cra` test branches), Node version bounced 20→24→18, artifact path `dist`→`build`. Framework was still Vite at this point. |

### Docker + Kubernetes introduced (with the Next.js migration)

| Date | Commit | Change |
|---|---|---|
| **2026-05-13** | **`166cf7e`** | Same commit as the Next.js migration (Section A). Adds the first **`Dockerfile`** (3-stage `deps`→`builder`→`runner`, `node:20-alpine`, `output: standalone`, non-root user), first **`.dockerignore`**, first **`k8s/`** (namespace, configmap, deployment w/ probes, service, ingress [nginx class], kustomization, `k8s/README.md`), first **CI→K8s pipeline** (`.github/workflows/k8s-deploy.yml`: build/push to GHCR, `kubectl set image` + rollout), `DEPLOYMENT.md`, `MIGRATION_SUMMARY.md`. |
| 2026-05-13 | `d650609`, `a8f8c29` | Accidentally committed `.next/` build output; cleaned up + `.gitignore`'d two commits later. |
| 2026-05-13 | `e010aa8` | First `engines.node` pin in `package.json` (`>=20.9.0`). |
| 2026-05-14 | `4992737`, `aaad17a` | "k8s setup" / "Correct k8s deployment" — fixed manifests to match root basePath; `HOST`→`HOSTNAME` env var (what the Next.js standalone server actually reads); ingress → `ingressClassName: nginx`. |
| **2026-05-15** | **`1600f11`** | Adds **`k8s/LOCAL SERVER DEPLOYMENT.md`** (404 lines) — first guide for a bare-metal/VM **K3s** deployment (vs. a managed cluster): installing K3s, importing locally-built images into its containerd, switching ingress class to **Traefik**, local DNS/hosts-file access. First mention of Traefik and of a genuine "local server" target. |
| **2026-05-15** | **`e5b9391`** | Also the founding commit for **`docker-compose.yaml`** (first appearance: single `db` service, Postgres 16), **`tsconfig.json`** (first appearance), `prisma.config.ts` — see Section C for the auth side. |
| 2026-05-18 → 05-26 | `c01fabb`, `061f0d9`, `aa8a3c4`/`f933fec`, `ee419e6` | Prisma/TS config thrashing; `engines.node` bumped to `>=22.12.0`; CI Node version bumped to `22.22.3`; `npx prisma generate` wired into the Docker build for the first time. |

### GitHub Pages → Docker Hub, and hardening ("Docker Hub build day", 2026-06-19)

A single intensive session replaced static-site hosting with a container
image build/push, then spent ~15 commits fixing real production issues:

| Commit | Change |
|---|---|
| `16ba3c0` "Build docker container" | **Rewrites `.github/workflows/deploy.yml` from scratch**: drops the entire GH-Pages job, replaces with `docker/login-action` + `docker/build-push-action` pushing to Docker Hub. The pivot from static-site hosting to container deployment. |
| `081a5e6`, `4019780` | Adds then merges a second compose file (`nextapp` + `watchtower` services) into `docker-compose.yaml`. |
| `04f1cbc` "Make docker image lowercase" | Docker Hub rejects uppercase repo names; renamed image to `lukawg/warranty-claim-tracker:latest`. |
| `6e4371d`, `113acea`, `241267d`, `19ffed1`, `ccb0ad8` | Prisma-7-in-Docker fixes: `DATABASE_URL`/`AUTH_DATABASE_URL` build args (dummy at build time, real at runtime), removing `datasource.url` from `schema.prisma` (Prisma 7 forbids it alongside `prisma.config.ts`), installing OpenSSL in the builder stage, suppressing a `BETTER_AUTH_SECRET` build-time warning. |
| `b70459c` "Switch Docker base image from Alpine to Debian slim" | `node:22-alpine` → `node:22-slim` — musl libc lacks the OpenSSL libs Prisma's engine needs. |
| `9607e44` | Pinned `react-is` directly — a transitive dep webpack couldn't resolve during the Docker build. |
| `f69975e` "Copy full node_modules into runner" | Next's standalone-output import tracing was dropping transitive deps not listed in `package.json`. |
| `8697829` | Disabled the broken `watchtower` auto-update sidecar. |
| `d79c9f1`, `1baf3af` | Hardcoded the internal Docker DB hostname (`${AUTH_DATABASE_URL}` substitution was silently failing); excluded `.env` from the image (`COPY . .` was leaking secrets), switched to `env_file`. |
| `e0b8356` "Remove unused actions" | Deleted the never-wired `k8s-deploy.yml` and a stray, unrelated `webpack.yml` starter workflow — down to one CI workflow. |

### Kubernetes deleted and rebuilt (2026-07-15)

| Date | Commit | Change |
|---|---|---|
| 2026-07-06 | `6a8a288` | "Remove nextapp from docker container" — app service commented out of compose (only Postgres left running), during local-mock episode #2. |
| **2026-07-15** | **`30a582a`** | **"Remove k8s"** — deletes the entire `k8s/` directory (all manifests + both READMEs). |
| **2026-07-15** | **`f5870ce`** | **"Rebuild Docker and Kubernetes deployment setup"** — a much more production-shaped rebuild: `Dockerfile` switches to `npm ci --legacy-peer-deps`, makes `NEXT_PUBLIC_*` values explicit **build-time** ARGs (with a comment distinguishing them from runtime secrets), ships `prisma/` in the runner so the image can run `prisma db push`. `docker-compose.yaml` gets a Postgres healthcheck and a **one-shot `db-push` service** (`profiles: ["setup"]`). CI now tags images both `:latest` and `:${{ github.sha }}`. `k8s/` rebuilt from scratch: **`postgres.yaml`** (new — in-cluster StatefulSet + PVC), **`secret.example.yaml`** (new — documents `kubectl create secret` for DB/auth secrets), ingress switched to **`ingressClassName: traefik`** (aligning with K3s), **`db-push-job.yaml`** (new — one-shot K8s Job). `DEPLOYMENT.md` rewritten. |
| 2026-07-16 | `ab30d40` | (Also see Section C.) Removes `--skip-generate` from the `prisma db push` commands in compose/k8s-job — Prisma 7 dropped that flag. |
| 2026-07-16 | `7106446` | `DEPLOYMENT.md` gains `kubectl set image ...@sha256:<sha>` pinning instructions. |
| 2026-07-17 | `0175bf7`, `6e140c1` | Named the CI workflow; added a status badge to `README.md`. |
| **2026-07-21** | **`167715b`** | "Document Traefik recovery and terminal-only Docker Desktop workflow" — adds **`k8s/traefik.yaml`** (hand-rolled Traefik ingress controller: namespace, ServiceAccount, ClusterRole/Binding, Deployment, Service) for clusters that don't ship Traefik out of the box (Docker Desktop's built-in Kubernetes, unlike K3s). `DEPLOYMENT.md` documents that Docker Desktop Kubernetes resets wipe all cluster state, how to recover, and recommends **against** running production on Docker Desktop K8s. |
| **2026-07-21** | **`8d854b0`** (HEAD) | "Fix traefik clustdr" — the hand-rolled Traefik ClusterRole was missing `nodes` and `discovery.k8s.io`/`endpointslices` permissions needed for service-endpoint resolution. |

---

## E. Known current drift / open issues

These are facts about the current state of the repo (at HEAD), not new
opinions — each is corroborated by the repo's own `CODE_AUDIT V2.md`.

- **`CLAUDE.md` is stale.** It still describes "Auth is mocked" and
  "Middleware bypassed" as the active state. Both were fully reverted to
  real Better Auth / real cookie-check middleware by `2026-07-16 ab30d40`.
  `CODE_AUDIT V2.md` flagged this the same day and explicitly deferred
  fixing it.
- **`CLAUDE.md` / `CONTRIBUTING.md` / `DEPLOYMENT.md` all describe
  `databaseClientNew.js` as "the Prisma-backed production data client."**
  That file was deleted `2026-06-18` and was never Prisma-backed in any
  revision (see [Section B](#b-data-layer-base44-sdk--supabase-abandoned--jsonjs-mock--external-http-data-api)).
  `DEPLOYMENT.md`'s pre-deploy checklist ("confirm `databaseClientNew.js`
  is active") can't be followed as written — the file doesn't exist.
- **The actual current data-layer architecture** — `databaseClient.js` →
  an external HTTP Data API on `NEXT_PUBLIC_API_URL` (default
  `http://localhost:5001`), a service **not in this repo** — isn't
  described in `CLAUDE.md`/`CONTRIBUTING.md`'s "Architecture" tables,
  which still describe the old JSON-file-vs-Prisma split.
- **base44 leftovers never cleaned up:** the `entities/` directory,
  `src/api/entities.js`, `src/lib/app-params.js` (all dead since
  2026-05-13), a hardcoded `base44-prod` Supabase asset URL in
  `src/components/layout/HendyLogo.jsx:4`, and a commented
  `// await base44.auth.me();` in `src/pages/Configuration.jsx:300`.
- **Vite-era dead files never deleted:** `src/main.jsx`, `src/App.jsx`,
  `src/components/ProtectedRoute.jsx`, `src/lib/AuthContext.jsx` — dead
  since 2026-05-15, still present at HEAD.
- **base44 editor-integration components still wired in but inert
  standalone:** `src/lib/VisualEditAgent.jsx`, `src/lib/NavigationTracker.jsx`
  — still imported/rendered by `src/pages/_app.jsx`; they only do anything
  inside base44's editor iframe.

For everything else that's dead code, unused, or a bug unrelated to this
migration, see [`CODE_AUDIT.md`](./CODE_AUDIT.md) and
[`CODE_AUDIT V2.md`](./CODE_AUDIT%20V2.md).

---

## Overall arc

1. **2026-05-06** — App exported from base44: Vite + React Router, base44
   SDK for both auth and data.
2. **2026-05-06 → 05-07** — A one-day Supabase detour is tried and abandoned
   (broke CI).
3. **2026-05-07 → 06-11** — base44 calls stripped and replaced with an
   in-memory JS-array mock, grown out of a failed attempt to read JSON files
   client-side.
4. **2026-05-13** — Single large commit converts the framework to Next.js
   Pages Router *and* introduces the entire self-hosting toolchain: Docker,
   first Kubernetes manifests, a CI→K8s pipeline.
5. **2026-05-15** — A genuine Postgres+Prisma+Better-Auth stack replaces
   base44's hosted auth: `docker-compose.yaml`, `middleware.ts`, `auth.ts`,
   admin/SSO support added over the following two weeks.
6. **2026-06-11** — The data layer is repointed at a separate, external HTTP
   Data API service (port 5000→5001, not in this repo) — the architecture
   that persists to today, aside from one week of flip-flopping back to the
   mock for offline-laptop dev.
7. **2026-06-19** — GitHub Pages hosting is dropped entirely in favor of a
   Docker Hub image build/push, followed immediately by ~15 commits fixing
   real production issues (Alpine→Debian for OpenSSL/Prisma compatibility,
   build-time-vs-runtime env-var separation, secrets leaking into images).
8. **2026-07-10 → 07-16** — A complete local-dev-only mock (auth +
   middleware bypass) is added for offline laptop development, then fully
   reverted.
9. **2026-07-15** — Kubernetes is deleted and rebuilt from scratch with a
   production-shaped design: in-cluster Postgres, Secret-based credentials,
   a one-shot Prisma `db-push` Job, Traefik as the ingress class.
10. **2026-07-16 → 07-21** — Final recovery/documentation work, ending with
    a hand-rolled Traefik manifest (needed because the local Docker Desktop
    Kubernetes test environment doesn't ship Traefik the way the target K3s
    production server does) and an RBAC fix for it in the very last commit.
