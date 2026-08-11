# Security Audit — Warranty Claim Tracker

**Date:** 2026-08-11
**Scope:** Next.js app (this repo), its Better Auth/Prisma/Postgres auth stack, and its trust boundary with the external "data API" (`warrantyrepairdata-api`, separate repo, reachable at `NEXT_PUBLIC_API_URL`).
**Method:** Static source review + live testing against the running local stack (Docker containers `warranty-claim-tracker-app`, `warranty-claim-tracker-db`, `warrantyrepairdata-api-1`) via `curl` and an actual browser session. No destructive testing was performed; all throwaway accounts created during testing and remediation verification were deleted from Postgres afterward.

## Summary

The app's authentication layer (Better Auth) is reasonably solid on its own, but almost every authorization decision in the product — role checks, site/brand scoping, approval workflow rules — is enforced **only in the browser**. The actual data lives behind a separate HTTP API that has **no authentication at all**. Confirmed live: an unauthenticated `curl` to that API returns every warranty claim in the system, including financial credit data and customer/site details. This single issue undermines the RBAC model described in `Layout.jsx`, `Dashboard.jsx`, `Messages.tsx`, etc. — those checks only decide what the UI *renders*, not what the *server* will do.

A second critical, independently exploitable issue: self-signup accepts any email string ending in `@hendy-group.com` with no proof of mailbox ownership (`requireEmailVerification: false`). This was confirmed live by registering `nonexistent.probe.xyz123@hendy-group.com` and receiving a valid authenticated session immediately.

| # | Severity | Finding |
|---|----------|---------|
| 1 | **Critical** | ~~Data API has no authentication~~ — **fixed (pass 1)**: session-checked proxy + shared-secret now required; row-level scoping is a follow-up pass |
| 2 | **Critical** | ~~Self-signup accepts unverified email domain match~~ — **fixed**: self-signup now only works while the user table is empty (first Owner only); everyone else must be invited |
| 3 | **High** | ~~Invited users get a hardcoded default password~~ — **fixed**: invite now generates a real random password and forces a change on first login |
| 4 | **High** | Password reset is non-functional in production (logs to console instead of emailing) |
| 5 | **High** | All authorization/business rules (RBAC, site/brand scoping, approval workflow) enforced client-side only |
| 6 | **High** | Microsoft SSO configured for `tenantId: "common"` with no domain restriction on the social sign-in path |
| 7 | **High** | ~~Known vulnerabilities in dependencies~~ — **mostly fixed**: 13→3, all remaining ones require a Next.js 15→16 major bump, deliberately deferred |
| 8 | **Medium** | No security headers (CSP, X-Frame-Options, HSTS, etc.) on the app |
| 9 | **Medium** | CSV export is vulnerable to formula/CSV injection and mishandles embedded quotes |
| 10 | **Low** | Auth rate limiting is per-instance in-memory; not shared across the 2 k8s replicas |
| 11 | **Informational** | `X-Powered-By: Next.js` discloses framework |
| — | **Positive controls observed** | See end of report |

---

## 1. Critical — Data API has no authentication — ✅ REMEDIATED (pass 1, 2026-08-11)

**Fix applied:** The browser no longer talks to the data API directly. All calls in `src/api/databaseClient.js` now go through a new same-origin proxy, `src/pages/api/data/[...path].ts`, which:
1. Verifies the caller has a valid Better Auth session (`auth.api.getSession`) — returns `401` otherwise.
2. Forwards the request to the data API with a server-only shared secret (`DATA_API_KEY` → `x-internal-api-key` header) that the browser never sees.

On the data API side (`warrantyRepairData` repo, `src/middleware.ts`), every request now requires that same shared secret (`INTERNAL_API_KEY`) or gets `401` — including requests that don't come through this app at all. The check fails closed: if the env var isn't configured, everything is rejected rather than silently allowed.

