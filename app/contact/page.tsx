"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in every field before sending.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="container-page grid grid-cols-1 gap-12 py-14 lg:grid-cols-2">
      <div>
        <span className="stamp-badge border-sage text-sage">Reach out</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">Contact us</h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink/70">
          Questions, feedback, or found a listing that looks off? Send a message
          and we&apos;ll get back to you.
        </p>

        <div className="mt-8 space-y-4 text-sm text-ink/70">
          <div>
            <p className="text-xs uppercase text-ink/40">Email</p>
            <p className="font-semibold text-ink">fahimrana3101@gmail.com</p>
          </div>
          <div>
            <p className="text-xs uppercase text-ink/40">Location</p>
            <p className="font-semibold text-ink">Dhaka, Bangladesh</p>
          </div>
          <div>
            <p className="text-xs uppercase text-ink/40">Response time</p>
            <p className="font-semibold text-ink">Usually within 1-2 business days</p>
          </div>
        </div>
      </div>

      <div className="rounded-card bg-white p-6 shadow-card">
        {sent ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <p className="font-display text-lg font-semibold text-ink">Message sent</p>
            <p className="mt-2 text-sm text-ink/60">Thanks for reaching out — we&apos;ll reply soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-ink/50">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-ink/50">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-ink/50">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
                placeholder="How can we help?"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-card bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-amber hover:text-ink"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
