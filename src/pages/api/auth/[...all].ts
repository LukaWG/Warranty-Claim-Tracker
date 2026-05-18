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

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = req.headers.host || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  
  // Reconstruct full URL so Better Auth can parse it
  const url = new URL(req.url!, `${protocol}://${host}`)

  return auth.handler(
    new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
    })
  ).then(async (response) => {
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.status(response.status).send(await response.text())
  })
}