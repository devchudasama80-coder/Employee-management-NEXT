"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginForm() {
  const [step, setStep] = useState("credentials");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.twoFactorSetupRequired) {
        setQrCode(data.qrCode || "");
        setSecret(data.secret || "");
        setStep("setup");
      } else if (data.twoFactorRequired) {
        setStep("otp");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "setup") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-5">
        <h2 className="text-lg font-semibold">Set up Authenticator</h2>
        <p className="text-sm text-gray-600">
          Scan this QR code with Google Authenticator, then enter the 6-digit code.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {qrCode && (
          <div className="flex justify-center">
            <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
          </div>
        )}

        {secret && (
          <p className="text-xs text-gray-500 break-all text-center">
            Manual key: <code>{secret}</code>
          </p>
        )}

        <Input
          label="Authentication Code"
          type="text"
          name="otp"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.trim())}
          maxLength={8}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Continue"}
        </Button>

        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setOtp("");
            setQrCode("");
            setSecret("");
            setError("");
          }}
          className="text-sm text-gray-500 underline w-full text-center"
        >
          Back to login
        </button>
      </form>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-5">
        <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
        <p className="text-sm text-gray-600">
          Enter the 6-digit code from Google Authenticator.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <Input
          label="Authentication Code"
          type="text"
          name="otp"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.trim())}
          maxLength={8}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Login"}
        </Button>

        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setOtp("");
            setError("");
          }}
          className="text-sm text-gray-500 underline w-full text-center"
        >
          Back to login
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center">
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-600 font-semibold">
          Register
        </Link>
      </p>

      <div className="text-right text-sm">
        <Link href="/forgot-password" className="text-indigo-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}