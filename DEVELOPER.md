# Developer Guide

This document covers local setup, architecture, and conventions for contributors.

---

## Prerequisites

- Node.js 22.12.0+
- PostgreSQL database
- A `.env.local` file with the required environment variables (see below)

---

## Local setup

```bash
npm install
npx prisma generate   # must run after install or after any schema change
npm run dev           # starts dev server at http://localhost:3000 (Turbopack)
```

### Local-only mock mode

This repo has a local development mode that skips the live database and auth service:

- **Auth is mocked** — `src/lib/auth.ts` contains stub functions in place of the real Better Auth config.
- **Database client is JSON-backed** — `src/api/databaseClient.js` reads from `data/*.json` files. The Prisma-backed client (`databaseClientNew.js`) is inactive locally.
- The redirect-to-login navigation in `_app.jsx` / `App.jsx` is commented out.

When restoring production behaviour, revert those three files.

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with Turbopack hot reload |
| `npm run build` | Production build |
| `npm run lint` | ESLint (errors only) |
| `npm run lint:fix` | Auto-fix ESLint violations |
| `npm run typecheck` | Type-check via `jsconfig.json` (lenient mode) |

---

## Architecture

Next.js 15 app using the **Pages Router** (`src/pages/`). Migrated from Vite + React Router — see `MIGRATION_SUMMARY.md` for details.

### Folder structure

| Path | Purpose |
|---|---|
| `src/pages/` | Route-level page components |
| `src/components/` | Feature-grouped components: `claims/`, `dashboard/`, `configuration/`, `messages/`, `reporting/`, `layout/`, `ui/` |
| `src/api/databaseClient.js` | JSON-file mock client (local dev) |
| `src/api/databaseClientNew.js` | Prisma client (production) |
| `src/lib/auth.ts` | Auth setup (Better Auth; stubbed locally) |
| `src/lib/query-client.js` | TanStack React Query configuration |
| `src/utils/index.ts` | `BASE_PATH` constant and `createPageUrl()` helper |
| `prisma/schema.prisma` | Database schema |
| `data/*.json` | Seed/mock data used by the local JSON client |

### Key config files

- `pages.config.js` — declares `ClaimForm` as `mainPage`
- `tailwind.config.js` — theme using CSS variables
- `src/index.css` — all colour token definitions

---

## UI stack

- **Components** — shadcn/ui (46 components in `src/components/ui/`) built on Radix UI primitives
- **Styling** — Tailwind CSS with CSS variable tokens
- **Icons** — Lucide React
- **Charts** — Recharts
- **Animations** — Framer Motion
- **Forms** — React Hook Form + Zod

New UI components should follow the shadcn pattern — add via the shadcn CLI or copy an existing component's structure.

---

## State & data fetching

- **Server state** — TanStack React Query
- **Form state** — React Hook Form + Zod validation
- **Notifications** — Sonner (`src/components/ui/sonner.tsx`)

---

## Database

PostgreSQL accessed via Prisma ORM. The schema (`prisma/schema.prisma`) includes tables for users, sessions, accounts, and verification, plus custom fields: `customRole`, `defaultSite`, `defaultBrands`.

Run `npx prisma generate` after any schema change. Run `npx prisma migrate dev` to apply migrations locally.

---

## Auth

Better Auth handles authentication. The middleware (`middleware.ts`) redirects unauthenticated requests to `/login`. Locally this is bypassed — see the mock mode section above.

---

## Navigation

All internal navigation uses `createPageUrl()` from `src/utils/index.ts` rather than hardcoded paths. Use this helper whenever adding new links.
