# Code Audit — Warranty Claim Tracker

_Generated: 2026-08-10 (supersedes the 2026-07-16 audit, "CODE_AUDIT V2.md")_

This document re-verifies every claim in CODE_AUDIT V2 against the current codebase. Every item below was checked directly (Read/Grep against the live files, not assumed from the prior report) and line numbers were re-confirmed. Per the audit's scope this is a **report only** — no code was changed, no files deleted, no dependencies pruned.

**Biggest change since V2: `src/pages/Reporting.jsx` was deleted outright** (commit `4e0e049 "Remove Reporting page"`), along with `src/lib/VisualEditAgent.jsx`, `src/lib/NavigationTracker.jsx`, and the `entities/` directory. Several V2 findings that referenced these are now moot rather than open — flagged individually below.

---

## 0. Doc drift — resolved

V2 flagged that CLAUDE.md's "Local Dev Caveats" section didn't match reality (claimed mock auth/open middleware/JSON-file DB when the real implementations were already active). The current `CLAUDE.md` has **no such section** — it now correctly documents real Better Auth, real middleware, and the external HTTP API data layer. **No action needed.**

---

## 1. Status of the 2026-07-16 (V2) findings

### Bugs — all four fixed
| Bug | Status |
|---|---|
| §5.1 `invalidateQuereis` typo, `Messages.tsx` | ✔ Fixed — correct spelling now at `Messages.tsx:75, 307, 322`. Zero occurrences of the typo repo-wide. |
| §5.2 `'ccompleted'`/`'complted'` typos, `BrandStatsSection.jsx` | ✔ Fixed — both now spelled `'completed'` (lines 67, 84 and all other occurrences in the file). |
| §5.3 `handleUndoWithdrawal` writing wrong entity, `ClaimNotesModal.jsx` | ✔ Fixed — now writes both `ClaimNote.create` (user-visible note) and `ClaimAudit.create` (audit fields: `field_changed`, `old_value`, `new_value`, `change_type`), lines ~136–164, matching the `handleWithdraw` pattern. |
| §5.4 `['currentUser']` cache-key collision | ✔ Fixed — every `['currentUser']` query across the app now uses `currentUserClient.me()` as its queryFn (`Layout.jsx`, `Dashboard.jsx`, `Approvals.tsx`, `ClaimNotesModal.jsx`, `EditClaimModal.jsx`, `ClaimsTable.jsx`, `ClaimFormCard.jsx`, `Messages.tsx`, `ApprovalMessages.jsx`, `CreditOptionsModal.jsx`). |
| §5.4 `['allUsers']` cache-key collision | ✔ Fixed — `src/hooks/useAllUsers.js` (queryFn `databaseClients.User.get()`) is now used everywhere; no competing `User.query('email')` queryFn remains under that key. |
| §5.4 `['claims']` cache-key collision | ✔ Fixed (and one side is now moot) — `src/hooks/useClaims.js` is used by `Dashboard.jsx` and `SearchModal.jsx`. The other side of the original collision, `Reporting.jsx`, **no longer exists** (page deleted). |

### Bug still open (V2 flagged, not yet fixed)
- **`'sites'`/`'allSites'` and `'brands'`/`'allBrands'` duplicate query keys** — confirmed still unaddressed. No `useSites`/`useBrands` hook exists in `src/hooks/` (only `useAllUsers.js`, `useClaims.js`, `use-mobile.jsx`). Inconsistent keys/queryFns persist across `BrandStatsSection.jsx:13,18`, `ClaimsTable.jsx:62,71`, `Dashboard.jsx:64,69`, `Approvals.tsx:38,43`, `EditClaimModal.jsx:19,23`, `ClaimFormCard.jsx:27,34`, `ComposeMessageModal.jsx:39,44,55`, `MessageThread.jsx:129`, `Messages.tsx:53`, `ExportButton.jsx:11` — some plain `.get()`, some with extra client-side transform logic, so this is a real duplicate-fetch problem, not just a naming inconsistency.

