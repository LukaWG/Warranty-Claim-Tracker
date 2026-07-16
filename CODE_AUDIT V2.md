# Code Audit — Warranty Claim Tracker

_Generated: 2026-07-16 (supersedes the 2026-06-19 audit)_

This document records dead code, code that runs but has no purpose, bugs found along the way, and refactoring/efficiency opportunities. Every item was verified against the current code with the line numbers shown. Per the audit's agreed scope this is a **report only** — no code was changed, no files deleted, no dependencies pruned.

---

## 0. Repo state has drifted from CLAUDE.md

CLAUDE.md's "Local Dev Caveats" section no longer matches reality:

| CLAUDE.md says | Actual state |
|---|---|
| `src/lib/auth.ts` is a mock stub | Real `betterAuth(...)` config is active (lines 8–85); the **mock** is now the commented-out block (lines 87–199) |
| `middleware.ts` allows all requests | Real cookie-check middleware is active; the bypass is the commented block |
| `src/api/databaseClient.js` reads JSON files; `databaseClientNew.js` is the Prisma version | `databaseClientNew.js` no longer exists. `databaseClient.js` calls an external HTTP API (`NEXT_PUBLIC_API_URL`, default `http://localhost:5001`) — it never reads `data/*.json` |

Not changed as part of this audit (deferred by decision), but CLAUDE.md should be updated when convenient.

---

## 1. Status of the 2026-06-19 findings

### Fixed since June
- `src/api/databaseClientOld.js` — deleted. ✔
- Unused imports in `Approvals.tsx` (`getData`, `GetServerSideProps`) and `Configuration.jsx` (`getData`, `updateSite`) — resolved. ✔
- Commented AuthContext import in `_app.jsx` — removed. ✔

### Changed
- `src/lib/PageNotFound.jsx` — **no longer dead**: now imported by `src/pages/404.jsx:1` and `src/pages/[...page].jsx:4`. Do not delete.
- `src/lib/auth.ts` — situation inverted: real auth is active; the dead commented block is now the mock stub (lines 87–199).

### Still present
| Item | Current location |
|---|---|
| `invalidateQuereis` typo (active bug — see §5) | `src/pages/Messages.tsx:82` |
| Unmemoized Dashboard filter | `src/pages/Dashboard.jsx:121–205` |
| Duplicated user-field mapping (worse than reported — see §6.6) | `src/api/authClient.js:28–37`, `src/api/databaseClient.js:165–176` |
| `Approvals` missing from `PAGES` map | `src/pages.config.js:55–62` |
| Dead Vite-era files | `src/main.jsx`, `src/App.jsx`, `src/components/ProtectedRoute.jsx`, `src/lib/AuthContext.jsx` |
| Unused `src/api/entities.js` | zero imports |
| Console logs | `src/api/databaseClient.js:30, 90`, `src/pages/Configuration.jsx:1449`, `src/components/auth/ApplyPendingUserInfo.jsx:24` |
| Commented-out blocks | `src/pages/Approvals.tsx:63–79`, `src/pages/[...page].jsx:7–8`, `src/pages/Home.jsx:8`, plus `// import ... AuthContext` lines in `App.jsx:10`, `ApplyPendingUserInfo.jsx:2`, `ProtectedRoute.jsx:2`, `ClaimsTable.jsx:13`, `NavigationTracker.jsx:3`, `ClaimNotesModal.jsx:3` |

---

## 2. New dead files & directories (verified zero importers)

### Components — never imported anywhere
| File | Notes |
|---|---|
| `src/components/dashboard/ChartsSection.jsx` | Old charts implementation |
| `src/components/dashboard/DynamicChartsSection.jsx` | 680 lines, never imported |
| `src/components/dashboard/StatsCard.jsx` | |
| `src/components/dashboard/CustomizeBrandTilesModal.jsx` | Its would-be handler in Dashboard is also dead (§4) |
| `src/components/dashboard/TrafficLightIcon.jsx` | |
| `src/components/UserNotRegisteredError.jsx` | Only imported by dead `App.jsx` / `ProtectedRoute.jsx` → effectively dead |

Note: `ColumnVisibilityPicker.jsx` is **not** dead (used by `ClaimsTable.jsx:16`).

