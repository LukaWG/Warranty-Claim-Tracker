# Code Audit — Warranty Claim Tracker

Date: 2026-08-12
Scope: full repo (`src/`, `prisma/`, `k8s/`, `Dockerfile`, `docker-compose.yaml`, CI workflows).
Method: manual review of auth, the data-proxy layer, Prisma schema, frontend data hooks/components, infra manifests; `npm audit` (0 vulnerabilities at time of writing).

Findings are ordered by severity within each section. Line numbers refer to the current state of the file at time of writing.

---

## 1. Security

### 1.1 Critical — No server-side authorization on `/api/data/*`, only authentication
[`src/pages/api/data/[...path].ts`](src/pages/api/data/%5B...path%5D.ts) checks that a session exists, then forwards **any** method (GET/POST/PUT/DELETE) to **any** collection path on the internal data API, using a shared `DATA_API_KEY` that carries no information about which user is calling. Role gating (`Owner`/`Group Manager` vs `Location`, `isProcessor`/`isManager` checks) exists only in the frontend (e.g. [`Configuration.jsx:23`](src/pages/Configuration.jsx#L23), [`ClaimsTable.jsx:84`](src/components/dashboard/ClaimsTable.jsx#L84)) — it hides buttons and redirects pages, but nothing stops a logged-in "Location" user from calling the proxy directly (e.g. via devtools/curl with the session cookie) to:
- `PUT /api/data/User/<ownId>` with `{"customRole":"Owner","role":"admin"}` — self-promote to full admin.
- `DELETE /api/data/WarrantyClaim/<id>` or `/api/data/Brand/<id>` / `/api/data/Site/<id>` — destroy records a "Location" user should never be able to touch.
- `POST /api/data/WarrantyClaim` with an arbitrary `created_by`/`created_by_id` — the client sets these fields itself ([`databaseClient.js:48-49`](src/api/databaseClient.js#L48-L49)), so they're trivially spoofable, undermining any audit trail that relies on them.

Since the data API only sees the shared internal key (never the calling user's identity), authorization for writes/deletes **must** happen in this proxy — right now it happens nowhere. This is the single highest-impact issue in the codebase.

**Fix direction:** have the proxy load `session.user.customRole`/`role` and apply a per-collection/per-method allow-list before forwarding (e.g. only `Owner`/`Group Manager` may write to `User`, `Brand`, `Site`; only `Owner`/`Group Manager` may `DELETE` claims), and set `created_by`/`created_by_id` server-side from the session rather than trusting client-supplied values.

### 1.2 High — Password reset only logs to console; no email is actually sent
[`src/lib/auth.ts:52-59`](src/lib/auth.ts#L52-L59): `sendResetPassword` just `console.log`s the reset URL and raw token instead of emailing the user. Two problems:
- Functionally, self-service password reset doesn't work for real users — [`forgot-password.tsx:48`](src/pages/forgot-password.tsx#L48) tells them to "check your console/logs", which isn't something an end user can do.
- The reset token (equivalent to a temporary password-reset credential) is written to server logs in plaintext, where it may be retained/aggregated far longer than the token's validity window and read by anyone with log access.

**Fix direction:** wire up a real transactional email sender (SMTP relay, SES, etc.) before this ships beyond local testing; stop logging the raw token.

### 1.3 Medium — Microsoft SSO tenant restriction defaults to `common`
[`src/lib/auth.ts:117-129`](src/lib/auth.ts#L117-L129) already documents the risk in comments: leaving `tenantId` as `"common"` lets *any* Microsoft account (personal Outlook, or any other organization's tenant) complete SSO — the `@hendy-group.com` email-domain check in `databaseHooks.user.create.before` is the only backstop. The currently-provisioned `k8s/secret.yaml` still sets `microsoft-tenant-id`/`MICROSOFT_TENANT_ID` to `"common"`, i.e. the recommended hardening from the code comment hasn't actually been applied to the real deployment config. Low urgency only because the email-domain check is a real second layer, but it's the kind of defense-in-depth gap that's easy to forget about.

**Fix direction:** set `MICROSOFT_TENANT_ID` to Hendy Group's actual Entra ID tenant GUID in the real secret.

### 1.4 Low — `ctx.body?.email.endsWith(...)` can throw instead of returning a clean 400
[`src/lib/auth.ts:67`](src/lib/auth.ts#L67): `if (!ctx.body?.email.endsWith("@hendy-group.com"))` — the optional-chaining only guards `ctx.body`; if `ctx.body` exists but `email` is missing/undefined, `.endsWith` is called on `undefined` and throws a `TypeError` instead of the intended `APIError("BAD_REQUEST", ...)`. Depending on how Better Auth's middleware wraps this, a malformed sign-up request likely surfaces as a 500 instead of a controlled 400.

**Fix direction:** `ctx.body?.email?.endsWith(...)`.

### 1.5 Informational — things done well
Worth naming so they aren't accidentally regressed later:
- CSV export already guards against formula/CSV injection (leading `=`,`+`,`-`,`@` escaped) — [`ExportButton.jsx:7-14`](src/components/dashboard/ExportButton.jsx#L7-L14).
- Solid CSP + security headers (`frame-ancestors 'none'`, `object-src 'none'`, HSTS, `X-Content-Type-Options`) in [`next.config.js`](next.config.js).
- No `dangerouslySetInnerHTML`/`eval` anywhere in `src/`; message bodies are rendered as plain text (React-escaped) in [`MessageThread.jsx:18`](src/components/messages/MessageThread.jsx#L18).
- Docker image runs as a non-root user (`nextjs`, uid 1001) — [`Dockerfile:56-68`](Dockerfile#L56-L68).
- The real `k8s/secret.yaml` is correctly gitignored and confirmed to have never been committed (`git log` shows no history for that path) — only the templated `secret.example.yaml` is tracked.
- Admin-only endpoints added on top of Better Auth (`list-user-providers`, `set-user-password` in [`[...all].ts`](src/pages/api/auth/%5B...all%5D.ts)) do check `session.user.role === "admin"` server-side, and correctly refuse to attach a password to SSO-only accounts.
- Rate limiting is backed by Postgres rather than per-process memory, so it actually works across replicas ([`auth.ts:42-48`](src/lib/auth.ts#L42-L48)).

---

## 2. Correctness bugs

### 2.1 Inverted condition hides "unread approval" indicators for every logged-in user
[`ClaimsTable.jsx:115-122`](src/components/dashboard/ClaimsTable.jsx#L115-L122):
```js
const unreadApprovalClaimIds = useMemo(() => {
  if (!!currentUser?.email) return new Set();   // <-- should be `!currentUser?.email`
  ...
}, [approvalMessages, currentUser]);
```
This returns an empty set whenever `currentUser.email` is truthy — i.e. for every logged-in user, which is the only case that matters. The sibling `unreadClaimIds` computation three lines above it uses the correct `if (!currentUser?.email) return new Set();`. As written, the teal "unread approval" dot on the Credit button ([`ClaimsTable.jsx:521-523`](src/components/dashboard/ClaimsTable.jsx#L521-L523)) can never appear.

**Fix:** drop the extra `!`.

### 2.2 CSV export throws for any claim whose brand was deleted/renamed
[`ExportButton.jsx:41`](src/components/dashboard/ExportButton.jsx#L41):
```js
brands.find(b => b.id === claim.brand).name,
```
If a claim references a brand id that no longer exists in `brands` (deleted brand, stale data, type mismatch), `.find()` returns `undefined` and `.name` throws, crashing the entire export for every selected claim rather than just showing "—" for that one row — inconsistent with how every other cell in the same file (`claim.alert || ''`, `claim.claimed_date ? ... : ''`) degrades gracefully.

**Fix:** `brands.find(b => b.id === claim.brand)?.name ?? ''`.

---

## 3. Efficiency / scalability

### 3.1 No pagination — every list view fetches the entire table, repeatedly
`useClaims` ([`useClaims.js`](src/hooks/useClaims.js)), `useAllUsers`, `useBrands`, `useSites` all call `databaseClients.X.get()`, which has no `limit`/`offset`/`where` — it fetches the *whole* collection every time, and `useClaims`/the unread-message queries in `ClaimsTable.jsx` do this again every 30 seconds (`refetchInterval: 30000`) for every open tab. `filter()` in [`databaseClient.js:103-143`](src/api/databaseClient.js#L103-L143) explicitly fetches everything and filters client-side whenever more than one field is filtered. This is fine at today's data volume but will degrade linearly (network payload, JSON parse time, table re-render) as claims/users/messages accumulate — there's no ceiling.

**Fix direction:** push filtering/pagination down to the data API where practical, and for the unread-message polling in particular, replace "fetch the last 200 messages and recompute a Set client-side every 30s" with a small server-side unread-count/ids endpoint.

### 3.2 Unread-message computation does an O(messages) scan on every poll, in a component that also renders the whole table
[`ClaimsTable.jsx:87-122`](src/components/dashboard/ClaimsTable.jsx#L87-L122) fetches up to 200 messages and up to 200 approval messages every 30s and recomputes two `Set`s via `useMemo` — reasonable at 200 items, but combined with 3.1, this pattern (poll broad, filter narrow, client-side) is repeated across the message/approval features and won't scale past a few hundred concurrent messages.

### 3.3 No virtualization on the claims table
[`ClaimsTableGrid`](src/components/dashboard/ClaimsTable.jsx#L313) maps `sortedClaims` directly into `<motion.tr>` rows with a per-row Framer Motion entrance animation and no windowing. Fine for tens of rows; will get janky (large DOM, animation overhead) once a site accumulates hundreds of claims with no archiving/pagination in the UI.

### 3.4 `rateLimit` table has no retention/cleanup
[`prisma/schema.prisma:83-90`](prisma/schema.prisma#L83-L90) / the `add_rate_limit_table` migration create a `rateLimit` row per rate-limited key with no TTL or periodic purge — it will grow unbounded over the life of the deployment. Low impact at current scale, but worth a scheduled cleanup (or switching to a `lastRequest`-based prune on read) before it's forgotten.

### 3.5 `:latest` image tag + `imagePullPolicy: Always` in k8s
[`k8s/deployment.yaml`](k8s/deployment.yaml) deploys `lukawg/warranty-claim-tracker:latest`. The CI workflow does also push a `:${{ github.sha }}` tag, but the deployment doesn't use it — so every pod restart / new replica can pull whatever `latest` happens to point to at that moment, rather than the version that was actually tested/rolled out. This makes rollbacks and reproducible deploys harder than they need to be.

**Fix direction:** pin the deployment to the SHA tag and bump it via your existing rollout process (or a tool like Flux/Argo/Watchtower with digest pinning).

---

## 4. Other maintainability / robustness notes

- **`typescript.ignoreBuildErrors: true`** in [`next.config.js:50-52`](next.config.js#L50-L52) means the production build succeeds even with type errors — a real regression (e.g. a renamed field) can ship silently. Worth removing once the `.jsx`→`.tsx` migration mentioned in file naming (`Approvals.tsx`, `Messages.tsx` vs. the many `.jsx` files) is further along.
- **Mixed `.jsx`/`.tsx` codebase** with parallel snake_case/camelCase field shims (`normalizeUser.js` maps `customRole`↔`custom_role`, `defaultSite`↔`default_site`, etc., and this pattern is repeated ad hoc in components via `currentUser?.custom_role || currentUser?.role`). This works but is easy to get subtly wrong (see 2.1's sibling logic, and the double-fallback chains scattered through `ClaimsTable.jsx`); consolidating on one casing at the API boundary would remove a recurring source of bugs.
- **k8s Deployment has no `securityContext`** (e.g. `runAsNonRoot: true`, `readOnlyRootFilesystem`, `allowPrivilegeEscalation: false`) even though the image itself already runs as a non-root user — setting it explicitly at the pod/container level is a small, low-risk hardening step and documents the intent.
- **No `PodDisruptionBudget`** despite running 2 replicas with a `RollingUpdate` strategy — a node drain could take both pods down at once.
- **Ingress has no TLS block** ([`k8s/ingress.yaml`](k8s/ingress.yaml)) — consistent with this being a LAN-only deployment (host is a bare IP), but worth a deliberate decision rather than an implicit one, since session cookies and credentials currently travel as plaintext HTTP on the LAN. (Note also that the `Strict-Transport-Security` header sent by [`next.config.js`](next.config.js) is inert over plain HTTP — harmless, but signals an assumption of HTTPS that isn't actually in place.)
- **`.env` is missing `AUTH_DATABASE_URL`** locally (see prior session's memory note) — not a code bug, but worth fixing in the local dev setup / `.env.example` if one doesn't already document every variable `src/lib/auth.ts`, `proxy.ts`, and `[...path].ts` read from `process.env`.

---

## Priority summary

| # | Issue | Severity |
|---|---|---|
| 1.1 | `/api/data/*` proxy has no server-side authorization — any authenticated user can read/write/delete any collection | **Critical** |
| 1.2 | Password reset never emails the user; token logged in plaintext | High |
| 2.1 | Unread-approval indicator inverted condition | Medium (functional bug, low blast radius) |
| 1.3 | Microsoft SSO tenant left as `common` in the real secret | Medium |
| 2.2 | CSV export crashes on a dangling brand reference | Low-Medium |
| 1.4 | Unhandled `TypeError` on malformed sign-up body | Low |
| 3.1–3.3 | No pagination/virtualization — scales fine today, won't past a few hundred rows | Low today, watch closely |
| 3.4, 3.5, §4 | Housekeeping (retention, image pinning, type-check enforcement, k8s hardening) | Low |

The most impactful single fix is **1.1**: add real per-collection/per-method authorization to the data proxy, and stop trusting client-supplied `created_by`/`created_by_id`. Everything else in this report is either a small correctness fix (2.1, 2.2, 1.4) or scales-with-growth housekeeping.
