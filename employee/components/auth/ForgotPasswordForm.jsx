"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setResetLink("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setResetLink(data.resetLink);

        setTimeout(() => {
          const path = data.resetLink.replace(
            process.env.NEXT_PUBLIC_APP_URL || window.location.origin,
            ""
          );
          router.push(path);
        }, 1500);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="you@example.com"
        />
      </div>

      {message && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          {message} Redirecting...
        </div>
      )}

      {resetLink && (
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm break-all">
          <p className="font-semibold mb-1">Reset Link:</p>
          <a href={resetLink} className="underline">
            {resetLink}
          </a>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Get Reset Link"}
      </button>

      <div className="text-center text-sm text-gray-600">
        Remember your password?{""}
        <Link href="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}