### V2 claims that no longer apply (target deleted)
| V2 claim | Current reality |
|---|---|
| §2 "`src/lib/VisualEditAgent.jsx`/`NavigationTracker.jsx` rendered by `_app.jsx` lines 42/45, purposeless standalone" | Both files are **deleted**. Current `_app.jsx` is 52 lines and never referenced them — the real `_app.jsx` only ever rendered `<Head>`/`<QueryClientProvider>`/`<Toaster>`. Only the dead `src/App.jsx` still has commented-out imports of them (lines 5–6, 81, 85). This V2 entry was already stale when written, or the deletion happened right after. |
| §2 "`entities/` directory; Base44 leftover" | **Deleted.** No longer present. |
| §1 "Commented block `Approvals.tsx:63–79`" | **No longer a comment block.** Lines 50–93 in the current file are live code (`useQuery` for `currentUser`, `approveMutation`). Either V2's line numbers were already off, or this was cleaned up incidentally — there is no dead comment block there now. |
| §4 "Reporting.jsx: 14 unused stats computed every render" / "`isLoading` unused" | **Moot** — `src/pages/Reporting.jsx` doesn't exist (page deleted entirely). |
| §6.2 "Reporting.jsx equivalent [of the memoization fix] not yet done" | **Moot** — same reason. |

### V2 checkmark that was wrong
- §1 marked `src/components/auth/ApplyPendingUserInfo.jsx:24` console.log as **fixed (✔)**. It is **not** — `console.log('Found pending user invite:', pendingInfo);` is still at line 24. See §8 for the full status of this file.

### Additional cleanup found (not previously logged)
- `console.log`s at `src/api/databaseClient.js:30,90` — removed.
- `console.log` at `src/pages/Configuration.jsx:1449` — removed (that line is now unrelated checkbox JSX).

---

## 2. Dead files & directories — re-verified

### Still dead, zero importers (unchanged from V2)
| File | Notes |
|---|---|
| `src/components/dashboard/ChartsSection.jsx` | |
| `src/components/dashboard/DynamicChartsSection.jsx` | |
| `src/components/dashboard/StatsCard.jsx` | |
| `src/components/dashboard/CustomizeBrandTilesModal.jsx` | Its would-be caller in Dashboard.jsx (`selectedBrands`/`handleSaveSelectedBrands`, now lines 43, 438–441) is also still dead |
| `src/components/dashboard/TrafficLightIcon.jsx` | |
| `src/components/UserNotRegisteredError.jsx` | Only real importer is dead `ProtectedRoute.jsx:3` → transitively dead |
| `index.html` | Vite entry, loads `/src/main.jsx`; Next never touches it. Only "reference" is `tailwind.config.js`'s content-glob (a scan path, not a real dependency) |
| `src/lib/app-params.js` | Exports `appParams`, zero imports |
| `src/api/entities.js` | Zero imports |
| `src/main.jsx`, `src/App.jsx`, `src/components/ProtectedRoute.jsx`, `src/lib/AuthContext.jsx` | Dead Vite-era scaffold, all zero live importers |
| `data/` directory (`*.json`, `data.js`) | `data.js` imported only by dead `AuthContext.jsx`; JSON files unreferenced. **Caution unchanged: verify the external :5001 API doesn't consume them before deleting.** |

### Already deleted since V2 (no longer needs action)
- `entities/` directory
- `src/lib/VisualEditAgent.jsx`
- `src/lib/NavigationTracker.jsx`
- `src/pages/Reporting.jsx`

### Corrections to V2's description
| Item | V2 said | Actually |
|---|---|---|
| `turbopack-stub.js` generator block | `next.config.js:7–10` | Now `next.config.js:7–11` (5 lines: the `stubPath`/`existsSync`/`writeFileSync` block). Still writes a file nothing consumes — the alias that would use it is still commented out at line 29. |
| `assets/` directory | "No `public/` dir serves them" | A `public/` dir now exists (`favicon.ico`, `favicon-dark.ico`, `favicon-teal.ico`), wired via `_app.jsx:42–43`. It serves **different** favicon files — `assets/HendyLogo.png`/`favicon.ico` are still completely unreferenced (`HendyLogo.jsx:4` still hardcodes a remote Supabase URL) — just correcting the "no public/ dir" premise, not the dead-code verdict. |

