import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// LOCAL MOCK: auth is stubbed in src/lib/auth.ts and never issues a session
// cookie, so the original cookie check below would redirect-loop through
// /login. Allow all requests. Restore the commented block for production.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

/* Original implementation — restore for production:

import { getSessionCookie } from "better-auth/cookies"

const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/api/auth"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))

  if (isPublic) return NextResponse.next()

  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
*/

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