### Root-level / lib leftovers
| Item | Why it's dead |
|---|---|
| `index.html` | Vite entry; loads `/src/main.jsx`. Next.js never uses it |
| `turbopack-stub.js` + generator block `next.config.js:7–10` | The config **writes** this file on every start but nothing consumes it (the alias that would use it is commented out). Runs with no purpose |
| `entities/` directory | Base44 leftover; zero references from `src/` |
| `assets/` directory (`HendyLogo.png`, `favicon.ico`) | Zero references; `HendyLogo.jsx:4` hardcodes a remote Supabase URL instead. No `public/` dir serves them |
| `data/` directory (`*.json`, `data.js`) | `data.js` is imported only by dead `AuthContext.jsx`. The JSON files are not read by this repo (data layer is the external :5001 API). **Caution:** verify the external API server doesn't consume them before deleting — left alone for now |
| `src/lib/app-params.js` | Exports `appParams`; zero imports repo-wide |

### Orphaned but reachable
- `src/pages/Home.jsx` — a valid route (`/Home`) listed in `pages.config.js`, but no sidebar item or `createPageUrl('Home')` links to it. Reachable only by typing the URL.

### Base44 platform harness leftovers (wired in, but purposeless standalone)
Both are rendered by `src/pages/_app.jsx` (lines 42, 45) yet only do anything when the app is embedded in the Base44 editor iframe:
- `src/lib/VisualEditAgent.jsx` — postMessage-driven visual-edit overlay agent; renders `null`; in standalone production it just attaches listeners and posts to a non-existent parent.
- `src/lib/NavigationTracker.jsx` — posts URL changes to `window.parent`. Its second `useEffect` (lines 21–36) computes `pageName` and does nothing with it (a no-op effect), and its dependency array contains a literal `null`.

---

## 3. Unused shadcn/ui components and npm dependencies

_Documented only — deletion deferred by decision._

### UI components — 31 of 49 unused
**Used (18):** button, badge, card, dialog, select, input, label, table, tabs, textarea, checkbox, popover, tooltip, calendar, dropdown-menu, toaster (+ its deps toast, use-toast).

**Unused (31):** accordion, alert, alert-dialog, aspect-ratio, avatar, breadcrumb, carousel, chart, collapsible, command, context-menu, drawer, form, hover-card, input-otp, menubar, navigation-menu, pagination, progress, radio-group, resizable, scroll-area, separator*, sheet*, sidebar, skeleton*, slider, sonner, switch, toggle*, toggle-group.

_* imported only by other unused ui files (sidebar imports separator/sheet/skeleton; toggle-group imports toggle) — transitively dead._

### npm dependencies
| Category | Packages |
|---|---|
| Zero import sites anywhere | `three`, `react-leaflet`, `@stripe/react-stripe-js`, `@stripe/stripe-js`, `canvas-confetti`, `moment` (app uses `date-fns`), `lodash`, `react-markdown`, `@hello-pangea/dnd`, `react-hot-toast` |
| Dev deps, Vite leftovers | `vite`, `@vitejs/plugin-react` (no `vite.config.*` exists) |
| Used only by dead files | `react-router-dom` (only `App.jsx` / `ProtectedRoute.jsx`) |
| Used only by unused ui components | `vaul`, `input-otp`, `embla-carousel-react`, `cmdk`, `react-resizable-panels`, `sonner`, `next-themes`, and the `@radix-ui/*` packages backing the unused ui list |

Note the app has **three** toast stacks installed (radix toast — used; `sonner` and `react-hot-toast` — unused).

---

## 4. Code that runs but has no purpose

