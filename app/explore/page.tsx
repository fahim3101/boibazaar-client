"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Book, BooksResponse, SUBJECTS, CONDITIONS } from "@/types";
import { api } from "@/lib/api";

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const search = searchParams.get("search") || "";
  const subject = searchParams.get("subject") || "";
  const condition = searchParams.get("condition") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || "1");

  const [searchInput, setSearchInput] = useState(search);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      if (!("page" in updates)) params.delete("page");
      router.push(`/explore?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    setLoading(true);
    setError("");
    const query = new URLSearchParams({
      search,
      subject,
      condition,
      sort,
      page: String(page),
      limit: "8",
    }).toString();

    api
      .getBooks(query)
      .then((data: BooksResponse) => {
        setBooks(data.books);
        setPages(data.pages);
        setTotal(data.total);
      })
      .catch(() => setError("Could not load listings. Please check your connection and try again."))
      .finally(() => setLoading(false));
  }, [search, subject, condition, sort, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Explore listings</h1>
      <p className="mt-1 text-ink/60">
        {total} book{total !== 1 ? "s" : ""} available across every subject and university.
      </p>

      <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title, author, or subject…"
          className="w-full rounded-card border border-ink/15 bg-white px-4 py-3 text-sm focus:border-amber"
        />
        <button
          type="submit"
          className="rounded-card bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-amber hover:text-ink"
        >
          Search
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-card bg-white p-5 shadow-card">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/70">
            Filters
          </h2>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase text-ink/50">Subject</label>
            <select
              value={subject}
              onChange={(e) => updateParams({ subject: e.target.value })}
              className="mt-2 w-full rounded-card border border-ink/15 bg-white p-2 text-sm"
            >
              <option value="">All subjects</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase text-ink/50">Condition</label>
            <select
              value={condition}
              onChange={(e) => updateParams({ condition: e.target.value })}
              className="mt-2 w-full rounded-card border border-ink/15 bg-white p-2 text-sm"
            >
              <option value="">Any condition</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase text-ink/50">Sort by</label>
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="mt-2 w-full rounded-card border border-ink/15 bg-white p-2 text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="price_low">Price: low to high</option>
              <option value="price_high">Price: high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          {(subject || condition || search) && (
            <button
              onClick={() => {
                setSearchInput("");
                router.push("/explore");
              }}
              className="mt-5 text-xs font-semibold text-amber-dark hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          {error && (
            <p className="rounded-card bg-white p-6 text-sm text-red-600 shadow-card">{error}</p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : books.length === 0 && !error ? (
            <div className="rounded-card bg-white p-10 text-center shadow-card">
              <p className="font-display text-lg font-semibold text-ink">No books match those filters</p>
              <p className="mt-2 text-sm text-ink/60">
                Try clearing a filter or searching a broader term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => updateParams({ page: String(page - 1) })}
                className="rounded-card border border-ink/15 px-4 py-2 text-sm font-medium disabled:opacity-30"
              >
                Previous
              </button>
              <span className="font-mono text-sm text-ink/70">
                Page {page} of {pages}
              </span>
              <button
                disabled={page >= pages}
                onClick={() => updateParams({ page: String(page + 1) })}
                className="rounded-card border border-ink/15 px-4 py-2 text-sm font-medium disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-page py-10">Loading…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
