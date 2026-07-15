// import { auth } from "@/lib/auth"
// import type { NextApiRequest, NextApiResponse } from "next"
// import { toNextJsHandler } from "better-auth/next-js"

// const { GET, POST } = toNextJsHandler(auth)

// export default async function authHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") return GET(req, res)
//   if (req.method === "POST") return POST(req, res)
//   res.status(405).end()
// }

import { auth } from "@/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@better-auth/utils/password"
import crypto from "crypto"

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = req.headers.host || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  
  // Reconstruct full URL so Better Auth can parse it
  const url = new URL(req.url!, `${protocol}://${host}`)

  // Intercept the admin/set-user-password endpoint to provide direct, error-free db updates
  if (url.pathname === "/api/auth/admin/set-user-password" && req.method === "POST") {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as HeadersInit,
      });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized: No active session" });
      }

      const isRequesterAdmin = 
        session.user.role === "admin" || 
        ["Owner", "Service Manager", "Group Manager", "Administrator"].includes(session.user.customRole);

      if (!isRequesterAdmin) {
        return res.status(403).json({ message: "Forbidden: Administrator privileges required" });
      }

      const { userId, newPassword } = req.body;
      if (!userId || !newPassword) {
        return res.status(400).json({ message: "Missing userId or newPassword" });
      }

      const hashedPassword = await hashPassword(newPassword);

      const account = await prisma.account.findFirst({
        where: {
          userId,
          providerId: "credential",
        },
      });

      if (account) {
        await prisma.account.update({
          where: { id: account.id },
          data: { 
            password: hashedPassword,
            updatedAt: new Date()
          },
        });
      } else {
        await prisma.account.create({
          data: {
            id: crypto.randomUUID(),
            userId,
            providerId: "credential",
            accountId: userId,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          mustChangePassword: true,
          updatedAt: new Date()
        },
      });
      
      return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (err: any) {
      console.error("[Administrator Password Reset Error]:", err);
      return res.status(500).json({ message: err.message || "Failed to update password" });
    }
  }

  const cleanedHeaders = new Headers(req.headers as HeadersInit)
  cleanedHeaders.delete("content-length")
  cleanedHeaders.delete("transfer-encoding")

  return auth.handler(
    new Request(url, {
      method: req.method,
      headers: cleanedHeaders,
      body: req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
    })
  ).then(async (response) => {
    response.headers.forEach((value, key) => res.setHeader(key, value))
    const text = await response.text()
    if (response.status >= 400) {
      console.error(`[Auth API Error] URL: ${url.pathname}, Status: ${response.status}, Body:`, text)
    }
    res.status(response.status).send(text)
  }).catch((err) => {
    console.error(`[Auth API Handler Crash] URL: ${url.pathname}, Error:`, err)
    res.status(500).json({ message: err.message || "Internal Server Error" })
  })
}