**Verified live, post-fix:**
- `curl http://192.168.1.144:5001/WarrantyClaim` with no key → `401` (was `200` + full data before the fix).
- `curl http://192.168.1.144:3000/api/data/WarrantyClaim` with no session cookie → `401`.
- Signing in and hitting `/api/data/WarrantyClaim` with the resulting session cookie → `200` + real data.
- In an actual logged-in browser session, the Dashboard, Messages, and claims list all render correctly, and the network log confirms every collection (`WarrantyClaim`, `User`, `Message`, `Brand`, `Site`, `Alert`, `AlertResolution`, `ApprovalMessage`) now loads via `/api/data/...` on the app's own origin — nothing hits port 5001 from the browser anymore.

**Deployment config updated to match:** `NEXT_PUBLIC_API_URL` (build-time, client-exposed) was removed from `Dockerfile`, `docker-compose.yaml`, and `.github/workflows/deploy.yml`; it's replaced by two server-only runtime variables, `DATA_API_URL` and `DATA_API_KEY`, set in `.env` / `docker-compose.yaml` / `k8s/configmap.yaml` (URL — not sensitive) / `k8s/secret.yaml` (key — sensitive). `k8s/secret.example.yaml` documents the new `data-api-key` field.

**What this pass deliberately did NOT fix (see "Suggested remediation order" — this is pass 2):** Row-level authorization. The proxy currently forwards any authenticated user's request as-is — it stops anonymous/unauthenticated network access to the data, but a logged-in "Location" user's browser still receives the full `WarrantyClaim`/`Message`/`User` collections and relies on client-side filtering (`Dashboard.jsx`, `Messages.tsx`, etc.) to hide rows they shouldn't see per Finding 5. Closing that gap means teaching the proxy (or the data API) each collection's actual scoping rule (by site/brand/role) — a distinct, more product-specific change than "require a credential," and out of scope for this pass by design.

<details>
<summary>Original finding (pre-fix), preserved for reference</summary>


**Where:** `src/api/databaseClient.js` (`apiFetch`), consumed by every hook (`useClaims`, `useAllUsers`, `useSites`, `useBrands`) and every mutation in `ClaimForm.jsx`, `EditClaimModal.jsx`, `Messages.tsx`, `ApprovalChat.jsx`, `ComposeMessageModal.jsx`, `UsersTab.jsx` (via `databaseClients.User` for the read side of `useAllUsers`).

`apiFetch` sends only `Content-Type: application/json` — no `Authorization` header, no session token, nothing that ties the request back to the Better Auth session established by `middleware.ts`. `middleware.ts` only gates *page navigation* in the Next.js app; it has no effect on requests made directly to `NEXT_PUBLIC_API_URL` (a different origin/port entirely).

**Live proof (read):**
```
$ curl -s http://192.168.1.144:5001/WarrantyClaim
[{"id":"...","wip_number":"500001", ... "credit":125,"credit_note":"...","total_claim_cost":300, ...}, ...]
```
No cookie, no header, no auth of any kind — returned the full claims table, including financial fields (`parts`, `labour`, `credit`, `total_claim_cost`, `credit_note`) and the email of every claim's creator. Same result for `/User`.

The `access-control-allow-methods` header on that response advertises `GET,POST,PUT,PATCH,DELETE,OPTIONS` — i.e. the write paths are exposed the same way (not tested destructively, but `databaseClient.js`'s `create`/`update`/`delete` methods use the identical unauthenticated `apiFetch`, so there's every reason to expect they succeed the same way).

**Impact:** Anyone who can reach that port — anyone on the same LAN/VPN, anyone who compromises another host with network access to it, or any authenticated app user regardless of role — can read or modify every warranty claim, credit/financial figure, and (per the collection list in `databaseClient.js`) message, approval, alert, and user record in the system, completely bypassing the app's login page, session cookie, and role model. This is also the reason findings 5 and 9-below-the-surface business rules (approval thresholds, site scoping) are unenforceable: they live only in React components that call this same unauthenticated client.

