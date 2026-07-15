"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookCoverSVG from "./BookCoverSVG";

const floatingBooks = [
  { title: "Calculus: Early Transcendentals", subject: "Mathematics" },
  { title: "Introduction to Algorithms", subject: "Computer Science" },
  { title: "Principles of Economics", subject: "Economics" },
  { title: "Contracts: Cases and Materials", subject: "Law" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/explore?search=${encodeURIComponent(query)}` : "/explore");
  };

  return (
    <section className="relative overflow-hidden bg-paper" style={{ minHeight: "68vh" }}>
      <div className="container-page relative flex min-h-[68vh] flex-col items-center justify-center gap-10 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <span className="stamp-badge border-sage text-sage">Dhaka · Chattogram · Sylhet · Rajshahi</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Your next textbook is already on someone&apos;s shelf.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            BoiBazaar connects students across Bangladeshi universities to buy and
            sell secondhand textbooks, notes, and study guides — at a fraction of
            the bookstore price.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or subject…"
              className="w-full rounded-card border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-amber sm:w-80"
            />
            <button
              type="submit"
              className="rounded-card bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-amber hover:text-ink"
            >
              Find a book
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="text-xs uppercase tracking-wide text-ink/40">Popular:</span>
            {["Computer Science", "Economics", "Law", "Mathematics"].map((s) => (
              <button
                key={s}
                onClick={() => router.push(`/explore?subject=${encodeURIComponent(s)}`)}
                className="stamp-badge border-ink/20 text-ink/60 hover:border-amber hover:text-amber"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="relative hidden h-80 w-full max-w-sm items-end justify-center gap-3 lg:flex">
          {floatingBooks.map((b, i) => (
            <div
              key={b.title}
              className="w-24 shadow-card-hover transition-transform duration-500 hover:-translate-y-3"
              style={{
                transform: `translateY(${i % 2 === 0 ? "0px" : "28px"}) rotate(${
                  i % 2 === 0 ? "-3deg" : "3deg"
                })`,
              }}
            >
              <BookCoverSVG title={b.title} subject={b.subject} className="w-full rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
