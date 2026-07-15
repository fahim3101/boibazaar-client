"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both your email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.push("/explore");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail("demo@boibazaar.com");
    setPassword("Demo1234!");
    setError("");
  };

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-card bg-white p-8 shadow-card">
        <span className="stamp-badge border-amber text-amber-dark">Welcome back</span>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">Log in to BoiBazaar</h1>
        <p className="mt-1 text-sm text-ink/60">Access your listings and message sellers.</p>

        <div className="mt-5">
          <SocialLoginButtons />
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-paper-dark" />
          <span className="text-xs uppercase tracking-wide text-ink/40">or</span>
          <span className="h-px flex-1 bg-paper-dark" />
        </div>

        <button
          type="button"
          onClick={fillDemo}
          className="w-full rounded-card border border-sage px-4 py-2.5 text-sm font-semibold text-sage hover:bg-sage/10"
        >
          Use demo account
        </button>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="you@university.edu"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-card bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-amber hover:text-ink disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-amber-dark hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
