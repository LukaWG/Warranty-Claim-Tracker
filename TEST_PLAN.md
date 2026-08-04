# Warranty Claims App — Test Plan

A step-by-step manual test plan for a human tester or an AI agent driving a browser. There is no automated test suite in this repo, so this document is the primary QA artifact.

## How to use this document

- Work through sections in order; later sections assume fixtures from earlier ones exist (test accounts, at least one site/brand, a few claims).
- Each test case has **Preconditions**, numbered **Steps**, an **Expected result**, and a **Pass/Fail** checkbox. Record actual behavior in the notes line whenever it diverges from expected.
- Cases marked **⚠ Flagged issue** were identified from a code-review pass, not from running the app. Treat the note as "what the code currently appears to do" — confirm it by actually exercising the steps, then record whether it reproduces.
- "Role" refers to `custom_role`: `Location`, `Administrator`, `Group Manager`, `Owner`.

## Environment prerequisites

- [ ] App running (`npm run dev`), reachable in a browser.
- [ ] `NEXT_PUBLIC_API_URL` points at a running instance of the external app-data API (claims/sites/brands/messages/etc. will silently look empty or every read/write will fail if not).
- [ ] Auth Postgres DB migrated (`npx prisma generate && npx prisma migrate dev` or `db push`), empty of users if you want to test the first-user-Owner-promotion case.
- [ ] Microsoft SSO configured (optional — only needed for SSO-specific cases; note if skipped).

## Test accounts / fixtures needed

- [ ] One user per role: `Location`, `Administrator`, `Group Manager`, `Owner` (Owner should be the first-ever signup so it's auto-promoted — see A1).
- [ ] One SSO (Microsoft) account, if SSO is configured.
- [ ] At least 2 Sites, 2 Brands (with different manufacturer-deadline thresholds if known), 1 Alert, 1 AlertResolution, configured via `/Configuration`.
- [ ] A handful of `WarrantyClaim`s spanning different `status` values (`in_progress`, `awaiting_review`, `awaiting_approval`, `approved`, `completed`, `rejected`, `credit_rejected`, `claimed_info_requested`, `claimed_info_received`, `withdrawn`) and `approval_status` values (`pending_approval`, `approved`, `rejected`, `credited`).

---

## Section A — Auth & Session

### A1. First-ever signup auto-promotes to Owner/admin
- **Preconditions:** Auth DB has zero users.
- **Steps:**
  1. Go to `/signup`, register a new account.
  2. Log in as that account and check the user menu / role shown in the UI (or query the DB `user` table).
- **Expected result:** The account has `customRole: "Owner"` and platform `role: "admin"`.
- [ ] Pass / [ ] Fail — notes:

### A2. Duplicate email signup
- **Steps:** Sign up with an email that already has an account.
- **Expected result:** A clear, non-crashing error is shown (Better Auth's native error message is displayed raw — confirm it's intelligible to an end user, not a stack trace).
- [ ] Pass / [ ] Fail — notes:

### A3. Signup page — Microsoft SSO button ⚠ Flagged issue
- **Steps:** On `/signup`, click "Sign up with Microsoft".
- **Expected result:** Redirects into the Microsoft OAuth flow.
- **⚠ Current likely behavior:** `signup.tsx`'s `handleMicrosoftLogin` calls `signIn.social(...)`, but `signIn` is never imported (only `signUp`/`useSession` are) — clicking the button likely throws a `ReferenceError` and does nothing visible, or crashes the page.
- [ ] Pass / [ ] Fail — notes:

### A4. Login — valid and invalid credentials
- **Steps:** 1) Log in with valid credentials. 2) Log in with a wrong password. 3) Log in with a non-existent email.
- **Expected result:** Valid login succeeds and lands on the main page. Both invalid cases show the same generic "Invalid email or password" message (no user enumeration via error text).
- [ ] Pass / [ ] Fail — notes:

### A5. Logout
- **Steps:** While logged in, sign out from the user menu.
- **Expected result:** Redirected to `/login`; protected pages are no longer reachable without logging in again.
- [ ] Pass / [ ] Fail — notes:

### A6. Forgot password — no email enumeration
- **Steps:** 1) Submit "forgot password" with a real account's email. 2) Submit with an email that doesn't exist.
- **Expected result:** Both show the identical success message. Since there's no real email delivery configured, find the reset link/token in the server console log.
- [ ] Pass / [ ] Fail — notes:

### A7. Reset password — valid token
- **Steps:** Using a fresh token from A6, go to `/reset-password?token=...`, set a new password (≥8 chars, confirm match), submit, then log in with the new password.
- **Expected result:** Password updates successfully; old password no longer works.
- [ ] Pass / [ ] Fail — notes:

### A8. Reset password — expired/invalid/reused token
- **Steps:** 1) Reuse a token already consumed in A7. 2) Use a garbage token string.
- **Expected result:** A message indicating the link "may have expired" (or similar) — not a crash, not silent success.
- [ ] Pass / [ ] Fail — notes:

### A9. Reset password — client-side validation
- **Steps:** Try submitting with password &lt;8 characters, and with mismatched confirm field.
- **Expected result:** Blocked client-side with a clear message before any request is sent.
- [ ] Pass / [ ] Fail — notes:

### A10. Voluntary change-password modal
- **Preconditions:** Logged in with a credentials (non-SSO) account.
- **Steps:** Open user menu → "Change Password" → enter current + new password (≥8 chars, matching confirm) → submit.
- **Expected result:** Password changes; can log in with the new password afterward.
- [ ] Pass / [ ] Fail — notes:

### A11. Change-password menu item hidden for SSO users
- **Preconditions:** Logged in as the SSO (Microsoft) account.
- **Steps:** Open the user menu.
- **Expected result:** No "Change Password" option is shown (or shown only after account-list resolves — watch for a brief flash of the option before it's hidden).
- [ ] Pass / [ ] Fail — notes:

### A12. Admin-forced password reset — `mustChangePassword` enforcement ⚠ Flagged issue
- **Preconditions:** Owner/Group Manager account, plus a target user.
- **Steps:** 1) As Owner/Group Manager, go to `/Configuration` and reset the target user's password. 2) Log in as the target user with the new password.
- **Expected result (intended):** The target user should be forced to change their password before using the app (`mustChangePassword` flag set to true).
- **⚠ Current likely behavior:** `mustChangePassword` is set on the user record, but nothing in `src/Layout.jsx` actually checks it or shows a forced-change dialog — the user can likely log in and use the app indefinitely without ever being prompted.
- [ ] Pass / [ ] Fail — notes:

### A13. Unauthenticated deep link — middleware vs SSR redirect divergence ⚠ Flagged issue
- **Steps:** 1) Log out. Directly navigate to a protected file-based route, e.g. `/Dashboard` or `/Approvals`. 2) Log in.
- **Expected result (intended):** After logging in, you land back on `/Dashboard`/`/Approvals` (the page you originally requested).
- **⚠ Current likely behavior:** `middleware.ts` appends `?callbackUrl=<path>` when redirecting to `/login`, but the page's own `getServerSideProps` session check (when a stale/invalid cookie is present) redirects to plain `/login` with no `callbackUrl` — you may be dropped back on the main page (`ClaimForm`) instead.
- [ ] Pass / [ ] Fail — notes:

### A14. Authenticated user hitting `/login` or `/signup`
- **Steps:** While logged in, navigate to `/login`.
- **Expected result:** Eventually redirected to `/` (home). Note whether there's a visible flash of the login form first (client-side `useEffect` redirect, not middleware-level for this direction).
- [ ] Pass / [ ] Fail — notes:

---

## Section B — Roles & Permissions

### B1. Nav visibility per role
- **Steps:** Log in as each of `Location`, `Administrator`, `Group Manager`, `Owner` and inspect the nav.
- **Expected result:** `ClaimForm`/`Dashboard`/`Messages` visible to all four; `Approvals` and `Configuration` visible only to `Group Manager`/`Owner`.
- [ ] Pass / [ ] Fail — notes:

### B2. Direct-URL access bypassing nav — Configuration
- **Preconditions:** Logged in as `Location` or `Administrator`.
- **Steps:** Navigate directly to `/Configuration`.
- **Expected result:** Redirected away (server-side gated via `getServerSideProps`, restricted to `Owner`/`Group Manager`).
- [ ] Pass / [ ] Fail — notes:

