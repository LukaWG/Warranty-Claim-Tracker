# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npx prisma generate   # required after install or schema changes
npm run dev           # dev server at http://localhost:3000 (Turbopack)
npm run build         # production build
npm run lint          # ESLint (errors only)
npm run lint:fix      # auto-fix ESLint violations
npm run typecheck     # tsc check via jsconfig.json (lenient)
```

## Local Dev Caveats (Hendy Laptop)

This repo has local-only modifications to run without a live database or auth service:

- **Auth is mocked** — `src/lib/auth.ts` contains a stub instead of the real Better Auth config. `auth.api.getSession()` always returns a mock Owner session, and `auth.handler()` serves mock JSON for all `/api/auth/*` endpoints, so any login credentials succeed.
- **Middleware bypassed** — `middleware.ts` allows all requests (the mock never issues a session cookie, so the original cookie check would redirect-loop). Original code is commented in the file.
- **Database client** points to JSON files — `src/api/databaseClient.js` is the active file; `databaseClientNew.js` is the Prisma-backed version (inactive locally).
- `_app.jsx` (or `App.jsx`) has the redirect-to-login navigation commented out.

When restoring production behaviour, revert these four changes.

## Architecture

Next.js 15 app using the **Pages Router** (`src/pages/`). Recently migrated from Vite + React Router (see `MIGRATION_SUMMARY.md`).

### Layers

| Layer | Location | Notes |
|---|---|---|
| Pages | `src/pages/` | Route-level components: Dashboard, ClaimForm, Reporting, Configuration, Messages, Approvals, auth pages |
| Layout | `src/Layout.jsx` | Wraps all authenticated pages (sidebar, header, logout) |
| Components | `src/components/` | Organised by feature: `claims/`, `dashboard/`, `configuration/`, `messages/`, `reporting/`, `layout/`, `ui/` |
| Data (local) | `src/api/databaseClient.js` + `data/*.json` | JSON-file mock used in local dev |
| Data (prod) | `src/api/databaseClientNew.js` + Prisma | PostgreSQL via Prisma ORM |
| Auth | `src/lib/auth.ts` / `middleware.ts` | Better Auth; middleware redirects unauthenticated requests to `/login` |

### Key files

- `pages.config.js` — declares `ClaimForm` as `mainPage`
- `src/lib/query-client.js` — TanStack React Query setup
- `src/utils/index.ts` — `BASE_PATH` constant and `createPageUrl()` helper used for all internal navigation
- `prisma/schema.prisma` — DB schema (user, session, account, verification; includes `customRole`, `defaultSite`, `defaultBrands`)
- `tailwind.config.js` — theme uses CSS variables; all colour tokens are defined in `src/index.css`

### UI stack

shadcn/ui components (46 in `src/components/ui/`) built on Radix UI primitives, styled with Tailwind. New UI components should follow the same pattern — add via shadcn CLI or copy the existing style. Icons are Lucide React.

### State & data fetching

React Query for server state; React Hook Form + Zod for form validation. Notifications via Sonner (`src/components/ui/sonner.tsx`).
