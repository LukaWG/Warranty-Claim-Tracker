import { useState } from "react"
import { useRouter } from "next/router"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = router.query

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Show password toggle states
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!router.isReady) return

    if (!token || typeof token !== "string") {
      setError("Reset token is missing or invalid. Please request a new link.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    setError("")

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    if (error) {
      setError(error.message ?? "Failed to reset password. The link may have expired.")
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  // Check if router is ready and token is missing
  const tokenMissing = router.isReady && (!token || typeof token !== "string")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">Reset password</h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {tokenMissing && (
          <div className="space-y-4">
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">
              The reset token is missing or invalid. Please check your reset link or request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="block w-full text-center bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition"
            >
              Request new link
            </Link>
          </div>
        )}

        {!tokenMissing && (
          success ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg mb-4">
                Your password has been successfully reset! You can now sign in with your new password.
              </p>
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    id="new-password"
                    name="new-password"
                    placeholder="At least 8 characters"
                    className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"} required
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  id="confirm-new-password"
                  name="confirm-new-password"
                  placeholder="Repeat your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit" disabled={loading || !router.isReady}
                className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? "Resetting password…" : "Reset password"}
              </button>
            </form>
          )
        )}
      </div>
    </div>
  )
}