### B3. Direct-URL access bypassing nav — Approvals ⚠ Flagged issue
- **Preconditions:** Logged in as `Location` or `Administrator`.
- **Steps:** Navigate directly to `/Approvals`, attempt to approve/reject a claim.
- **Expected result (intended):** Same as Configuration — blocked for these roles.
- **⚠ Current likely behavior:** `Approvals.tsx` only checks that a session exists server-side, with no `custom_role` check — a `Location`/`Administrator` user navigating there directly may be able to view and act on approvals despite having no nav link to it.
- [ ] Pass / [ ] Fail — notes:

### B4. Dashboard role-typo cases ⚠ Flagged issue
- **Preconditions:** Logged in as `Administrator` and separately as `Location`.
- **Steps:** 1) As `Administrator`, check whether brand restrictions apply on the Dashboard. 2) As `Location`, check whether "Brand Stats" is hidden.
- **Expected result (intended):** Admin's claims are brand-restricted; Location role doesn't see Brand Stats.
- **⚠ Current likely behavior:** `Dashboard.jsx` reads `currentUser?.custome_role` (misspelled, line ~77) and `currentUser?.customRole` (camelCase, line ~505) instead of `custom_role` — both conditionals likely never match, so these two role-based behaviors may be dead code and never trigger.
- [ ] Pass / [ ] Fail — notes:

### B5. Client-side-only delete/edit gating on claims ⚠ Flagged issue
- **Preconditions:** Logged in as `Location`.
- **Steps:** 1) Confirm the UI hides/disables delete and edit for a claim. 2) If feasible, attempt the equivalent API call directly (e.g. via browser devtools/curl against `NEXT_PUBLIC_API_URL`) as this user.
- **Expected result (intended):** Server rejects unauthorized delete/edit regardless of UI state.
- **⚠ Current likely behavior:** The delete/edit restriction in `Dashboard.jsx` is UI-only (`userRole !== 'Group Manager' && userRole !== 'Owner'`); there's no evidence of server-side enforcement — a direct API call may succeed.
- [ ] Pass / [ ] Fail — notes:

### B6. Admin API endpoints as non-admin
- **Steps:** While logged in as a non-admin (platform `role !== "admin"`), attempt a direct request to `/api/auth/admin/list-users`, `/api/auth/admin/set-user-password`, `/api/auth/admin/list-user-providers`.
- **Expected result:** 403 (session exists but not admin). Also test fully logged out → expect 401.
- [ ] Pass / [ ] Fail — notes:

### B7. Role downgrade mid-session
- **Steps:** 1) As Owner, log in as an `Owner`-role user in a second browser/incognito session. 2) In the first session (as another Owner/Group Manager), downgrade that user's `custom_role` to `Location`. 3) In the second session, without refreshing, try an admin-only action.
- **Expected result:** Clarify intended behavior with the team, but at minimum confirm whether the action succeeds or fails (stale session cookie vs. immediate revocation) and record which it is.
- [ ] Pass / [ ] Fail — notes:

### B8. Role change side effect on platform role
- **Steps:** In `/Configuration`, change a user's `custom_role` between `Owner`/`Group Manager` and `Location`/`Administrator` in both directions.
- **Expected result:** Platform `role` flips automatically (`admin` for Owner/Group Manager, `user` otherwise) — confirm via the admin user list or DB.
- [ ] Pass / [ ] Fail — notes:

---

## Section C — Routing & Navigation

### C1. All PAGES entries reachable
- **Steps:** Visit `/ClaimForm`, `/Dashboard`, `/Home`, `/Reporting`, `/Messages`, `/Configuration`, `/Approvals` directly by URL.
- **Expected result:** All render their respective page. `Home` and `Reporting` have no nav link but should still be directly reachable.
- [ ] Pass / [ ] Fail — notes:

### C2. Case-insensitive route matching
- **Steps:** Visit `/dashboard`, `/DASHBOARD`, `/DashBoard`.
- **Expected result:** All resolve to the Dashboard page.
- [ ] Pass / [ ] Fail — notes:

### C3. Unknown page → PageNotFound
- **Steps:** Visit `/Foobar`.
- **Expected result:** A "page not found" screen with a "Go Home" button that returns you to the main page (`ClaimForm`).
- [ ] Pass / [ ] Fail — notes:

