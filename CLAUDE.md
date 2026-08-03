# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server with Turbopack, bound to 0.0.0.0
npm run build        # production build
npm run start         # serve the production build
npm run lint          # ESLint (errors only; scoped to src/components, src/pages, src/Layout.jsx)
npm run lint:fix      # auto-fix
npm run typecheck    # tsc against jsconfig.json (lenient — checkJs, no strict mode)
```

There is no test suite/runner in this repo.

Prisma (auth schema only — see "Two separate backends" below):

```bash
npx prisma generate                 # after install or any schema.prisma change
npx prisma migrate dev              # create/apply a migration locally
npx prisma db push                  # push schema without a migration (used by docker-compose's db-push service)
```

Prisma reads `AUTH_DATABASE_URL`, **not** `DATABASE_URL` (see `prisma.config.ts` and `src/lib/prisma.ts`). The `.env.example`/`.env` `DATABASE_URL` key is not read by anything.

## Architecture

### Two separate backends — do not conflate them

1. **Auth** (this repo owns it): Better Auth (`src/lib/auth.ts`) with the Prisma adapter, Postgres schema in `prisma/schema.prisma` (`user`, `session`, `account`, `verification` tables). Mounted as a Next API route at `src/pages/api/auth/[...all].ts`. `middleware.ts` gates every route except `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/api/auth` behind a Better Auth session cookie. The first user ever created is auto-promoted to `customRole: "Owner"` / `role: "admin"` (`databaseHooks.user.create.before` in `auth.ts`).
2. **App data** (claims, sites, brands, messages, audits, etc.): lives in a **separate HTTP API service in a different repo**, not in this repo's Postgres. `src/api/databaseClient.js` is a thin REST client (`DatabaseClient` class: `create/get/list/update/delete/query/filter`) hitting `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5001`), instantiated once per collection in the `databaseClients` registry (`Alert`, `AlertResolution`, `Brand`, `ClaimAudit`, `ClaimNote`, `PendingUserInvite`, `User`, `WarrantyClaim`, `Site`, `Message`, `MessageRead`). Almost all feature code reads/writes through `databaseClients.<Entity>.*`, often wrapped in TanStack Query hooks (e.g. `src/hooks/useClaims.js`).

Admin-only user management (list/invite/update/delete users, reset passwords, list SSO providers) goes through `src/api/authClient.js` (`authUsers`), which calls Better Auth's admin plugin endpoints under `/api/auth/admin/*` — a third path, separate from `databaseClients.User`. It also translates between the app's snake_case field names (`first_name`, `custom_role`, `default_site`, …) and Better Auth's camelCase user fields; `src/lib/normalizeUser.js` does the same translation in the other direction for session/user objects read from the client.

### Routing: two systems layered on the Pages Router

This is a Next.js 15 **Pages Router** app (`src/pages/`), but it retains a second, Base44-style routing layer on top:

- `src/pages.config.js` declares a `PAGES` map (page name → component) and a `mainPage` key (`"ClaimForm"`).
- `src/pages/[...page].jsx` is a catch-all route: it looks up the first path segment against `PAGES` case-insensitively and renders that component, or `PageNotFound`. `/` renders `mainPage`.
- Pages that also exist as real files under `src/pages/` (e.g. `Dashboard.jsx`, `Approvals.tsx`, `Messages.tsx`) are matched directly by Next's file router first — the catch-all only fires for paths Next couldn't otherwise resolve (case variants, unregistered names).
- `src/pages/_app.jsx` wraps every page in `src/Layout.jsx` (nav shell, user menu, password-change modal) and derives `currentPageName` from the route for nav highlighting, independent of which of the two mechanisms rendered the page.
- Internal links should use `createPageUrl()` from `src/utils/index.ts` (applies `NEXT_PUBLIC_BASE_PATH`), not hardcoded hrefs.

### Dead code — do not extend, and don't be misled by it

Leftovers from an earlier Vite + `react-router-dom` (Base44) scaffold, superseded by the Next.js Pages Router setup above but never deleted:

- `src/App.jsx` and `src/main.jsx` — the old Vite entry point. They import `@/lib/VisualEditAgent` and `@/lib/NavigationTracker`, neither of which exists in this repo. Not built or served by Next; `src/pages/_app.jsx` is the real entry point.
- `src/lib/AuthContext.jsx` — entirely commented out (mock auth reading `data/data.js`).
- `src/api/entities.js` — mock `Query`/`User` objects with zero imports anywhere in `src/`.
- `data/*.json`, `data/data.js` — legacy seed fixtures, only referenced by the commented-out `AuthContext.jsx`.
- `entities/*` (top-level dir) — JSON-Schema-style docs of each collection's fields (e.g. `entities/WarrantyClaim`). Documentation only; nothing imports them. Useful as a reference for a collection's shape, but the source of truth is whatever the external data API actually returns.
- `README.md`, `CONTRIBUTING.md`, `BASE44_MIGRATION.md`, `CODE_AUDIT*.md` describe an earlier "mocked auth / JSON-file database" state of this repo that no longer matches the code (auth is real, and `databaseClient.js` calls the external HTTP API, not local JSON). Prefer reading the source over these docs.

### UI stack

shadcn/ui components (`src/components/ui/`, ~49 components) on Radix UI primitives, Tailwind with CSS-variable tokens (`src/index.css`), Lucide icons, Recharts for charts, Framer Motion for animation, React Hook Form + Zod for forms, Sonner/react-hot-toast for notifications. Feature components are grouped by domain under `src/components/`: `claims/`, `dashboard/`, `configuration/`, `messages/`, `reporting/`, `layout/`, `auth/`.

Path alias: `@/*` → `src/*` (`jsconfig.json`).

### Deployment

Single-host via `docker-compose.yaml` (Postgres for auth + the Next app, `AUTH_DATABASE_URL` wired to the compose Postgres) or Kubernetes manifests under `k8s/`. `.github/workflows/deploy.yml` builds and pushes a Docker image to Docker Hub on every push to `main`; `NEXT_PUBLIC_*` values are baked in at build time via build args/vars, so changing them requires a rebuild, not just a redeploy.
