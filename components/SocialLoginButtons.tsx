"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function friendlyFirebaseError(err: any): string {
  const code = err?.code || "";
  if (code.includes("popup-closed-by-user")) return "Sign-in was cancelled.";
  if (code.includes("account-exists-with-different-credential")) {
    return "An account already exists with this email using a different sign-in method.";
  }
  if (code.includes("auth/configuration-not-found") || code.includes("auth/operation-not-allowed")) {
    return "Social login isn't configured yet. Add your Firebase keys to .env.local (see README).";
  }
  return err?.message || "Social sign-in failed. Please try again.";
}

export default function SocialLoginButtons() {
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();
  const [loadingProvider, setLoadingProvider] = useState<"google" | "facebook" | null>(null);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setError("");
    setLoadingProvider("google");
    try {
      await loginWithGoogle();
      router.push("/explore");
    } catch (err: any) {
      setError(friendlyFirebaseError(err));
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleFacebook = async () => {
    setError("");
    setLoadingProvider("facebook");
    try {
      await loginWithFacebook();
      router.push("/explore");
    } catch (err: any) {
      setError(friendlyFirebaseError(err));
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loadingProvider !== null}
          className="flex w-full items-center justify-center gap-2 rounded-card border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-amber disabled:opacity-50"
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4c-7.5 0-13.9 4.2-17.7 10.4z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.6l-6.5-5.4C29.6 34.7 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.9 39.7 16.4 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.4C41.5 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
          {loadingProvider === "google" ? "Connecting…" : "Continue with Google"}
        </button>

        <button
          type="button"
          onClick={handleFacebook}
          disabled={loadingProvider !== null}
          className="flex w-full items-center justify-center gap-2 rounded-card border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-amber disabled:opacity-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
          </svg>
          {loadingProvider === "facebook" ? "Connecting…" : "Continue with Facebook"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