### C4. Deep/nested unknown path segments
- **Steps:** Visit `/Dashboard/extra/segments`.
- **Expected result:** Renders the Dashboard page (only the first path segment is used to match); confirm no crash and no unexpected 404 despite the odd-looking URL.
- [ ] Pass / [ ] Fail — notes:

### C5. Trailing slash
- **Steps:** Visit `/Dashboard/`.
- **Expected result:** Same as `/Dashboard` — no different behavior.
- [ ] Pass / [ ] Fail — notes:

### C6. Browser back/forward through routes
- **Steps:** Navigate ClaimForm → Dashboard → Messages via nav, then use browser Back twice, then Forward twice.
- **Expected result:** Correct page content and nav highlight at each step, no stale content flash.
- [ ] Pass / [ ] Fail — notes:

### C7. Refresh on a deep route
- **Steps:** Navigate to `/Approvals`, then hard-refresh the browser.
- **Expected result:** Page re-renders correctly via SSR, no flash of the wrong page, and role-gating still applies if the session is invalid.
- [ ] Pass / [ ] Fail — notes:

### C8. Nav flash before user loads
- **Steps:** Hard-refresh any page and watch the nav bar closely during the first moment of load.
- **Expected result (intended):** Only role-appropriate nav items should ever be visible.
- **⚠ Current likely behavior:** Before `currentUser` finishes loading, `Layout.jsx` shows **all** nav items (falsy-user fallback shows everything) — briefly visible even to roles that shouldn't see Approvals/Configuration links.
- [ ] Pass / [ ] Fail — notes:

---

## Section D — Claim Creation (ClaimForm)

### D1. Happy path submission
- **Steps:** Fill in WIP Number, Location, Brand, Expected Hours, Clocking Date (≤ today) and submit.
- **Expected result:** Claim is created, a success toast appears, and the claim shows up on the Dashboard.
- [ ] Pass / [ ] Fail — notes:

### D2. WIP number strips non-digits
- **Steps:** Type letters/symbols mixed with digits into WIP Number (e.g. `AB-123`).
- **Expected result:** Non-digit characters are stripped as you type, leaving only `123`.
- [ ] Pass / [ ] Fail — notes:

### D3. Missing required fields
- **Steps:** Attempt submit with Brand empty, then with Clocking Date empty.
- **Expected result:** Blocked with a clear message (these two are explicitly checked in `handleSubmit`).
- [ ] Pass / [ ] Fail — notes:

### D4. Missing WIP/site/hours — weaker validation ⚠ Flagged issue
- **Steps:** Attempt to submit with Expected Hours cleared, or WIP Number cleared, bypassing the native `required` attribute if possible (e.g. via devtools).
- **Expected result (intended):** Server/UI should reject the claim.
- **⚠ Current likely behavior:** Only native HTML `required` guards these fields — `handleSubmit` doesn't re-validate them, so a bypass may successfully create an invalid claim.
- [ ] Pass / [ ] Fail — notes:

### D5. Expected Hours — negative / non-numeric
- **Steps:** Enter `-5` and `abc` into Expected Hours.
- **Expected result:** Negative values rejected (field has `min=0`); non-numeric input rejected by the number input itself.
- [ ] Pass / [ ] Fail — notes:

### D6. Clocking Date after Scanned Date
- **Steps:** Try to pick a Clocking Date later than the (read-only, defaults-to-now) Scanned Date.
- **Expected result:** Date picker prevents selecting a date after Scanned Date.
- [ ] Pass / [ ] Fail — notes:

### D7. Manufacturer deadline color coding
- **Steps:** Create claims for brands/dates that should land in each threshold (red/amber/green).
- **Expected result:** Deadline indicator color matches the expected threshold for each case.
- [ ] Pass / [ ] Fail — notes:

### D8. Safety recall / service campaign
- **Steps:** Check "Safety Recall / Service Campaign", enter a reference, submit.
- **Expected result:** Claim is created and a `ClaimNote` containing the reference is attached and visible in the claim's notes.
- [ ] Pass / [ ] Fail — notes:

