"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="bg-ink py-16 text-paper">
      <div className="container-page flex flex-col items-center gap-6 rounded-card bg-ink-light px-6 py-12 text-center">
        <span className="stamp-badge border-amber text-amber">Stay in the loop</span>
        <h2 className="font-display text-3xl font-bold">
          Get notified when new books hit your subject
        </h2>
        <p className="max-w-md text-sm text-paper/70">
          One email a week with the latest listings in the subjects you care about. No spam, unsubscribe anytime.
        </p>

        {subscribed ? (
          <p className="font-mono text-sm text-amber">You&apos;re subscribed — see you in your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full rounded-card border border-paper/20 bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-amber"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-card bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-dark"
            >
              Notify me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
