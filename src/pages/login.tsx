import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { signIn, useSession } from "@/lib/auth-client"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  let callbackUrl = (router.query.callbackUrl as string) ?? "/"
  if (
    callbackUrl === "/login" ||
    callbackUrl === "/signup" ||
    callbackUrl === "/forgot-password" ||
    callbackUrl === "/reset-password"
  ) {
    callbackUrl = "/"
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      router.push("/")
    } else if (process.env.NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO === "true" && !isPending && !loading) {
      handleMicrosoftLogin()
    }
  }, [session, router, isPending])

  if (isPending || (process.env.NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO === "true" && !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 text-sm animate-pulse">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    })

    if (error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push(callbackUrl)
    }
  }

  async function handleMicrosoftLogin() {
    setLoading(true)
    setError("")

    const { error } = await signIn.social({
      provider: "microsoft",
      callbackURL: callbackUrl,
    })

    // On success the redirect plugin navigates the browser away before this
    // matters. On failure, nothing navigates us away — reset state so the
    // form isn't stuck disabled until a manual refresh.
    if (error) {
      setError("Microsoft sign-in failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <style>{`
        :root {
          --hendy-blue: #222b57;
          --hendy-teal: #56C4B7;
          --hendy-grey: #575756;
        }
        .hendy-teal-button {
            background-color: var(--hendy-teal);
            color: white;
        }
        .hendy-teal-button:hover {
            background-color: color-mix(in srgb, var(--hendy-teal) 90%, black);
        }
        .hendy-teal-button:hover .text {
            color: white !important;
        }
      `}</style>
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm">

          <div className="text-center mb-8">
            {/* <div className="text-3xl font-extrabold tracking-wider mb-1" style={{ color: 'var(--hendy-blue)' }}>
              HENDY
            </div>
            <div className="text-xs mb-4 font-medium tracking-widest" style={{ color: 'var(--hendy-grey)' }}>
              EST. 1859
            </div> */}
        <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--hendy-blue)' }}>
          Sign in
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--hendy-grey)' }}>
          Warranty Claim Tracker
        </p>
        </div>
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div style={{ color: 'var(--hendy-grey)' }}>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div style={{ color: 'var(--hendy-grey)' }}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Password
              </label>
              {/* <Link href="/forgot-password" className="text-sm hover:underline" style={{ color: 'var(--hendy-teal)' }}>
                Forgot password?
              </Link> */}
            </div>
            <input
              type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-medium hendy-teal-button disabled:opacity-50 transition"
            // style={{ backgroundColor: 'var(--hendy-teal)' }}. bg-blue-600 text-white   hover:bg-blue-700 

          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {process.env.NEXT_PUBLIC_ENABLE_MICROSOFT_SSO === "true" && (
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-gray-500">Or continue with</span>
              </div>
            </div>
            <button
              onClick={handleMicrosoftLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition text-gray-700"
            >
              <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <path fill="#f35325" d="M1 1h9v9H1z"/>
                <path fill="#81bc06" d="M11 1h9v9h-9z"/>
                <path fill="#05a6f0" d="M1 11h9v9H1z"/>
                <path fill="#ffba08" d="M11 11h9v9h-9z"/>
              </svg>
              Microsoft
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline" style={{ color: 'var(--hendy-teal)' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}