import type { NextApiRequest, NextApiResponse } from "next"
import { auth } from "@/lib/auth"

const DATA_API_URL = process.env.DATA_API_URL ?? "http://localhost:5001"
const DATA_API_KEY = process.env.DATA_API_KEY

// Session-gated proxy to the external warranty data API. The browser never
// talks to that API directly (and it never sees DATA_API_KEY) — this is the
// only thing allowed to call it, and only once a valid session is confirmed.
export default async function dataProxyHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth.api.getSession({
    headers: req.headers as HeadersInit,
  })

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { path, ...restQuery } = req.query
  const segments = ([] as string[]).concat(path ?? [])
  const targetPath = segments.map(encodeURIComponent).join("/")

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(restQuery)) {
    if (Array.isArray(value)) value.forEach((v) => search.append(key, v))
    else if (value !== undefined) search.append(key, value)
  }
  const qs = search.toString() ? `?${search.toString()}` : ""

  try {
    const upstream = await fetch(`${DATA_API_URL}/${targetPath}${qs}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-key": DATA_API_KEY ?? "",
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    })

    const text = await upstream.text()
    res.status(upstream.status)
    if (!text) return res.end()
    res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json")
    res.send(text)
  } catch (err: any) {
    console.error("[Data API Proxy Error]:", err)
    res.status(502).json({ error: "Data API unreachable" })
  }
}
