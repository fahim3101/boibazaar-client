"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, university);
      router.push("/explore");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-card bg-white p-8 shadow-card">
        <span className="stamp-badge border-amber text-amber-dark">Join BoiBazaar</span>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-ink/60">Start buying and selling textbooks in minutes.</p>

        <div className="mt-5">
          <SocialLoginButtons />
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-paper-dark" />
          <span className="text-xs uppercase tracking-wide text-ink/40">or sign up with email</span>
          <span className="h-px flex-1 bg-paper-dark" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="register-name" className="text-xs font-semibold uppercase text-ink/50">
              Full name
            </label>
            <input
              id="register-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="register-email" className="text-xs font-semibold uppercase text-ink/50">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="you@university.edu"
            />
          </div>
          <div>
            <label
              htmlFor="register-university"
              className="text-xs font-semibold uppercase text-ink/50"
            >
              University (optional)
            </label>
            <input
              id="register-university"
              type="text"
              autoComplete="organization"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. Dhaka University"
            />
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="text-xs font-semibold uppercase text-ink/50"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label
              htmlFor="register-confirm"
              className="text-xs font-semibold uppercase text-ink/50"
            >
              Confirm password
            </label>
            <input
              id="register-confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="Re-enter your password"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-card bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-amber hover:text-ink disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-amber-dark hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