| Location | What it is |
|---|---|
| `src/pages/Dashboard.jsx:428–436` | Nine stats (`totalClaims`, `inProgressClaims`, `awaitingReviewClaims`, `completedClaims`, `rejectedClaims`, `openAlerts`, `closedAlerts`, `totalClaimed`, `nonActionableClaims`) computed every render, never referenced in the JSX |
| `src/pages/Dashboard.jsx:437` | Stray `console.log(currentUser)` — fires every render |
| `src/pages/Dashboard.jsx:59, 540–555` | `pendingAlert` machinery is inert: `setPendingAlert` is only ever called with `null`, so `requireNote={!!pendingAlert}` and the `if (pendingAlert)` branch never behave as intended |
| `src/pages/Dashboard.jsx:58, 393` | `selectedBrands` / `handleSaveSelectedBrands` — the only consumer would be the never-imported `CustomizeBrandTilesModal`; `selectedBrands` is always `null` |
| `src/pages/Dashboard.jsx:468` | Guard checks `currentUser?.customRole` (camelCase) but `User.me()` returns `custom_role` — always `undefined`, so the Location-role guard never hides `BrandStatsSection` |
| `src/pages/Reporting.jsx:126–139` | Fourteen stat values computed every render, none used in the JSX |
| `src/pages/Reporting.jsx:90` | `isLoading` destructured from `useQuery`, never used |
| `src/Layout.jsx:62–67` | Six "forced password change" states declared, never read or set; no such dialog is rendered |
| `src/Layout.jsx:48` | `queryClient = useQueryClient()` never used |
| `src/Layout.jsx:28` | `authUsers` imported, never used |
| `src/Layout.jsx:69, 240–251, 359` | `SearchModal` is unreachable: the only `setSearchOpen(true)` call is inside a commented-out button |
| `src/pages/Configuration.jsx:299–305` | `handleUserInvite`'s `try` block contains only comments — the `catch` can never fire |
| `src/lib/utils.js:9` | `isIframe` exported, never imported |
| `src/api/authClient.js:116–126` | `authUsers.updateMe` never called |

---

## 5. Bugs (fix first)

### 5.1 `invalidateQuereis` typo — `src/pages/Messages.tsx:82`
```ts
queryClient.invalidateQuereis({ queryKey: ['message-reads-all', currentUser?.email] });
```
Method doesn't exist — this **throws inside `onSuccess`**, and `message-reads-all` is never invalidated (stale read-state in the "all" view until reload). Fix the spelling.

### 5.2 Typo'd status strings — `src/components/dashboard/BrandStatsSection.jsx:67, 84`
```js
!['ccompleted', ...].includes(c.status)   // line 67 — 'ccompleted' never matches
!['complted'].includes(c.status)          // line 84 — 'complted' never matches
```
Completed claims silently leak into the brand tile `count` and the all-brands count.

### 5.3 Wrong entity in undo-withdrawal — `src/components/claims/ClaimNotesModal.jsx:130–137`
`handleUndoWithdrawal` writes audit-log fields (`field_changed`, `old_value`, `new_value`, `change_type`) via `ClaimNote.create`. Compare the correct `handleWithdraw` (lines 107–114), which uses `ClaimAudit.create`. Undo events never reach the audit history and malformed rows land in ClaimNote.

### 5.4 React Query cache-key collisions (latent data bugs)
The same query key is registered with **different query functions** in different components — whichever mounts first poisons the shared cache for the others:

| Key | Conflicting sources |
|---|---|
| `['currentUser']` | `User.me()` (single object) in `Dashboard.jsx:71`, `ClaimsTable.jsx:44`, `ClaimNotesModal.jsx:46`, `ClaimFormCard.jsx:32`, `Layout.jsx:90` — but **`User.get()` (array of all users)** in `EditClaimModal.jsx:36–39` |
| `['allUsers']` | Email-only `User.query('email')` in `Dashboard.jsx:94` vs full `User.get()` in `ClaimsTable.jsx:74`, `Approvals.tsx:86` — if Dashboard wins, `getUserName` silently falls back to raw emails |
| `['claims']` | `WarrantyClaim.query()` in `Dashboard.jsx:78` vs `WarrantyClaim.get()` in `Reporting.jsx:91` |

Additionally, identical data is double-fetched under duplicate keys: `'sites'` vs `'allSites'` (`ClaimsTable.jsx:70`, `BrandStatsSection.jsx:17`), `'brands'` vs `'allBrands'` (`BrandStatsSection.jsx:12`).

---

## 6. Refactoring / efficiency opportunities

