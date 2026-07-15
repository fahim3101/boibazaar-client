"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { SUBJECTS, CONDITIONS } from "@/types";

const universities = [
  "Dhaka University",
  "BUET",
  "North South University",
  "BRAC University",
  "AIUB",
  "IUT",
  "Jahangirnagar University",
  "Chittagong University",
  "Other",
];

export default function AddItemPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    subject: SUBJECTS[0],
    edition: "",
    condition: CONDITIONS[2],
    price: "",
    shortDescription: "",
    fullDescription: "",
    imageUrl: "",
    location: "",
    university: universities[0],
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.title ||
      !form.author ||
      !form.price ||
      !form.shortDescription ||
      !form.fullDescription ||
      !form.location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (!token || !user) return;

    setSubmitting(true);
    try {
      await api.createBook(
        {
          ...form,
          price: Number(form.price),
          sellerName: user.name,
          sellerEmail: user.email,
        },
        token
      );
      setSuccess(true);
      setTimeout(() => router.push("/items/manage"), 1200);
    } catch (err: any) {
      setError(err.message || "Could not create the listing.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return <div className="container-page py-20 text-center text-ink/60">Checking your session…</div>;
  }

  return (
    <div className="container-page max-w-2xl py-10">
      <span className="stamp-badge border-amber text-amber-dark">New listing</span>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink">Sell a book</h1>
      <p className="mt-1 text-ink/60">Fill in the details below — the more specific, the faster it sells.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-card bg-white p-6 shadow-card">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Title *</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. Introduction to Algorithms"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Author *</label>
            <input
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. Cormen, Leiserson, Rivest"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Subject *</label>
            <select
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm"
            >
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Edition</label>
            <input
              value={form.edition}
              onChange={(e) => handleChange("edition", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. 3rd"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Condition *</label>
            <select
              value={form.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm"
            >
              {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Price (৳) *</label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. 450"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">Your area/location *</label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              placeholder="e.g. Dhanmondi"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-ink/50">University *</label>
            <select
              value={form.university}
              onChange={(e) => handleChange("university", e.target.value)}
              className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm"
            >
              {universities.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-ink/50">Short description *</label>
          <input
            value={form.shortDescription}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
            maxLength={160}
            className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
            placeholder="One line that appears on the book card"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-ink/50">Full description *</label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => handleChange("fullDescription", e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
            placeholder="Describe the book's condition, any markings, what's included, etc."
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-ink/50">Image URL (optional)</label>
          <input
            value={form.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
            placeholder="https://…"
          />
          <p className="mt-1 text-xs text-ink/40">
            Leave blank to use a generated BoiBazaar cover for this listing.
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-sage">Listing created! Redirecting to your listings…</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-card bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-amber hover:text-ink disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit listing"}
        </button>
      </form>
    </div>
  );
}
