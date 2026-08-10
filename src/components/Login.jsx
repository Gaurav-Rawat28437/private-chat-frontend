import { useState } from "react"

import { createUser } from "../utils/api"

function Login({ onLogin }) {
  const [username, setUsername] =
    useState("")

  const [error, setError] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanUsername =
      username.trim()

    if (cleanUsername.length < 2) {
      setError(
        "Username must contain at least 2 characters"
      )

      return
    }

    try {
      setLoading(true)
      setError("")

      const data =
        await createUser(
          cleanUsername
        )

      onLogin(data.user)
    } catch (error) {
      console.error(
        "Login error:",
        error.message
      )

      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="text-5xl">
            💬
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-4">
            Private Chat
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your username to start
            chatting.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              maxLength={24}
              placeholder="Enter your username"
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Joining..."
              : "Join Chat"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login