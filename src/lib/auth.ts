import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
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
      customRole: { type: "string", defaultValue: "Processor", input: true },
      defaultSite: { type: "string", required: false, input: true },
      mustChangePassword: { type: "boolean", defaultValue: false, input: true },
    }
  }
})