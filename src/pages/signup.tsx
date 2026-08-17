import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useQueryClient } from "@tanstack/react-query"
import { signIn, signUp, useSession } from "@/lib/auth-client"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session, isPending } = useSession()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session, router])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await signUp.email({
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
      firstName,
      lastName,
      callbackURL: "/",
    })

    if (error) {
      setError(error.message ?? "Something went wrong.")
      setLoading(false)
    } else {
      // See login.tsx — Layout.jsx's `currentUser` query stays mounted across
      // this client-side navigation and won't refetch on its own, so without
      // this it keeps reporting "no session" and Layout bounces us straight
      // back here, forever.
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      router.push("/")
    }
  }
  async function handleMicrosoftLogin() {
    setLoading(true)
    setError("")

    const { error } = await signIn.social({
      provider: "microsoft",
      callbackURL: "/",
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

        <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--hendy-blue)' }}>
          Create account
        </h1>
        <p className="text-gray-500 text-sm mb-6" style={{ color: 'var(--hendy-grey)' }}>
          Warranty Claim Tracker
        </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4" style={{ color: 'var(--hendy-grey)' }}>
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text" required
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text" required
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {[
            { label: "Email", value: email, set: setEmail, type: "email" },
            { label: "Password", value: password, set: setPassword, type: "password" },
          ].map(({ label, value, set, type }) => (
            <div key={label} style={{ color: 'var(--hendy-grey)' }}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type} required
                value={value} onChange={(e) => set(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-medium hendy-teal-button disabled:opacity-50 transition"
          >
            {loading ? "Creating account…" : "Create account"}
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
              <span style={{ color: 'var(--hendy-grey)' }}>Microsoft</span>
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline" style={{ color: 'var(--hendy-teal)' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}