### D9. Partial failure mid-submit ⚠ Flagged issue
- **Preconditions:** Ability to simulate a failure between the claim-create call and the follow-up audit/note calls (e.g. throttle/kill network right after the first request completes, or use devtools to block the second request).
- **Steps:** Submit a claim with the campaign checkbox checked, and interrupt network connectivity after the `WarrantyClaim` create succeeds but before the `ClaimAudit`/`ClaimNote` create finishes.
- **Expected result (intended):** Either the whole operation rolls back, or the user is clearly told the claim exists but the note/audit failed.
- **⚠ Current likely behavior:** The three calls (claim → audit → note) are sequential with no rollback; a mid-sequence failure likely leaves a real claim with a missing audit entry/note and just shows a generic error toast.
- [ ] Pass / [ ] Fail — notes:

### D10. Rapid double-submit
- **Steps:** Click Submit twice in quick succession.
- **Expected result:** Only one claim is created (submit button should disable while pending).
- [ ] Pass / [ ] Fail — notes:

---

## Section E — Claim Lifecycle / Dashboard

### E1. Status transitions per the enum
- **Steps:** Walk a claim through: `in_progress` → `awaiting_review` → `awaiting_approval` → `approved` → `completed`. Also test → `rejected`, → `credit_rejected`, → `claimed_info_requested` → `claimed_info_received`.
- **Expected result:** Each transition available at the appropriate point in the UI and reflected correctly on the Dashboard/Approvals views.
- [ ] Pass / [ ] Fail — notes:

### E2. Alert/resolution forced status side effects
- **Steps:** 1) Set a claim's `alert_resolution` to "Non-actionable" — check status. 2) Set `alert` to "Info - Post Claim" — check status.
- **Expected result:** Status auto-updates to `completed` and `claimed_info_requested` respectively.
- [ ] Pass / [ ] Fail — notes:

### E3. Withdraw / undo withdrawal
- **Steps:** Withdraw an `in_progress` claim, confirm status becomes `withdrawn`, then undo.
- **Expected result:** Status returns to `in_progress` after undo.
- [ ] Pass / [ ] Fail — notes:

### E4. Credit flow — note required above threshold
- **Steps:** Open Credit Options on a claim, enter a credit amount ≥ £100 without a credit note, try to apply.
- **Expected result:** Apply button stays disabled until a credit note is entered; approval_status forces to `pending_approval` once a credit ≥ £100 is set.
- [ ] Pass / [ ] Fail — notes:

### E5. Credit flow — apply enabled only in valid states
- **Steps:** Attempt "Apply Credit" while `approval_status` is `rejected` or `credited`.
- **Expected result:** Disabled/unavailable unless `approval_status` is `approved` or `pending_approval`.
- [ ] Pass / [ ] Fail — notes:

### E6. Photo/file upload is a non-functional stub ⚠ Flagged issue
- **Steps:** In a Claim Note or the withdrawal note, attach/paste an image, save the note, then reload the page and reopen the claim.
- **Expected result (intended):** The image persists and is visible to other users.
- **⚠ Current likely behavior:** File/image selection only produces a local (ephemeral) preview — `ClaimNotesModal.jsx` and `ComposeMessageModal.jsx` have TODO-marked stubs where the upload should happen; after reload, the image is gone / was never actually uploaded.
- [ ] Pass / [ ] Fail — notes:

### E7. Concurrent edits by two users
- **Steps:** Open the same claim in two sessions (different users/roles with edit rights), change different fields in each, save both.
- **Expected result:** Clarify intended conflict handling; at minimum confirm whether the second save silently overwrites the first (last-write-wins) or something breaks.
- [ ] Pass / [ ] Fail — notes:

---

## Section F — Approvals

### F1. Approve/reject happy path
- **Steps:** As Owner/Group Manager, open `/Approvals`, approve a pending claim, then reject a different one.
- **Expected result:** Status updates correctly on each; both actions succeed with a success toast.
- [ ] Pass / [ ] Fail — notes:

### F2. Approved/rejected claim leaves the pending list ⚠ Flagged issue
- **Steps:** Approve or reject a credit request from the Approvals list, then observe whether it remains visible.
- **Expected result (intended):** The claim disappears from the "pending approvals" list immediately after action.
- **⚠ Current likely behavior:** A TODO comment in `Approvals.tsx` notes the claim stays on the page after approving/rejecting a credit request — reproduce and confirm.
- [ ] Pass / [ ] Fail — notes:

