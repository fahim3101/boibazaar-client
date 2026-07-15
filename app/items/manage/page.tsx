"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookCoverSVG from "@/components/BookCoverSVG";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Book } from "@/types";

export default function ManageItemsPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (token) {
      api
        .getMyBooks(token)
        .then((data) => setBooks(data.books))
        .catch(() => setError("Could not load your listings."))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this listing? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await api.deleteBook(id, token);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      setError(err.message || "Could not delete this listing.");
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || !user) {
    return <div className="container-page py-20 text-center text-ink/60">Checking your session…</div>;
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="stamp-badge border-sage text-sage">Your shelf</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">My listings</h1>
          <p className="mt-1 text-ink/60">{books.length} book{books.length !== 1 ? "s" : ""} posted by you.</p>
        </div>
        <Link
          href="/items/add"
          className="w-fit rounded-card bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-amber hover:text-ink"
        >
          + Add new listing
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-card bg-white shadow-card" />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="mt-10 rounded-card bg-white p-10 text-center shadow-card">
          <p className="font-display text-lg font-semibold text-ink">You haven&apos;t listed any books yet</p>
          <p className="mt-2 text-sm text-ink/60">Post your first textbook and reach students across Dhaka.</p>
          <Link
            href="/items/add"
            className="mt-5 inline-block rounded-card bg-amber px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-dark"
          >
            Add your first listing
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-card bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-dark text-xs uppercase text-ink/50">
              <tr>
                <th className="p-4">Book</th>
                <th className="hidden p-4 sm:table-cell">Subject</th>
                <th className="hidden p-4 md:table-cell">Condition</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t border-paper-dark">
                  <td className="flex items-center gap-3 p-4">
                    <div className="h-14 w-10 shrink-0 overflow-hidden rounded-sm">
                      <BookCoverSVG title={book.title} subject={book.subject} className="h-full w-full" />
                    </div>
                    <div>
                      <p className="line-clamp-1 font-semibold text-ink">{book.title}</p>
                      <p className="text-xs text-ink/50">{book.author}</p>
                    </div>
                  </td>
                  <td className="hidden p-4 text-ink/70 sm:table-cell">{book.subject}</td>
                  <td className="hidden p-4 text-ink/70 md:table-cell">{book.condition}</td>
                  <td className="p-4 font-mono font-semibold text-ink">৳{book.price}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/books/${book._id}`}
                        className="rounded-card border border-ink/15 px-3 py-1.5 text-xs font-medium hover:border-amber hover:text-amber-dark"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        disabled={deletingId === book._id}
                        className="rounded-card border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === book._id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
