# Graph Report - Warranty-Claim-Tracker  (2026-08-14)

## Corpus Check
- 109 files · ~57,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 633 nodes · 1458 edges · 79 communities (38 shown, 41 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ad574d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Layout.jsx
- cn
- Configuration.jsx
- compilerOptions
- Dashboard.jsx
- databaseClient.js
- compilerOptions
- 1. Security
- Deployment Guide
- components.json
- Section A — Auth & Session
- devDependencies
- Section D — Claim Creation (ClaimForm)
- package.json
- scripts
- DatabaseClient
- use-toast.jsx
- Warranty Claims App — Test Plan
- Section J — Cross-Cutting Edge Cases
- dependencies
- authClient.js
- Section B — Roles & Permissions
- Section C — Routing & Navigation
- Section E — Claim Lifecycle / Dashboard
- next.config.js
- Section G — Configuration (Sites / Brands / Alerts / Users)
- Section H — Messages
- Section I — Reporting & Export
- proxy.ts
- Warranty Claim Tracker
- better-auth
- CLAUDE.md
- clsx
- class-variance-authority
- eslint
- eslint-plugin-react-hooks
- MiniTimeline.jsx
- eslint-plugin-unused-imports
- framer-motion
- lucide-react
- next
- next-env.d.ts
- pg
- prisma
- @prisma/adapter-pg
- @prisma/client
- @radix-ui/react-alert-dialog
- @radix-ui/react-checkbox
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-select
- @radix-ui/react-slot
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-tooltip
- react
- tailwind-merge
- @tanstack/react-query
- zod
- postcss
- tailwindcss
- @types/node
- @types/react
- @types/react-dom
- typescript
- vitest
- eslint-plugin-react-refresh
- { signIn, signUp, signOut, useSession }

## God Nodes (most connected - your core abstractions)
1. `cn()` - 90 edges
2. `DatabaseClients` - 28 edges
3. `toast()` - 26 edges
4. `useBrands()` - 25 edges
5. `useSites()` - 25 edges
6. `Button` - 23 edges
7. `buttonVariants` - 19 edges
8. `DialogContent` - 16 edges
9. `compilerOptions` - 16 edges
10. `Input` - 15 edges

## Surprising Connections (you probably didn't know these)
- `DialogOverlay` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.jsx → src/lib/utils.js
- `DropdownMenuSubTrigger` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.jsx → src/lib/utils.js
- `DropdownMenuSubContent` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.jsx → src/lib/utils.js
- `DropdownMenuCheckboxItem` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.jsx → src/lib/utils.js
- `DropdownMenuRadioItem` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.jsx → src/lib/utils.js

## Import Cycles
- None detected.

## Communities (79 total, 41 thin omitted)

### Community 0 - "Layout.jsx"
Cohesion: 0.07
Nodes (26): HendyLogo(), SearchModal(), UnreadBadge(), DialogDescription, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel (+18 more)

### Community 1 - "cn"
Cohesion: 0.15
Nodes (45): EditBrandModal(), APPROVAL_STATUS_LABELS, OFFSCREEN_SKIP_STYLE, statusConfig, COLUMN_LABELS, ColumnVisibilityPicker(), DEFAULT_COLUMNS, SITE_DEFAULT_COLUMNS (+37 more)

### Community 2 - "Configuration.jsx"
Cohesion: 0.07
Nodes (24): AlertsTab(), ResolutionsTab(), TabsContent, TabsList, TabsTrigger, auth, AccessCheckInput, AccessVerdict (+16 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom.iterable, **/*.mts, next-env.d.ts, **/*.ts, **/*.tsx, compilerOptions, allowJs, baseUrl (+18 more)

### Community 4 - "Dashboard.jsx"
Cohesion: 0.16
Nodes (26): RFC-4180, ClaimFormCard(), ClaimNotesModal(), CreditOptionsModal(), EditClaimModal(), BrandsTab(), SitesTab(), availableBrandIdsFor() (+18 more)

### Community 5 - "databaseClient.js"
Cohesion: 0.11
Nodes (28): currentUser, DatabaseClients, ADMIN_ROLES, ApprovalChat(), AuditHistoryModal(), ADMIN_ROLES, ClaimTimeline(), getEventConfig() (+20 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (25): compilerOptions, allowSyntheticDefaultImports, baseUrl, checkJs, esModuleInterop, jsx, lib, module (+17 more)

### Community 7 - "1. Security"
Cohesion: 0.11
Nodes (18): 1.1 Critical — No server-side authorization on `/api/data/*`, only authentication, 1.2 High — Password reset only logs to console; no email is actually sent, 1.3 Medium — Microsoft SSO tenant restriction defaults to `common`, 1.4 Low — `ctx.body?.email.endsWith(...)` can throw instead of returning a clean 400, 1.5 Informational — things done well, 1. Security, 2.1 Inverted condition hides "unread approval" indicators for every logged-in user, 2.2 CSV export throws for any claim whose brand was deleted/renamed (+10 more)

### Community 8 - "Deployment Guide"
Cohesion: 0.11
Nodes (18): Access, Accessing the cluster from another device, Architecture, Build the image, Cleanup, Deployment Guide, Environment variables, First-time setup (+10 more)

### Community 9 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 10 - "Section A — Auth & Session"
Cohesion: 0.13
Nodes (15): A10. Voluntary change-password modal, A11. Change-password menu item hidden for SSO users, A12. Admin-forced password reset — `mustChangePassword` enforcement ⚠ Flagged issue, A13. Unauthenticated deep link — middleware vs SSR redirect divergence ⚠ Flagged issue, A14. Authenticated user hitting `/login` or `/signup`, A1. First-ever signup auto-promotes to Owner/admin, A2. Duplicate email signup, A3. Signup page — Microsoft SSO button ⚠ Flagged issue (+7 more)

### Community 11 - "devDependencies"
Cohesion: 0.15
Nodes (13): autoprefixer, baseline-browser-mapping, @eslint/js, eslint-plugin-react, globals, devDependencies, autoprefixer, baseline-browser-mapping (+5 more)

### Community 12 - "Section D — Claim Creation (ClaimForm)"
Cohesion: 0.18
Nodes (11): D10. Rapid double-submit, D1. Happy path submission, D2. WIP number strips non-digits, D3. Missing required fields, D4. Missing WIP/site/hours — weaker validation ⚠ Flagged issue, D5. Expected Hours — negative / non-numeric, D6. Clocking Date after Scanned Date, D7. Manufacturer deadline color coding (+3 more)

### Community 13 - "package.json"
Cohesion: 0.20
Nodes (9): engines, node, name, overrides, @types/react, @types/react-dom, private, type (+1 more)

### Community 14 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:pages, dev, lint, lint:fix, start, test (+2 more)

### Community 16 - "use-toast.jsx"
Cohesion: 0.12
Nodes (19): Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, toastVariants, ToastViewport (+11 more)

### Community 17 - "Warranty Claims App — Test Plan"
Cohesion: 0.20
Nodes (9): Appendix — Known Issues Found During Code Review, Environment prerequisites, F1. Approve/reject happy path, F2. Approved/rejected claim leaves the pending list ⚠ Flagged issue, F3. No server-side role check on Approvals, How to use this document, Section F — Approvals, Test accounts / fixtures needed (+1 more)

### Community 18 - "Section J — Cross-Cutting Edge Cases"
Cohesion: 0.20
Nodes (10): J1. API unreachable — reads render as empty, not an error ⚠ Flagged issue, J2. API unreachable — writes, J3. Slow API / 15s timeout, J4. Large dataset behavior, J5. Empty-list zero states, J6. Special characters and long strings in free-text inputs, J7. No global error boundary ⚠ Flagged issue, J8. Responsive / mobile nav (+2 more)

### Community 19 - "dependencies"
Cohesion: 0.22
Nodes (9): date-fns, dependencies, date-fns, react-day-picker, react-dom, tailwindcss-animate, react-day-picker, react-dom (+1 more)

### Community 20 - "authClient.js"
Cohesion: 0.28
Nodes (4): authUsers, CurrentUserClient, generatePassword(), normalizeUser()

### Community 21 - "Section B — Roles & Permissions"
Cohesion: 0.22
Nodes (9): B1. Nav visibility per role, B2. Direct-URL access bypassing nav — Configuration, B3. Direct-URL access bypassing nav — Approvals ⚠ Flagged issue, B4. Dashboard role-typo cases ⚠ Flagged issue, B5. Client-side-only delete/edit gating on claims ⚠ Flagged issue, B6. Admin API endpoints as non-admin, B7. Role downgrade mid-session, B8. Role change side effect on platform role (+1 more)

### Community 22 - "Section C — Routing & Navigation"
Cohesion: 0.22
Nodes (9): C1. All PAGES entries reachable, C2. Case-insensitive route matching, C3. Unknown page → PageNotFound, C4. Deep/nested unknown path segments, C5. Trailing slash, C6. Browser back/forward through routes, C7. Refresh on a deep route, C8. Nav flash before user loads (+1 more)

### Community 23 - "Section E — Claim Lifecycle / Dashboard"
Cohesion: 0.25
Nodes (8): E1. Status transitions per the enum, E2. Alert/resolution forced status side effects, E3. Withdraw / undo withdrawal, E4. Credit flow — note required above threshold, E5. Credit flow — apply enabled only in valid states, E6. Photo/file upload is a non-functional stub ⚠ Flagged issue, E7. Concurrent edits by two users, Section E — Claim Lifecycle / Dashboard

### Community 24 - "next.config.js"
Cohesion: 0.33
Nodes (5): csp, __dirname, nextConfig, securityHeaders, stubPath

### Community 25 - "Section G — Configuration (Sites / Brands / Alerts / Users)"
Cohesion: 0.33
Nodes (6): G1. CRUD — Sites, Brands, Alerts, AlertResolutions, G2. Delete a Site/Brand still referenced by a claim ⚠ Flagged issue, G3. Invite a new user ⚠ Flagged issue, G4. Admin password reset rejected for SSO-only users, G5. Delete a user, Section G — Configuration (Sites / Brands / Alerts / Users)

### Community 26 - "Section H — Messages"
Cohesion: 0.33
Nodes (6): H1. Compose and reply, H2. Unread badge polling lag (expected, not a bug), H3. Mark-as-read reader name ⚠ Flagged issue, H4. Image attachment on a message ⚠ Flagged issue, H5. Target site filtering, Section H — Messages

### Community 27 - "Section I — Reporting & Export"
Cohesion: 0.33
Nodes (6): I1. Stat tiles and totals, I2. Lag-time charts, I3. CSV export with a deleted brand ⚠ Flagged issue, I4. CSV export with special characters ⚠ Flagged issue, I5. Export with zero claims, Section I — Reporting & Export

### Community 29 - "Warranty Claim Tracker"
Cohesion: 0.50
Nodes (3): Getting help, Warranty Claim Tracker, What it does

### Community 36 - "MiniTimeline.jsx"
Cohesion: 0.40
Nodes (5): getEventConfig(), MiniTimeline(), RELEVANT_FIELDS, RELEVANT_TYPES, statusLabels

## Knowledge Gaps
- **269 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+264 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `Layout.jsx`, `Configuration.jsx`, `Dashboard.jsx`, `databaseClient.js`, `use-toast.jsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `better-auth`, `clsx`, `class-variance-authority`, `framer-motion`, `lucide-react`, `next`, `pg`, `prisma`, `@prisma/adapter-pg`, `@prisma/client`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-checkbox`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-tooltip`, `react`, `tailwind-merge`, `@tanstack/react-query`, `zod`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Warranty Claims App — Test Plan` connect `Warranty Claims App — Test Plan` to `Section A — Auth & Session`, `Section D — Claim Creation (ClaimForm)`, `Section J — Cross-Cutting Edge Cases`, `Section B — Roles & Permissions`, `Section C — Routing & Navigation`, `Section E — Claim Lifecycle / Dashboard`, `Section G — Configuration (Sites / Brands / Alerts / Users)`, `Section H — Messages`, `Section I — Reporting & Export`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _269 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layout.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._
- **Should `Configuration.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07317073170731707 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._