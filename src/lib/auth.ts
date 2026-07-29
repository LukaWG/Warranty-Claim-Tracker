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