### Orphaned but reachable (unchanged)
- `src/pages/Home.jsx` — valid route via `pages.config.js`, no sidebar link or `createPageUrl('Home')` reference anywhere.

---

## 3. Unused shadcn/ui components and npm dependencies

_Documented only — deletion still deferred by decision._

### UI components — now 30 of 49 unused (was 31)
`src/components/ui/` still has 49 files. **Correction:** `alert-dialog.jsx` is no longer unused — `src/components/claims/ClaimFormCard.jsx` now imports and renders `AlertDialog`/`AlertDialogContent`/etc. for a "Duplicate WIP Number" confirmation dialog.

**Used (19):** button, badge, card, dialog, select, input, label, table, tabs, textarea, checkbox, popover, tooltip, calendar, dropdown-menu, toaster (+ toast, use-toast), **alert-dialog**.

**Unused (30):** accordion, alert, aspect-ratio, avatar, breadcrumb, carousel, chart, collapsible, command, context-menu, drawer, form, hover-card, input-otp, menubar, navigation-menu, pagination, progress, radio-group, resizable, scroll-area, separator*, sheet*, sidebar, skeleton*, slider, sonner, switch, toggle*, toggle-group.

_* transitively dead only, via unused ui-internal imports (sidebar→separator/sheet/skeleton; toggle-group→toggle)._

### npm dependencies — unchanged, all still present and still unused
| Category | Packages |
|---|---|
| Zero import sites anywhere | `three`, `react-leaflet`, `@stripe/react-stripe-js`, `@stripe/stripe-js`, `canvas-confetti`, `moment`, `lodash`, `react-markdown`, `@hello-pangea/dnd`, `react-hot-toast` |
| Dev deps, Vite leftovers | `vite`, `@vitejs/plugin-react` (still no `vite.config.*`) |
| Used only by dead files | `react-router-dom` (only `ProtectedRoute.jsx`/`App.jsx`) |
| Used only by unused ui components | `vaul`, `input-otp`, `embla-carousel-react`, `cmdk`, `react-resizable-panels`, `sonner`, `next-themes`, plus the `@radix-ui/*` packages backing the unused ui list |

Still three toast stacks installed (radix — used; `sonner`, `react-hot-toast` — unused).

---

## 4. Code that runs but has no purpose

| Location | Status |
|---|---|
| `Dashboard.jsx:485–493` (was 428–436) | Still true — nine stats (`totalClaims` … `nonActionableClaims`) computed every render, never read in JSX |
| `Dashboard.jsx:494` (was 437) | Still true — stray `console.log(currentUser)` fires every render |
| `Dashboard.jsx:44, 623` (was 59, 540–555) | Still true — `pendingAlert` inert; its only setter call is `setPendingAlert(null)` |
| `Dashboard.jsx:43, 438–441` (was 58, 393) | Still true — `selectedBrands`/`handleSaveSelectedBrands` dead, sole consumer (`CustomizeBrandTilesModal`) never imported |
| `Dashboard.jsx:525` (was 468) | **Still true — and this is the one V2's normalizeUser refactor (§6.6) was supposed to prevent.** `currentUser?.customRole !== 'Location'` (camelCase) gates `BrandStatsSection`; every other role check in the same file correctly uses `custom_role` (lines 111, 324, 393, 467, 508, 516). Since `custom_role` is never `customRole`, this is always `undefined !== 'Location'` → always `true` → the guard never hides the section for Location users. One-line fix, still outstanding. |
| ~~`Reporting.jsx:126–139`, `:90`~~ | **Moot — file deleted.** |
| `Layout.jsx:76–81` (was 62–67) | Still true — six forced-password-change states, never read/set, no dialog renders them |
| `Layout.jsx:62` (was 48) | Still true — `queryClient = useQueryClient()` never used |
| `Layout.jsx:30` (was 28) | Still true — `authUsers` imported, never used |
| `Layout.jsx:69/83, ~284–295, 423` (was 69, 240–251, 359) | Still true — `SearchModal` unreachable; the only `setSearchOpen(true)` call sits inside a commented-out button |
| `Configuration.jsx:316–327` (was 299–305) | Still true — `handleUserInvite`'s try block contains only comments; catch can never fire |
| `src/lib/utils.js:9` | Still true — `isIframe` exported, never imported |
| `src/api/authClient.js:111–121` (was 116–126) | Still true — `authUsers.updateMe` never called |

