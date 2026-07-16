import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export const auth = betterAuth({
  baseURL: isDev
    ? {
        allowedHosts: [
          "localhost:*",
          "127.0.0.1:*",
          "192.168.*:*",
          "10.*:*",
          "172.16.*:*",
          "lukas-mbp.local:*",
        ],
        protocol: "http",
      }
    : (process.env.BETTER_AUTH_URL ?? "http://localhost:3000"),
  trustedOrigins: isDev
    ? [
        "http://localhost:*",
        "http://127.0.0.1:*",
        "http://192.168.*:*",
        "http://10.*:*",
        "http://172.16.*:*",
        "http://lukas-mbp.local:*",
      ]
    : [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log(`\n========================================`);
      console.log(`PASSWORD RESET REQUEST`);
      console.log(`User: ${user.email}`);
      console.log(`Reset URL: ${url}`);
      console.log(`Token: ${token}`);
      console.log(`========================================\n`);
    }
  },
  plugins: [
    admin(),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isFirstUser = (await prisma.user.count()) === 0
          if (!isFirstUser) return

          return {
            data: {
              ...user,
              customRole: "Owner",
              role: "admin",
            },
          }
        },
      },
    },
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "placeholder_client_id",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "placeholder_secret",
      tenantId: process.env.MICROSOFT_TENANT_ID || "common",
    }
  },
  user: {
    additionalFields: {
      firstName: { type: "string", required: false, input: true },
      lastName: { type: "string", required: false, input: true },
      customRole: { type: "string", defaultValue: "Location", input: true },
      defaultSite: { type: "string", required: false, input: true },
      defaultBrands: { type: "string[]", defaultValue: [], input: true },
      mustChangePassword: { type: "boolean", defaultValue: false, input: true },
    }
  }
})

// // LOCAL MOCK — auth server is not running on this machine.
// // This stub replaces the real Better Auth config (see git history for the
// // original) so the app treats every request as an authenticated Owner.
// // It covers both consumers of `auth`:
// //   - auth.api.getSession()  → getServerSideProps in pages + [...all].ts intercept
// //   - auth.handler(Request)  → all /api/auth/* client calls (useSession,
// //     signIn/signOut, listAccounts, admin/* endpoints in src/api/authClient.js)
// // See CLAUDE.md "Local Dev Caveats" — revert this file for production.

// const MOCK_USER = {
//   id: "mock-owner-user",
//   email: "owner@hendy-group.com",
//   emailVerified: true,
//   name: "Owner Account",
//   image: null,
//   createdAt: "2026-01-01T00:00:00.000Z",
//   updatedAt: "2026-01-01T00:00:00.000Z",
//   role: "admin",
//   banned: false,
//   banReason: null,
//   banExpires: null,
//   firstName: "Owner",
//   lastName: "Account",
//   customRole: "Owner",
//   defaultSite: null,
//   defaultBrands: [],
//   mustChangePassword: false,
// }

// const MOCK_SESSION = {
//   id: "mock-session-id",
//   token: "mock-session-token",
//   userId: MOCK_USER.id,
//   expiresAt: "2099-01-01T00:00:00.000Z",
//   ipAddress: "",
//   userAgent: "mock",
//   createdAt: "2026-01-01T00:00:00.000Z",
//   updatedAt: "2026-01-01T00:00:00.000Z",
// }

// const MOCK_ACCOUNT = {
//   id: "mock-account-id",
//   provider: "credential",
//   providerId: "credential",
//   accountId: MOCK_USER.id,
//   userId: MOCK_USER.id,
//   scopes: [],
//   createdAt: "2026-01-01T00:00:00.000Z",
//   updatedAt: "2026-01-01T00:00:00.000Z",
// }

// function json(body: unknown, status = 200): Response {
//   return new Response(JSON.stringify(body), {
//     status,
//     headers: { "Content-Type": "application/json" },
//   })
// }

// export const auth = {
//   api: {
//     async getSession(_opts?: unknown) {
//       return { session: MOCK_SESSION, user: MOCK_USER }
//     },
//   },

//   async handler(request: Request): Promise<Response> {
//     const url = new URL(request.url)
//     const path = url.pathname.replace(/^\/api\/auth/, "") || "/"

//     switch (path) {
//       case "/get-session":
//         return json({ session: MOCK_SESSION, user: MOCK_USER })

//       case "/sign-in/email":
//       case "/sign-up/email":
//         return json({ redirect: false, token: MOCK_SESSION.token, user: MOCK_USER })

//       case "/sign-in/social":
//         // No real SSO locally — report success without redirecting anywhere.
//         return json({ redirect: false, token: MOCK_SESSION.token, user: MOCK_USER })

//       case "/sign-out":
//         return json({ success: true })

//       case "/list-accounts":
//         return json([MOCK_ACCOUNT])

//       case "/change-password":
//         return json({ token: MOCK_SESSION.token, user: MOCK_USER })

//       case "/update-user":
//       case "/forget-password":
//       case "/reset-password":
//         return json({ status: true })

//       case "/admin/list-users":
//         return json({ users: [MOCK_USER], total: 1 })

//       case "/admin/create-user":
//         return json({ user: { ...MOCK_USER, id: `mock-user-${crypto.randomUUID()}` } })

//       case "/admin/update-user":
//         return json({ user: MOCK_USER })

//       case "/admin/remove-user":
//         return json({ success: true })

//       default:
//         // Unknown endpoint — succeed quietly so the UI keeps working.
//         return json({ status: true })
//     }
//   },
// }
