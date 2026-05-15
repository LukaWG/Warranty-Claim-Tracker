import { auth } from "@/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { toNextJsHandler } from "better-auth/next-js"

const handler = toNextJsHandler(auth)

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handler(req, res)
}