### F3. No server-side role check on Approvals
- **Steps:** Same as B3 — covered there; cross-reference.
- [ ] Pass / [ ] Fail — notes:

---

## Section G — Configuration (Sites / Brands / Alerts / Users)

### G1. CRUD — Sites, Brands, Alerts, AlertResolutions
- **Steps:** For each entity type, create, edit, and delete a record.
- **Expected result:** Each operation succeeds and the list refreshes to reflect the change.
- [ ] Pass / [ ] Fail — notes:

### G2. Delete a Site/Brand still referenced by a claim ⚠ Flagged issue
- **Steps:** Delete a Site or Brand that at least one existing claim references, then view that claim on the Dashboard, in Approvals, and in a CSV export (see I3).
- **Expected result (intended):** Either deletion is blocked while in use, or references degrade gracefully (e.g. "Unknown Brand").
- **⚠ Current likely behavior:** No confirmation dialog and no in-use check on delete; the claim keeps the now-orphaned id, and name lookups elsewhere may render blank — the CSV export in particular is expected to crash (see I3).
- [ ] Pass / [ ] Fail — notes:

### G3. Invite a new user ⚠ Flagged issue
- **Steps:** As Owner/Group Manager, invite a new user by email in `/Configuration`. Check the "Pending Invites" list. Then, before the invitee ever logs in, try logging in as that new account using the password `password`.
- **Expected result (intended):** The invite should be pending/inert until the invitee sets their own password (e.g. via a real invite-acceptance flow), and "Pending Invites" should reflect a real unaccepted state.
- **⚠ Current likely behavior:** `authUsers.invite()` creates a fully active account immediately with hardcoded password `"password"` and never actually writes a `PendingUserInvite` row — the "Pending Invites" list may show nothing, or stale/unrelated data, while the account itself is already usable by anyone who guesses the shared default password before the real invitee logs in.
- [ ] Pass / [ ] Fail — notes:

### G4. Admin password reset rejected for SSO-only users
- **Steps:** As Owner/Group Manager, attempt to reset the password of a user who only has an SSO (Microsoft) login, no credential/password account.
- **Expected result:** A specific error is shown (e.g. "signs in with SSO and has no password") — no stray credential account is created.
- [ ] Pass / [ ] Fail — notes:

### G5. Delete a user
- **Steps:** Delete a non-Owner user from `/Configuration`.
- **Expected result:** User removed from the list and can no longer log in.
- [ ] Pass / [ ] Fail — notes:

---

## Section H — Messages

### H1. Compose and reply
- **Steps:** Compose a new message tied to a claim, send it; reply from a different user's session.
- **Expected result:** Both messages appear in the thread for both users.
- [ ] Pass / [ ] Fail — notes:

### H2. Unread badge polling lag (expected, not a bug)
- **Steps:** Send a message from user A; watch user B's unread badge without refreshing.
- **Expected result:** Badge updates within ~30 seconds (polling interval) — this delay is expected behavior, not a defect.
- [ ] Pass / [ ] Fail — notes:

### H3. Mark-as-read reader name ⚠ Flagged issue
- **Steps:** Open a message thread with unread messages as a given user, then (if visible in the UI, e.g. a "read by" list, or via API/DB inspection) check the `reader_name` recorded for the read receipt.
- **Expected result (intended):** `reader_name` shows the reader's actual first + last name.
- **⚠ Current likely behavior:** The mark-read mutation builds `reader_name` from `currentUser.firstName + ' ' + currentUser.lastName` (camelCase), while the rest of the app uses snake_case (`first_name`/`last_name`) — likely produces the literal string `"undefined undefined"`.
- [ ] Pass / [ ] Fail — notes:

### H4. Image attachment on a message ⚠ Flagged issue
- **Steps:** Compose a message with an image attached, send it, reload, reopen the thread.
- **Expected result (intended):** Image persists and is visible to the recipient.
- **⚠ Current likely behavior:** Same stub issue as E6 — `ComposeMessageModal.jsx` sends `image_urls: []` regardless of what was attached; the image was never actually uploaded.
- [ ] Pass / [ ] Fail — notes:

### H5. Target site filtering
- **Steps:** As a `Location` user tied to Site A, confirm you only see messages targeted at Site A (not messages for other sites).
- **Expected result:** Messages are correctly scoped by `target_site`.
- [ ] Pass / [ ] Fail — notes:

---

## Section I — Reporting & Export

### I1. Stat tiles and totals
- **Steps:** Compare Reporting page totals (£ parts/labour/sub-con/total, counts by status) against a manual tally of the underlying claims.
- **Expected result:** Totals match, and claims with `approval_status: pending_approval` are excluded from £ totals as intended.
- [ ] Pass / [ ] Fail — notes:

### I2. Lag-time charts
- **Steps:** Check the lag-time section against known date fields on a few claims.
- **Expected result:** Chart values reflect the correct date deltas.
- [ ] Pass / [ ] Fail — notes:

### I3. CSV export with a deleted brand ⚠ Flagged issue
- **Preconditions:** A claim whose `brand` id no longer exists in the Brands list (see G2), or a claim with `brand` unset.
- **Steps:** Trigger the CSV export from Reporting/Dashboard.
- **Expected result (intended):** Export completes, showing something reasonable (e.g. blank or "Unknown") for the missing brand.
- **⚠ Current likely behavior:** `ExportButton.jsx` does `brands.find(b => b.id === claim.brand).name` with no null-check — this claim is expected to throw a `TypeError` and crash the entire export for every claim, not just the affected one.
- [ ] Pass / [ ] Fail — notes:

### I4. CSV export with special characters ⚠ Flagged issue
- **Preconditions:** A claim with a `"` (double quote) or comma inside a free-text field (alert, resolution, created_by, notes).
- **Steps:** Export CSV, then open it in a spreadsheet application.
- **Expected result (intended):** The field is correctly escaped and doesn't corrupt neighboring columns.
- **⚠ Current likely behavior:** Cells are wrapped in quotes but internal `"` characters aren't escaped (no doubling) — expect column misalignment or corrupted rows when opened in Excel/Sheets.
- [ ] Pass / [ ] Fail — notes:

### I5. Export with zero claims
- **Steps:** Filter to a scope with no claims, then export.
- **Expected result:** A valid, empty (headers-only) CSV, no crash.
- [ ] Pass / [ ] Fail — notes:

---

## Section J — Cross-Cutting Edge Cases

### J1. API unreachable — reads render as empty, not an error ⚠ Flagged issue
- **Steps:** Stop/block the external app-data API, then load Dashboard, Approvals, Messages, Reporting.
- **Expected result (intended):** A visible error state distinguishing "failed to load" from "genuinely empty."
- **⚠ Current likely behavior:** None of these pages show error UI for failed reads — `useQuery` results default to an empty array, so a total API outage looks identical to "no claims/messages yet."
- [ ] Pass / [ ] Fail — notes:

### J2. API unreachable — writes
- **Steps:** With the API blocked, submit a new claim or send a message.
- **Expected result:** A clear error toast, not a silent failure or crash.
- [ ] Pass / [ ] Fail — notes:

### J3. Slow API / 15s timeout
- **Steps:** Simulate a very slow API response (throttling) during a claim submission.
- **Expected result:** After ~15s, a "request timed out" error is shown rather than hanging indefinitely.
- [ ] Pass / [ ] Fail — notes:

### J4. Large dataset behavior
- **Steps:** With a few hundred+ claims/messages in the system, load Dashboard/Reporting/Messages and observe load time and responsiveness during the 30s poll refresh.
- **Expected result:** No excessive load times, memory blowups, or UI freezes (data volume is fetched unpaginated, so this is a real risk to check).
- [ ] Pass / [ ] Fail — notes:

### J5. Empty-list zero states
- **Steps:** With no claims/messages/sites/brands/alerts, visit each relevant page.
- **Expected result:** A sensible empty-state message on each, not a blank screen or crash.
- [ ] Pass / [ ] Fail — notes:

### J6. Special characters and long strings in free-text inputs
- **Steps:** Enter emoji, very long strings (1000+ chars), and HTML-like text (`<script>`) into notes, messages, alert/resolution free text.
- **Expected result:** Renders safely (no script execution / XSS), no layout overflow breaking the page, no truncation that loses data unexpectedly.
- [ ] Pass / [ ] Fail — notes:

### J7. No global error boundary ⚠ Flagged issue
- **Steps:** Trigger any of the crash-prone flows above (e.g. I3's CSV export) inside the app rather than in isolation, and observe what the user actually sees.
- **Expected result (intended):** A friendly in-app error message.
- **⚠ Current likely behavior:** There's no React error boundary anywhere in the app (`_app.jsx` or elsewhere) — an unhandled render error shows Next.js's generic error screen instead of a branded/friendly message.
- [ ] Pass / [ ] Fail — notes:

### J8. Responsive / mobile nav
- **Steps:** Resize the browser below the `lg` breakpoint (or use a mobile device/emulator). Open and close the nav via the mobile header toggle; tap the overlay to close.
- **Expected result:** Sidebar slides in/out correctly, overlay closes it on tap, no layout breakage.
- [ ] Pass / [ ] Fail — notes:

### J9. Browser back/forward and refresh, app-wide
- **Steps:** Navigate through several pages and modals, then use back/forward/refresh repeatedly.
- **Expected result:** No stuck loading states, no duplicated modals, no lost form state causing confusion (data loss on accidental refresh is acceptable to note but shouldn't crash).
- [ ] Pass / [ ] Fail — notes:

---

## Appendix — Known Issues Found During Code Review

Track these separately as they're confirmed. "Status" should be updated to `Confirmed`, `Not a bug`, or `Fixed` as each is verified.

| # | Area | File(s) | Description | Test case | Status |
|---|------|---------|-------------|-----------|--------|
| 1 | Auth | `signup.tsx` | Microsoft SSO button on signup calls `signIn.social` without importing `signIn` — likely throws | A3 | |
| 2 | Auth | `Layout.jsx` | `mustChangePassword` flag set by admin reset is never enforced/checked in the UI | A12 | |
| 3 | Auth | `middleware.ts` vs page `getServerSideProps` | Middleware preserves `callbackUrl` on redirect; SSR page-level redirect for an invalid session does not | A13 | |
| 4 | Roles | `Approvals.tsx` | No server-side `custom_role` check — only requires a session | B3, F3 | |
| 5 | Roles | `Dashboard.jsx` | `custome_role` typo (line ~77) and `customRole` camelCase typo (line ~505) instead of `custom_role` — likely dead-code conditionals | B4 | |
| 6 | Roles | `Dashboard.jsx` | Client-side-only delete/edit role gating, no confirmed server-side enforcement | B5 | |
| 7 | Claims | `ClaimForm.jsx` | Sequential claim → audit → note creation with no rollback on partial failure | D9 | |
| 8 | Claims | `ClaimNotesModal.jsx`, `ComposeMessageModal.jsx` | File/image upload is a stub (`TODO implement file upload`) — never persists, local preview only | E6, H4 | |
| 9 | Approvals | `Approvals.tsx` | TODO: claim stays on the pending list after approve/reject of a credit request | F2 | |
| 10 | Configuration | `Configuration.jsx` | Delete of Site/Brand/Alert/Resolution has no confirmation and no in-use check, orphaning claim references | G2 | |
| 11 | Configuration / Auth | `authClient.js` (`invite`) | Invite creates an immediately-active account with hardcoded password `"password"`; `PendingUserInvite` is never actually created | G3 | |
| 12 | Messages | messages mark-read mutation | `reader_name` built from camelCase `firstName`/`lastName` fields that don't exist on the normalized user, likely yielding `"undefined undefined"` | H3 | |
| 13 | Reporting | `ExportButton.jsx` | `brands.find(...).name` with no null-check — throws if a claim references a deleted/missing brand | I3 | |
| 14 | Reporting | `ExportButton.jsx` | CSV cell quoting doesn't escape internal `"` characters | I4 | |
| 15 | Cross-cutting | Dashboard/Approvals/Messages/Reporting queries | Failed reads silently render as empty lists rather than an error state | J1 | |
| 16 | Cross-cutting | app-wide | No React error boundary — unhandled errors show the generic Next.js error screen | J7 | |
| 17 | Routing | `Layout.jsx` | All nav items shown briefly before `currentUser` resolves, regardless of role | C8 | |