**Recommendation:** This is an architectural fix, not a patch. The data API needs to require a credential on every request (forward the Better Auth session/JWT from the Next.js server, or have Next.js proxy these calls server-side and attach a service-level API key, or terminate the data API's exposure inside a private network the browser never talks to directly) and it needs to enforce row-level authorization itself (site/brand/role scoping) rather than trusting the client to filter results after the fact.

</details>

## 2. Critical — Unverified self-signup keyed only on email string match — ✅ REMEDIATED (2026-08-11)

**Fix applied:** `src/lib/auth.ts`'s `before` hook now also rejects `/sign-up/email` whenever the `user` table already has at least one row (`prisma.user.count() > 0`), independent of the existing domain check. Self-signup is only ever reachable to create the very first Owner on a fresh deployment — exactly matching what the existing `databaseHooks.user.create.before` "first user becomes Owner" hook already assumes. Once that first user exists, the endpoint returns `400` with "Self-service sign-up is disabled. Ask an administrator to invite you." for everyone, permanently — there's no time-limited window or feature flag to remember to turn off.

This was chosen over enabling `requireEmailVerification: true` because that flag also gates *sign-in* in Better Auth (not just sign-up) — turning it on would have locked out every admin-invited user too, since `admin/create-user` doesn't set `emailVerified: true`. Fixing that properly is bundled with Finding 4 (real email delivery), which is still open.

**Verified live:** `curl -X POST /api/auth/sign-up/email` with a fresh `@hendy-group.com` address now returns `{"message":"Self-service sign-up is disabled. Ask an administrator to invite you."}`, and the same rendered correctly in the actual `/signup` page in-browser. Existing sign-in (`/api/auth/sign-in/email`) is untouched and still works.

**Not fixed by this change (separate, lower-priority items):** the Microsoft SSO path (Finding 6) still has no domain restriction if it's ever enabled — that hook is independent of this one. Real email verification/delivery (Finding 4) is still open; this fix closes the exploitable gap without needing it.

<details>
<summary>Original finding (pre-fix), preserved for reference</summary>

**Where:** `src/lib/auth.ts` (`emailAndPassword.requireEmailVerification: false`, and the `before` hook that only checks `ctx.body?.email.endsWith("@hendy-group.com")`).

**Live proof:**
```
$ curl -s -X POST http://192.168.1.144:3000/api/auth/sign-up/email \
    -d '{"email":"nonexistent.probe.xyz123@hendy-group.com","password":"Password123!","name":"Probe Test"}'
→ 200 OK, Set-Cookie: better-auth.session_token=...
  {"user":{"email":"nonexistent.probe.xyz123@hendy-group.com","emailVerified":false, "customRole":"Location", ...}}
```
An email address that has never existed and received no verification email produced a fully authenticated, immediately usable session. (Test account and its `user`/`session` rows were deleted from Postgres after confirming the behavior.)

**Impact:** The domain check is a string comparison, not proof of mailbox ownership. Anyone who can reach `/signup` can register as any not-yet-claimed `@hendy-group.com`-shaped address — including a guess at a real employee's address before that employee ever signs up, squatting their identity in the system (messages, claim history, notifications going forward would attach to the attacker's account instead). Combined with the "first user becomes Owner/admin" hook in the same file (`databaseHooks.user.create.before`), an attacker who reaches this endpoint before any real user has ever registered (e.g. against a freshly deployed instance) becomes the global admin.

**Recommendation:** Set `requireEmailVerification: true` and gate first-login/session issuance on verification, or remove open self-signup entirely in favor of the admin-invite flow (which at least requires an existing admin to act). If open signup by domain is intentional, it must be paired with a real verification email loop — which also requires fixing Finding 4.

</details>

## 3. High — Hardcoded default password for invited users, never forced to change — ✅ REMEDIATED (2026-08-11)

