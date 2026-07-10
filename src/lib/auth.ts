// LOCAL MOCK — auth server is not running on this machine.
// This stub replaces the real Better Auth config (see git history for the
// original) so the app treats every request as an authenticated Owner.
// It covers both consumers of `auth`:
//   - auth.api.getSession()  → getServerSideProps in pages + [...all].ts intercept
//   - auth.handler(Request)  → all /api/auth/* client calls (useSession,
//     signIn/signOut, listAccounts, admin/* endpoints in src/api/authClient.js)
// See CLAUDE.md "Local Dev Caveats" — revert this file for production.

const MOCK_USER = {
  id: "mock-owner-user",
  email: "owner@hendy-group.com",
  emailVerified: true,
  name: "Owner Account",
  image: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  role: "admin",
  banned: false,
  banReason: null,
  banExpires: null,
  firstName: "Owner",
  lastName: "Account",
  customRole: "Owner",
  defaultSite: null,
  defaultBrands: [],
  mustChangePassword: false,
}

const MOCK_SESSION = {
  id: "mock-session-id",
  token: "mock-session-token",
  userId: MOCK_USER.id,
  expiresAt: "2099-01-01T00:00:00.000Z",
  ipAddress: "",
  userAgent: "mock",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const MOCK_ACCOUNT = {
  id: "mock-account-id",
  provider: "credential",
  providerId: "credential",
  accountId: MOCK_USER.id,
  userId: MOCK_USER.id,
  scopes: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export const auth = {
  api: {
    async getSession(_opts?: unknown) {
      return { session: MOCK_SESSION, user: MOCK_USER }
    },
  },

  async handler(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/^\/api\/auth/, "") || "/"

    switch (path) {
      case "/get-session":
        return json({ session: MOCK_SESSION, user: MOCK_USER })

      case "/sign-in/email":
      case "/sign-up/email":
        return json({ redirect: false, token: MOCK_SESSION.token, user: MOCK_USER })

      case "/sign-in/social":
        // No real SSO locally — report success without redirecting anywhere.
        return json({ redirect: false, token: MOCK_SESSION.token, user: MOCK_USER })

      case "/sign-out":
        return json({ success: true })

      case "/list-accounts":
        return json([MOCK_ACCOUNT])

      case "/change-password":
        return json({ token: MOCK_SESSION.token, user: MOCK_USER })

      case "/update-user":
      case "/forget-password":
      case "/reset-password":
        return json({ status: true })

      case "/admin/list-users":
        return json({ users: [MOCK_USER], total: 1 })

      case "/admin/create-user":
        return json({ user: { ...MOCK_USER, id: `mock-user-${crypto.randomUUID()}` } })

      case "/admin/update-user":
        return json({ user: MOCK_USER })

      case "/admin/remove-user":
        return json({ success: true })

      default:
        // Unknown endpoint — succeed quietly so the UI keeps working.
        return json({ status: true })
    }
  },
}