1. **Centralize React Query into shared hooks** (`useCurrentUser`, `useBrands`, `useSites`, `useAllUsers` — e.g. in `src/hooks/`). One canonical key + queryFn each. Fixes every §5.4 collision and the redundant fetches in a single move. _Highest value._
2. **Memoize derived data.** `Dashboard.jsx` recomputes the full claims filter (121–205) plus ~6 per-render IIFEs (`adminBrands` 99–118, `activeSelectedBrands` 399–410, `siteBrandRestriction` 412–419, `visibleBrands` 421–425) and 9 full-list `.filter()` passes on every render/keystroke. `Reporting.jsx:96–139` repeats the same anti-pattern. Wrap in `useMemo`; also `getStatusMatches` (Dashboard 148–158) rebuilds its status map once per claim. Then `React.memo` the heavy children and memoize the fresh arrays/closures passed at `Dashboard.jsx:458–473` (line 458 builds a new filtered array inline every render).
3. **Extract the deadline "traffic-light" logic** — the same ~40-line days-remaining + green/amber/red computation appears **four times**: `ClaimsTable.jsx:460–506` and again `791–836`, `ClaimFormCard.jsx:279–325`, `BrandStatsSection.jsx:22–49`, plus the Dashboard filter variant (180–201). One `getDeadlineStatus(brand, deadline) → { color, daysRemaining }` util in `src/utils/`.
4. **`ClaimsTable.jsx` renders the entire table twice** — inline (328–628) and fullscreen dialog (662–980), ~300 near-identical JSX lines; every column change must be made in both. Extract a shared table/row component. While there: replace the per-row `.find()` calls (`allSites.find` 388, `brands.find` 394 + 461, `allUsers.find` via `getUserName` 542) with memoized id→record maps (currently O(rows × lookup-table), doubled by the twin render), and cap the `delay: index * 0.05` row animation (362, 695 — 5 s stagger at 100 rows).
5. **Split `Configuration.jsx` (1,767 lines)** into per-tab components: Sites (377–517 + edit dialog 1435–1580), Brands (519–931), Alerts (933–1038), Resolutions (1040–1145), Users (1147–1324 + dialogs 1327–1433, 1606–1727), TempPasswordDialog (1729–1764). Extract the **7 near-identical threshold `<Input>` blocks** (679–924) into one `<ThresholdInput>` (note each `onBlur` currently fires a separate PUT). Hoist `pendingInvites.filter(p => !users.find(...))`, computed twice per render (1158, 1277).
6. **Extract `normalizeUser()`** — the snake↔camel user-field remap is copy-pasted in **8 places**: `authClient.js:28–37` and `40–70`, `databaseClient.js` `me()` (165–176), and the `getServerSideProps` of 6 pages (`Dashboard.jsx:31–46`, `Configuration.jsx:38–53`, `Reporting.jsx:28–43`, `ClaimForm.jsx:24–40`, `Approvals.tsx:29–43`, `[...page].jsx`). The `customRole` bug in §4 is exactly the drift this causes.
7. **Shared small utils:** `getUserName` exists in 3 variants (`Approvals.tsx:138–142`, `DashboardFilters.jsx:131`, `ClaimsTable.jsx:212–230`); date formatting is ad-hoc in 3+ files; the status color/label config is duplicated (`ClaimsTable.jsx:22–30`, inline approval-status badge blocks at 517–528 and 846–861, `BrandStatsSection.jsx:98–106`). `EditClaimModal` builds the same ~55-line save payload twice (`handleSubmit` 105–135 vs Mark-as-Claimed 531–560) — extract `buildClaimPayload()`.
8. **`Messages.tsx:55` polls the entire MessageRead table every 3 s.** Prefer invalidation on send/mark-read (which already exists — once the §5.1 typo is fixed) with a much slower background refetch.
9. **Push filtering server-side as data grows.** `databaseClient.js` `list()` (72–86) and multi-field `filter()` (112–152) fetch whole collections and sort/filter client-side; Dashboard and Reporting pull *all* claims. The server-side `query(select, where)` path already exists (see `Approvals.tsx:83`).

---

## 7. Summary & priority order

| Category | Count |
|---|---|
| Bugs (§5) | 4 |
| Dead files/dirs to delete (§1 + §2) | ~18 files/dirs |
| Unused ui components (§3) | 31 |
| Unused npm deps (§3) | 13 direct + ui-only extras |
| Purposeless in-component code (§4) | 14 locations |
| Refactor/efficiency items (§6) | 9 |
| Doc drift (§0) | CLAUDE.md |

Recommended order when action is taken:
1. **Fix the four bugs (§5)** — typo, status strings, wrong entity, query-key collisions.
2. **Centralize query hooks (§6.1)** — closes the collision class permanently.
3. **Memoize Dashboard/Reporting (§6.2)** — biggest render-cost win.
4. **Delete dead files** (§1 Vite leftovers + §2) — verify `data/` against the external API first.
5. **Dedupe/split refactors** (§6.3–6.7).
6. **Update CLAUDE.md** to match the restored production auth/middleware and the real data layer.

Deferred by decision on 2026-07-16: ui/dependency purge (§3), deletion of local-dev leftovers (`data/`, `entities/`, commented mock blocks), CLAUDE.md update.