**Fix applied:**
- `src/api/authClient.js`'s `invite()` now generates a real random password (`src/lib/generatePassword.js`, backed by `crypto.getRandomValues` — not `crypto.randomUUID`, which requires HTTPS and would break on this app's plain-HTTP LAN deployment) and sends `mustChangePassword: true`. The same generator now also backs the admin "Reset Password" action in `UsersTab.jsx`, replacing its inline copy of the same logic.
- **Bug found while fixing this:** the invite payload was sending `firstName`, `customRole`, `defaultSite`, `defaultSites`, `defaultBrands` (and my new `mustChangePassword`) as top-level body fields, but Better Auth's `/admin/create-user` only applies additionalFields nested under a `data` key — anything else is silently stripped by its request schema before the handler ever sees it (confirmed by reading `better-auth/dist/plugins/admin/routes.mjs`). This meant **invited users' role/site/brand assignments were never actually being applied at creation time**, independent of this security fix — every invited user silently got the schema defaults (`customRole: "Location"`, no site/brand restriction) regardless of what was picked in the "Add New User" form. Fixed by nesting those fields under `data`, which was necessary for `mustChangePassword` to take effect and fixes the pre-existing bug as a side effect.
- `src/Layout.jsx` now enforces the flag instead of just storing it: a `mustChangePasswordNow` check auto-opens the existing "Change Password" dialog (retitled/reworded for this context), makes it non-dismissable (`onOpenChange` ignores close attempts while the flag is set — covers the X button, outside-click, and Escape, since Radix funnels all three through it), and blocks all page content behind it. On successful change, it calls Better Auth's self-service `authClient.updateUser({ mustChangePassword: false })` (available to any signed-in user for `additionalFields` marked `input: true` — no admin role needed) and refetches the session, which lifts the block.
- The admin UI now also surfaces the invite's generated password in the same one-time "temporary password" dialog already used for admin-triggered resets (`UsersTab.jsx`), generalized to cover both contexts.

**Verified live, full round-trip:** invited a throwaway user through the actual Configuration → Users UI, captured the generated temporary password from the dialog, confirmed `must_change_password = true` in Postgres, signed in as that user and confirmed the "Set a New Password" dialog auto-opened and blocked the app (`/` redirected to `ClaimForm` but rendered only the forced dialog), confirmed the X button did not dismiss it, completed the change, confirmed the app unblocked immediately afterward, confirmed `must_change_password` flipped to `false` in Postgres, and confirmed the old temporary password no longer works while the new one does (`401` vs `200` on `/api/auth/sign-in/email`). Test accounts were deleted from Postgres afterward.

<details>
<summary>Original finding (pre-fix), preserved for reference</summary>

