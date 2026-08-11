import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import { createAuthMiddleware, APIError } from "better-auth/api"

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
  // Store rate-limit counters in Postgres (shared by every app instance)
  // instead of the default in-memory store, which is per-process and would
  // let each of the k8s deployment's replicas grant its own separate attempt
  // budget (SECURITY_AUDIT.md Finding 10).
  rateLimit: {
    storage: "database",
  },
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
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      if (!ctx.body?.email.endsWith("@hendy-group.com")) {
        throw new APIError("BAD_REQUEST", {
          message: "Invalid email domain.",
        });
      }
      // Self-service sign-up only ever exists to create the very first
      // (Owner) user on a fresh deployment — see the isFirstUser hook below.
      // Once that user exists, everyone else must be invited by an admin;
      // otherwise anyone could register as an unverified @hendy-group.com
      // address before its real owner ever signs up (SECURITY_AUDIT.md
      // Finding 2).
      const hasExistingUser = (await prisma.user.count()) > 0;
      if (hasExistingUser) {
        throw new APIError("BAD_REQUEST", {
          message: "Self-service sign-up is disabled. Ask an administrator to invite you.",
        });
      }
    }),
  },
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
      defaultSites: { type: "string[]", defaultValue: [], input: true },
      defaultBrands: { type: "string[]", defaultValue: [], input: true },
      mustChangePassword: { type: "boolean", defaultValue: false, input: true },
    }
  }
})