import type { NextApiRequest, NextApiResponse } from "next"
import { auth } from "@/lib/auth"
import { checkAccess, IDENTITY_FIELDS } from "@/lib/dataAccessPolicy"

const DATA_API_URL = process.env.DATA_API_URL ?? "http://localhost:5001"
const DATA_API_KEY = process.env.DATA_API_KEY

// Session-gated, role-gated proxy to the external warranty data API. The
// browser never talks to that API directly (and it never sees DATA_API_KEY)
// — this is the only thing allowed to call it, and only once a valid session
// AND the caller's role permit the specific collection/method being
// requested (see src/lib/dataAccessPolicy.ts). Authorization is checked
// before the upstream fetch below — a denied request never reaches the data
// API at all.
export default async function dataProxyHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth.api.getSession({
    headers: req.headers as HeadersInit,
  })

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { path, ...restQuery } = req.query
  const segments = ([] as string[]).concat(path ?? [])
  const [collection] = segments
  const targetPath = segments.map(encodeURIComponent).join("/")
  const role = (session.user as { customRole?: string }).customRole

  const verdict = checkAccess({ role, method: req.method, collection, body: req.body })
  if (!verdict.allowed) {
    return res.status(verdict.status).json({ error: verdict.reason ?? "Forbidden" })
  }

  // Identity fields (created_by, sender_email, ...) are trivially spoofable
  // in a raw request body — always overwrite them from the verified session
  // rather than trusting whatever the client sent, so audit trails and chat
  // attribution can't be forged.
  let outgoingBody: unknown = req.body
  if (req.method !== "GET" && req.method !== "HEAD" && outgoingBody && typeof outgoingBody === "object") {
    const user = session.user as Record<string, unknown>
    const stamped: Record<string, unknown> = { ...(outgoingBody as Record<string, unknown>) }
    for (const [field, sourceKey] of Object.entries(IDENTITY_FIELDS)) {
      if (field in stamped) {
        stamped[field] = user[sourceKey] ?? stamped[field]
      }
    }
    outgoingBody = stamped
  }

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
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(outgoingBody) : undefined,
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