**Where:** `src/api/authClient.js`, `authUsers.invite()`:
```js
password: "password", //crypto.randomUUID(), // throwaway — user resets via forgot password
```
The random-password generation is commented out; every invited account is created with the literal password `"password"`. `mustChangePassword` is not set on invite (it's only set to `true` by the separate admin "Reset Password" action in `src/pages/api/auth/[...all].ts`).

Grepping the whole app for `mustChangePassword`/`must_change_password` shows it is only ever **written** (by `normalizeUser.js`, the reset-password endpoint, and `UsersTab.jsx`'s own reset action) and **never read/enforced** anywhere — no redirect-to-change-password gate exists in `Layout.jsx`, `middleware.ts`, or any page. The field is cosmetic.

**Impact:** Every newly invited account is guessable-credential (`password`) until the user happens to change it voluntarily via the optional "Change Password" menu item in `Layout.jsx` — nothing in the product requires or even prompts that. Combined with Finding 2's guessable-email problem, an attacker doesn't even need the invite email; they can attempt sign-in directly against a guessed `firstname.lastname@hendy-group.com` with password `password` before the invited user's first login.

**Recommendation:** Generate a random one-time password (the commented-out `crypto.randomUUID()` was the right idea), set `mustChangePassword: true` on invite, and add an actual enforcement gate (e.g. in `Layout.jsx`/middleware) that blocks all app usage until the flag is cleared by a genuine password change.

</details>

## 4. High — Password reset is non-functional / reset tokens only go to server logs

**Where:** `src/lib/auth.ts`:
```js
sendResetPassword: async ({ user, url, token }, request) => {
  console.log(`PASSWORD RESET REQUEST\nUser: ${user.email}\nReset URL: ${url}\nToken: ${token}`);
}
```
No email is actually sent. In production this means "Forgot password" silently does nothing useful for the user — the only way to get a working password is the admin-invite path (Finding 3) or an admin manually reading server logs and relaying the token, which itself is an informal, unaudited credential-delivery channel with the reset token sitting in plaintext application logs.

**Recommendation:** Wire this to a real transactional email provider before relying on self-service reset. Until then, don't advertise "Forgot password" as if it works, and treat container/application logs as sensitive (they now carry live password-reset tokens).

## 5. High — Authorization and business rules are enforced only in the browser

Every one of these is real code but has zero server-side backing, because of Finding 1:

- **Role/page gating** — `src/Layout.jsx`'s `PAGE_ROLES` map and the `isAuthorized`/`AccessDenied` logic only control what renders; the underlying data fetch/mutation already happened or can be called directly.
- **Site/brand scoping** — `src/pages/Dashboard.jsx` fetches the *entire* `WarrantyClaim` collection (`useClaims` → `databaseClients.WarrantyClaim.get()`) and only then `.filter()`s it in `useMemo` by `currentUser.default_sites`/`default_brands`. A "Location" user's browser downloads every other site's and brand's claims before hiding them.
- **Messaging** — `src/pages/Messages.tsx` and `src/components/messages/ComposeMessageModal.jsx` fetch *all* messages/claims org-wide and filter client-side by role/site (`roleFilteredThreads`, `visibleClaims`). Same for `ApprovalChat.jsx`'s read-receipt logic.
- **Approval workflow / credit re-approval rule** — `src/components/claims/EditClaimModal.jsx` computes `effectiveApprovalStatus` (e.g., forcing `pending_approval` if credit changes after approval and exceeds a threshold) purely in JS before `PUT`-ing to the unauthenticated data API. Nothing stops a direct API call from setting `approval_status: "approved"` with an arbitrary credit value, skipping the approval step entirely.

**Recommendation:** Once Finding 1 is fixed by putting real authorization at the data-API layer, re-derive all of the above as *server-side* filters/validators, not client conveniences. The client-side logic can stay for UX, but must not be the only gate.

## 6. High — Microsoft SSO has no domain restriction and trusts `tenantId: "common"`

**Where:** `src/lib/auth.ts`:
```js
socialProviders: {
  microsoft: { clientId, clientSecret, tenantId: process.env.MICROSOFT_TENANT_ID || "common" }
}
```
The domain-restriction `before` hook only triggers `if (ctx.path !== "/sign-up/email") return;` — the Microsoft OAuth callback path is different, so it's never checked. `tenantId: "common"` means Microsoft will authenticate *any* Microsoft account — personal Outlook/Hotmail accounts or any organization's tenant — not just `hendy-group.com`'s Entra ID tenant.

**Current risk:** Low today, because `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` is `"false"` in `.env`, so the login button isn't shown. But `NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO` and the SSO code path both exist and work if the flag flips, and there is no enforcement hook waiting for that day.

**Recommendation:** Either set `MICROSOFT_TENANT_ID` to the actual Hendy tenant GUID (not `"common"`) and/or add a post-sign-in hook that checks the resulting user's email domain and rejects/deletes accounts that don't match, mirroring the email/password hook.

## 7. High — Known-vulnerable dependencies — ⚠️ MOSTLY REMEDIATED (2026-08-11)

**Fix applied:** `npm audit fix` (no `--force`) resolved 10 of the 13 findings entirely within the existing `package.json` semver ranges — `package.json` itself didn't need to change, only `package-lock.json`. Notably this bumped `better-auth` to `1.6.26` (past the `1.6.22` fix line) and `next` to `15.5.23`, a security-backport release on the 15.x line that turned out to already fix every *direct* Next.js CVE originally listed here (the Server Actions DoS/SSRF, cache confusion, and Server Function disclosure advisories) — none of those needed a major-version bump after all.

**Verified live post-upgrade:** rebuilt the Docker image (production `next build`, not just local install) and confirmed via `curl`: login page still renders, self-signup is still correctly disabled (Finding 2's fix intact), the `/api/data` proxy still requires a session (Finding 1's fix intact), the data API still requires its shared secret, and a real existing user's password (not a throwaway test account) still correctly validates against its stored hash — i.e. the `better-auth` bump didn't change credential-checking behavior.

`npx tsc`/`eslint` report a handful of pre-existing errors, all in files untouched by this fix (`Dashboard.jsx`, `Messages.tsx`, `AuditHistoryModal.jsx`, `ClaimNotesModal.jsx`) — unrelated, and already ignored at build time by `next.config.js` (`typescript.ignoreBuildErrors` / `eslint.ignoreDuringBuilds`).

**Remaining, deliberately deferred:** 3 findings (`postcss` XSS/path-traversal, `sharp`'s inherited `libvips` CVEs) are both *nested inside Next.js's own dependency tree* — Next bundles its own copies, so they can only be fixed by bumping `next` itself to `16.3.0`, a major version. Decided against forcing that now:
- The app doesn't use `next/image` anywhere in its own code, narrowing (though not eliminating — the platform-level `/_next/image` route still exists by default) the practical exposure to the `sharp`/libvips CVEs.
- The `postcss` advisories (unescaped `</style>` XSS, arbitrary file read via `sourceMappingURL`) are primarily build/dev-time concerns — they require processing attacker-controlled CSS/source-map input, which isn't part of this app's runtime request path.
- A Next.js major bump is a meaningfully different, riskier change than a dependency patch — this app has real surface area that could break (custom `middleware.ts`, `output: 'standalone'`, Pages Router, Turbopack dev script) and deserves its own dedicated upgrade-and-test pass rather than being rushed through as the tail end of a patching task.

**Recommendation:** Track the Next.js 16 upgrade as its own piece of work — budget time to test routing, middleware, the standalone Docker build, and the admin/auth flows end-to-end before shipping it, rather than folding it into routine dependency maintenance.

<details>
<summary>Original finding (pre-fix), preserved for reference</summary>

`npm audit` reports 13 vulnerabilities (8 high, 5 moderate):

- **`better-auth` 1.6.19`** (direct dependency) — [GHSA-qq9h-g4jm-xgf3](https://github.com/advisories/GHSA-qq9h-g4jm-xgf3), account takeover via pre-account hijacking on magic-link/email-OTP sign-in, fixed in ≥1.6.22. This app doesn't currently enable the magic-link or email-OTP plugins, so the specific exploit path isn't reachable today — but it's one config change away, and there's no reason to stay on a version with a published high-severity CVE in the same package. **Upgrade.**
- **Next.js** — multiple advisories in the installed range: SSRF in Server Actions/rewrites, DoS via Server Actions and SVG image optimization, response cache confusion, unauthenticated disclosure of internal Server Function endpoints.
- **`postcss` ≤8.5.22`** (transitive, via `next`) — XSS via unescaped `</style>` in stringify output, plus arbitrary file read via `sourceMappingURL`.
- **`sharp` <0.35.0`** — inherited `libvips` CVEs (2026-33327/33328/35590/35591).
- **`valibot`**, **`@hono/node-server`**, **`brace-expansion`** — moderate, transitive via Prisma's dev tooling.

**Recommendation:** Run `npm audit fix` (most have a fix available per the audit output) and bump `better-auth` past 1.6.22 explicitly; re-run `npm audit` after to confirm the Next.js line also lands on a patched minor.

</details>

## 8. Medium — No security headers

**Where:** `next.config.js`, `middleware.ts`. Live check:
```
$ curl -i http://192.168.1.144:3000/login
HTTP/1.1 200 OK
X-Powered-By: Next.js
ETag: ...
Content-Type: text/html; charset=utf-8
```
No `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, or `Strict-Transport-Security`. The app can be framed by any other site (clickjacking) and has no CSP as a second line of defense if an XSS vector is ever introduced.

**Recommendation:** Add a `headers()` block in `next.config.js` (or set headers in `middleware.ts`) for at least `X-Frame-Options: DENY`/`frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a baseline CSP. Add HSTS once TLS termination is confirmed in front of the app (the current deployment is plain HTTP on a LAN IP).

## 9. Medium — CSV export: formula/injection risk and broken quote escaping

**Where:** `src/components/dashboard/ExportButton.jsx`:
```js
...rows.map(row => row.map(cell => `"${cell}"`).join(','))
```
Two problems in the same line:
1. No escaping of embedded double quotes (`"` inside a field breaks the CSV structure rather than being doubled to `""`).
2. No neutralization of leading `=`, `+`, `-`, or `@` characters. Several exported fields (`site`, `alert`, `alert_resolution`, `wip_number`) originate from free-text/claim data rather than fixed enums, so a value like `=HYPERLINK("http://evil/","x")` or a DDE-style formula in one of those fields would execute as a formula the moment a user opens the exported CSV in Excel/Sheets — classic CSV/formula injection.

**Recommendation:** Prefix any cell whose first character is `= + - @` with a `'` (or a space) before quoting, and double any embedded `"` (standard RFC 4180 escaping) instead of the current naive wrap.

## 10. Low — Auth rate limiting is not shared across replicas

**Live proof:** 8 rapid bad-password attempts against `/api/auth/sign-in/email` for the same account returned `401, 401, 401, 429, 429, 429, 429, 429` — Better Auth's default rate limiter is active and working on this single instance.

However, `k8s/deployment.yaml` runs `replicas: 2` with no shared rate-limit store (e.g. Redis) configured for Better Auth. Since the default limiter is in-memory per process, a client can roughly double its effective attempt budget by getting load-balanced across both pods.

**Recommendation:** If/when this app scales past one replica in production, configure Better Auth's rate limiter with a shared backing store, or front it with an infrastructure-level rate limit (ingress/WAF) that isn't per-pod.

## 11. Informational — Framework fingerprinting

`X-Powered-By: Next.js` is sent on every response (default Next.js behavior; not disabled via `poweredByHeader: false` in `next.config.js`). Minor; mostly useful to an attacker for targeting known Next.js CVEs (see Finding 7).

---

## Positive controls observed

- **Secrets hygiene:** `.env` and `k8s/secret.yaml` both carry real credentials but are correctly listed in `.gitignore`, and `git log --all -- .env k8s/secret.yaml` shows neither was ever committed — no secret leaked into git history.
- **Admin API authorization:** The custom-intercepted endpoints in `src/pages/api/auth/[...all].ts` (`admin/list-user-providers`, `admin/set-user-password`) correctly check for an active session and `role === "admin"` before acting; live test confirmed `admin/list-user-providers` returns `401` with no session. Better Auth's built-in `admin` plugin endpoints (`list-users`, `create-user`, `update-user`, `remove-user`) are gated the same way by the library's own role-based permission check (`has-permission.mjs`), and the app correctly keeps the `role` field in sync with `customRole` (`Owner`/`Group Manager` → `role: "admin"`, everyone else → `role: "user"`) wherever a user's role is set (`authClient.js`, `UsersTab.jsx`).
- **Password hash separation:** Credential hashes live only in the `account` table (Prisma/`better-auth`), never in the `user` table returned by `admin/list-users` — no hash leakage via that listing endpoint.
- **SSO password-reset guard:** `admin/set-user-password` correctly refuses to set a password for accounts that only have an SSO (`microsoft`) provider and no `credential` account, preventing creation of a shadow password login for SSO-only users.
- **`getServerSideProps` + middleware:** `middleware.ts` correctly redirects unauthenticated requests to `/login` for all non-public paths, and `ClaimForm.jsx` additionally checks the session server-side in `getServerSideProps`.
- **CORS on the data API happens not to leak to browsers today:** the data API returns no `Access-Control-Allow-Origin` header, so a malicious *webpage* can't read its responses cross-origin via `fetch`/`XHR` even though it has no auth — the exposure (Finding 1) is exploitable by anything with direct network access (curl, another host on the LAN/VPN, another compromised service), not by a driveby webpage in a victim's browser. This does not mitigate the underlying issue.

---

## Suggested remediation order

1. ~~Put real authentication on the data API (Finding 1)~~ — **done, pass 1.** Row-level authorization (site/brand/role scoping enforced server-side, not just in React) is the natural pass 2 for this same finding.
2. ~~Fix signup verification (Finding 2) and the invite default password (Finding 3)~~ — **done.**
3. Wire up real password-reset email delivery (Finding 4) — also needed to properly close the `requireEmailVerification` gap noted in Finding 2's fix.
4. ~~Patch dependencies (Finding 7)~~ — **done** for everything except the Next.js 15→16 major bump, tracked separately.
5. Add security headers (Finding 8) and fix CSV export escaping (Finding 9) — low effort, meaningful defense-in-depth.
6. Decide whether Microsoft SSO will actually be turned on; if yes, fix the tenant restriction before flipping the flag (Finding 6).

## Remediation log

- **2026-08-11 — Finding 1, pass 1:** Added `src/pages/api/data/[...path].ts` (session-checked proxy) in this repo and a shared-secret check in `warrantyRepairData/src/middleware.ts`. `databaseClient.js` now calls `/api/data` instead of `NEXT_PUBLIC_API_URL`. New env vars `DATA_API_URL`/`DATA_API_KEY` (server-only) replace the old client-exposed `NEXT_PUBLIC_API_URL` across `.env`, `docker-compose.yaml`, `Dockerfile`, `k8s/*`, and `.github/workflows/deploy.yml`. Verified live via curl and in-browser (network log shows every collection loading through `/api/data/...`, direct `:5001` access now returns `401`). Row-level authorization deliberately deferred — see Finding 1's "what this pass did NOT fix."
- **2026-08-11 — Findings 2 & 3:** Self-signup now only works while the user table is empty (`src/lib/auth.ts`). Invite now generates a real random password, sets `mustChangePassword: true`, and `Layout.jsx` actually enforces it with a non-dismissable forced-change dialog blocking the app. Found and fixed a pre-existing bug in the same code path: `/admin/create-user`'s extra fields need to be nested under `data`, not top-level — role/site/brand assignments on invite were silently no-ops before this fix. Verified live end-to-end (invite → temp password → forced dialog → change → unblocked → old password rejected, new one works).
- **2026-08-11 — Finding 7:** `npm audit fix` (no `--force`) took 13 vulnerabilities down to 3 — `better-auth` → `1.6.26`, `next` → `15.5.23` (a security backport that already fixes every direct Next.js CVE originally listed), plus `postcss`/`nanoid`/`js-yaml`/`valibot`/`hono` transitively. No `package.json` changes needed — everything resolved within existing semver ranges. Remaining 3 (nested `postcss`/`sharp` inside Next's own tree) require a Next 15→16 major bump; decided with the user to defer that as its own dedicated upgrade rather than force it here — low practical exposure (no `next/image` usage, `postcss` issues are build-time-oriented) versus real risk of breaking this app's custom middleware/standalone build. Verified live post-upgrade: production Docker build succeeds, login/signup/data-proxy/data-API auth all still behave correctly, and a real (non-test) user's password still validates against its existing hash.
