# Code Audit — Warranty Claim Tracker

_Generated: 2026-06-19_

This document records dead code, efficiency problems, and cleanup opportunities found across the codebase. Items are grouped by category and sorted roughly by impact.

---

## 1. Vite Migration Leftovers (Safe to Delete)

The app was migrated from Vite + React Router to Next.js 15 Pages Router. Several Vite-era files were never removed and are now completely unreachable.

| File | Why it's dead |
|---|---|
| `src/main.jsx` | Vite entry point — Next.js does not use it. Only imports `App.jsx`. |
| `src/App.jsx` | Vite root component using `react-router-dom`. Next.js uses `src/pages/_app.jsx` instead. Contains a crash bug (references `useAuth` which is commented out). |
| `src/components/ProtectedRoute.jsx` | React Router `<Outlet>`-based auth guard. Never imported anywhere. Contains undefined variable references (`isLoadingAuth`, `isAuthenticated`, etc.) because the `useAuth()` call it depended on is commented out — would crash at runtime if used. |
| `src/lib/AuthContext.jsx` | `AuthProvider`/`useAuth` context. Every single import of this file across the codebase is commented out. Never active in the current app. |
| `src/lib/PageNotFound.jsx` | Only imported inside the dead `App.jsx`. |

**Action:** Delete all five files.

---

## 2. Unused API / Data Files

| File | Why it's dead |
|---|---|
| `src/api/databaseClientOld.js` | Old DB client implementation — zero imports across the whole codebase. |
| `src/api/entities.js` | Mock entities helper — zero imports across the whole codebase. |

**Action:** Delete both files.

---

## 3. Active Bug

### `src/pages/Messages.tsx` — line 58

```ts
// Line 57 — correct
queryClient.invalidateQueries({ queryKey: ['message-reads', currentUser?.email] });
// Line 58 — TYPO: method does not exist, silently does nothing
queryClient.invalidateQuereis({ queryKey: ['message-reads-all', currentUser?.email] });
```

The second query key (`message-reads-all`) is never invalidated after a message is marked read. The read-state for the "all" view will be stale until a full page reload.

**Action:** Fix `invalidateQuereis` → `invalidateQueries` on line 58.

---

## 4. Commented-Out Code Blocks to Remove

These are not local-dev workarounds (those are documented in `CLAUDE.md`) — they are genuinely dead code that should be deleted.

| File | Lines | What it is |
|---|---|---|
| `src/lib/auth.ts` | 8–67 | Full `betterAuth(...)` configuration block (~60 lines), replaced by mock stubs |
| `src/pages/Approvals.tsx` | 60–76 | Old `useState`/`useEffect` approach replaced by `useQuery` |
| `src/pages/Approvals.tsx` | 69 | `// console.error(...)` — commented debug line |
| `src/pages/[...page].jsx` | 7 | Single commented import line |
| `src/pages/Home.jsx` | 8 | Single commented import line |

Additionally, these repeated one-liner commented imports appear in seven files and can all be deleted — they are traces of `AuthContext.jsx` being removed from each file:

```
// import { useAuth } from '@/lib/AuthContext';
// import { AuthProvider } from '@/lib/AuthContext';
```

Files: `_app.jsx`, `App.jsx`, `ApplyPendingUserInfo.jsx`, `ProtectedRoute.jsx`, `ClaimsTable.jsx`, `NavigationTracker.jsx`, `ClaimNotesModal.jsx`

---

## 5. Console Logs to Remove

These fire in the active production code path and should be removed.

| File | Line | What it logs |
|---|---|---|
| `src/api/databaseClient.js` | 40 | Every API request URL (`[API FETCH URL] ...`) |
| `src/api/databaseClient.js` | 79 | Raw response data from every update mutation |
| `src/pages/Configuration.jsx` | 1429 | Brand object logged during a form handler |
| `src/components/auth/ApplyPendingUserInfo.jsx` | 24 | Info log on user info apply (the `console.error` on line 37 is acceptable) |

---

## 6. Unused Imports

| File | Import | Reason |
|---|---|---|
| `src/pages/Approvals.tsx` | `getData` from `@/api/databaseClient` | Imported but never called in this file |
| `src/pages/Approvals.tsx` | `GetServerSideProps` from `next` | Imported type never used in annotations |
| `src/pages/Configuration.jsx` | `getData`, `updateSite` | Imported but not called; only `databaseClients` is used |

---

## 7. Efficiency Improvements

### Dashboard.jsx — filter logic not memoized

`src/pages/Dashboard.jsx` lines 115–207 run a multi-condition filter over the full claims array on every render. With a large dataset this recalculates unnecessarily whenever any unrelated state changes (e.g. a modal opening).

```jsx
// Current pattern — recalculates every render
const filtered = claims.filter(c => ...complex conditions...);

// Better — only recalculates when inputs change
const filtered = useMemo(
  () => claims.filter(c => ...complex conditions...),
  [claims, filters, dateRange, searchQuery, ...]
);
```

### Duplicated user field mapping

The logic that maps auth-layer user fields to the app's user format is written twice:

- `src/api/authClient.js` lines 26–37
- `src/api/databaseClient.js` lines 154–165

These should be a single shared utility function, e.g. `src/utils/mapAuthUser.js`, to prevent the two copies drifting out of sync.

---

## 8. pages.config.js — Missing Approvals Entry

`src/pages.config.js` exports a `PAGES` map used by `_app.jsx` to determine the `currentPageName` passed to the Layout (which controls sidebar highlighting and breadcrumbs). `Approvals` is not in this map:

```js
// pages.config.js — Approvals is absent
export const PAGES = {
  "ClaimForm": ClaimForm,
  "Dashboard": Dashboard,
  "Home": Home,
  "Reporting": Reporting,
  "Messages": Messages,
  "Configuration": Configuration,
  // "Approvals" is missing
}
```

The Approvals page works as a Next.js route (`/Approvals`) and appears in the sidebar, but `currentPageName` will not resolve correctly when on that page, so the sidebar active state will be wrong.

**Action:** Add `import Approvals from './pages/Approvals'` and add `"Approvals": Approvals` to the `PAGES` object.

---

## Summary

| Category | Count | Priority |
|---|---|---|
| Dead files to delete | 7 | High |
| Active bug (typo) | 1 | High |
| Console logs to remove | 4 | Medium |
| Commented code to remove | 8 locations | Medium |
| Unused imports | 5 | Low |
| Efficiency improvements | 2 | Low |
| Config gap (Approvals) | 1 | Medium |

The highest-value actions are deleting the 7 dead files (lines 1–3 above) and fixing the `invalidateQuereis` typo. Everything else is cleanup.