---

## 5. `ApplyPendingUserInfo.jsx` — V2's checkmark was wrong, §8 note not actioned

V2's §8 note said "Remove all references to this file" and its §1 table marked the file's console.log as fixed. Neither is accurate:

- `src/components/auth/ApplyPendingUserInfo.jsx` **still exists**, is still imported (`Layout.jsx:24`) and still rendered unconditionally on every non-auth page (`Layout.jsx:223`).
- The component is still an inert placeholder: `const user = null; // Placeholder...`, so its effect always returns early at `if (!user?.email) return;` — it does nothing at runtime.
- `console.log('Found pending user invite:', pendingInfo);` is still present at line 24 (this line is dead code below the early return, so it never actually fires — but it's still there, unremoved).
- The commented `// import { useAuth } from '@/lib/AuthContext'` at line 2 is also still present.

Net effect is unchanged from V2: this file does nothing and should either be wired up to a real `user` source or deleted along with its `Layout.jsx` import/render call.

---

## 6. Refactoring / efficiency opportunities — re-verified

| # | Item | Status |
|---|---|---|
| 6.1 | Centralize React Query hooks | 🔶 Still partial, unchanged — `useAllUsers`/`useClaims` exist and are adopted; `useCurrentUser`/`useBrands`/`useSites` still don't exist; `sites`/`allSites` and `brands`/`allBrands` duplicate keys still unaddressed (see §1). |
| 6.2 | Memoize derived data | 🔶 Still partial — main claims filter in `Dashboard.jsx` (lines ~109–213) is memoized. Still unmemoized: `adminBrands` (76–85), `activeSelectedBrands` (444–455), `siteOrAdministratorBrandRestriction` (466–476, renamed from `siteBrandRestriction`), `visibleBrands` (478–482), `getStatusMatches` (156–169). No `React.memo` anywhere in `src/components/dashboard/`. The `Reporting.jsx` half of this item is moot (file deleted). |
| 6.3 | Extract `getDeadlineStatus` util | ❌ Not done — no such util in `src/utils/` or `src/lib/`. Traffic-light logic still duplicated across `ClaimsTable.jsx` (~477–519 and ~826–865), `ClaimFormCard.jsx`, `BrandStatsSection.jsx`, `Configuration.jsx`/`EditBrandModal.jsx`, and `Dashboard.jsx`'s filter (187–209). |
| 6.4 | `ClaimsTable.jsx` dual render | ❌ Not done, slightly worse — file is now **1044 lines** (grew). Inline + fullscreen-dialog copies still both exist; `.find()` lookups (`allSites.find` 404, `brands.find` 410/477/759/826) still unmemoized despite `useMemo` being used elsewhere in the same file (89, 109, 141) for other things. Uncapped `delay: index * 0.05` row stagger still present in both copies (378, 727). |
| 6.5 | Split `Configuration.jsx` | ❌ Not done, worse — file is now **2006 lines** (was 1,767). Only `EditBrandModal.jsx` has been extracted into `src/components/configuration/`; Sites/Brands/Alerts/Resolutions/Users are still all inline. The 7 near-identical threshold `<Input>` blocks are still duplicated, each firing its own `onBlur` PUT. |
| 6.6 | Extract `normalizeUser()` | ✔ Done, as claimed — `src/lib/normalizeUser.js` exists and is used by `authClient.js` (`list()`) and `currentUser.js` (`me()`); the 6 `getServerSideProps` copies stay deleted. **But** the exact bug class this was meant to eliminate reappeared at `Dashboard.jsx:525` (see §4) — worth fixing now that the util exists precisely to prevent this. |
| 6.7 | Shared small utils | ❌ Not done — `getUserName` still duplicated 3x (`Approvals.tsx:127`, `ClaimsTable.jsx:218`, `DashboardFilters.jsx:159`); status color/label config still duplicated (`ClaimsTable.jsx` `statusConfig` at line 24, plus separate inline ternaries at ~535–537 and ~880–882); `EditClaimModal.jsx` still builds the save payload twice (`handleSubmit` ~90, "Mark as Claimed" ~496–574) with no `buildClaimPayload()`. |
| 6.8 | `Messages.tsx` polling | ✅ Better than reported — interval is now **30s** (`Messages.tsx:43,49`, `UnreadBadge.jsx:14`), not 3s, and invalidation-on-action is wired up (`MessageThread.jsx` invalidates on send/mark-read). The §5.1 typo fix made this work as originally intended. Could still go slower per the original recommendation, but this is no longer an active problem. |
| 6.9 | Push filtering server-side | ❌ Not done — `databaseClient.js` `list()` (62–76) and multi-field `filter()` (101–141) still fetch whole collections client-side (the latter's comment at 102–104 explicitly documents this as a known tradeoff). Single-field `filter()`/`query()` still use server-side `where=`. |

---

## 7. Summary & priority order

| Category | Count | Change from V2 |
|---|---|---|
| Bugs open | 1 (`sites`/`brands` key duplication) | 4 fixed since V2 |
| One-line regressions to fix | 1 (`Dashboard.jsx:525` `customRole`) | New finding — recurrence of a bug §6.6 was meant to prevent |
| Dead files/dirs to delete | ~14 files/dirs | 4 already deleted since V2 (`entities/`, `VisualEditAgent.jsx`, `NavigationTracker.jsx`, `Reporting.jsx`) |
| Unused ui components | 30 | was 31 (`alert-dialog` now used) |
| Unused npm deps | 13 direct + ui-only extras | unchanged |
| Purposeless in-component code | 11 locations | was 14; 3 moot (Reporting.jsx deleted) |
| Refactor/efficiency items done or improved | 2 of 9 (`normalizeUser`, `Messages.tsx` polling) | `Messages.tsx` polling newly improved |
| Refactor/efficiency items still open | 7 of 9 | `ClaimsTable.jsx` and `Configuration.jsx` grew larger, not smaller |

### Recommended order
1. **Fix the `customRole` bug** at `Dashboard.jsx:525` — one-line change (`customRole` → `custom_role`), currently silently disabling a role-based visibility guard.
2. **Close the last query-key duplication** (`sites`/`allSites`, `brands`/`allBrands`) with `useSites`/`useBrands` hooks, following the `useAllUsers`/`useClaims` pattern already in place.
3. **Decide `ApplyPendingUserInfo.jsx`'s fate** — either wire it to a real user source or delete it and its `Layout.jsx` import/render (§5).
4. **Memoize the remaining Dashboard IIFEs** and extract `getDeadlineStatus`/`getUserName`/status-config utils (§6.2, 6.3, 6.7) — `ClaimsTable.jsx` and `Configuration.jsx` are trending larger, making this more expensive the longer it's deferred.
5. **Split `Configuration.jsx`** (now 2006 lines) into per-tab components before it grows further.
6. **Delete confirmed-dead files** (§2) — verify `data/` against the external API first, as before.
7. **UI/dependency purge** (§3) — still deferred by decision; re-confirm scope (30 components, not 31) before acting.

---

## 8. Open questions for the next audit pass

- Is `Reporting.jsx`'s removal permanent, or will similar reporting functionality be rebuilt elsewhere? If rebuilt, watch for the same unused-stats and `['claims']`-key patterns recurring.
- `ApplyPendingUserInfo.jsx` has been flagged for removal across two audits now without action — worth confirming whether it's actually still needed for some pending-invite flow that just isn't wired up yet, versus safe to delete outright.
