"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookCoverSVG from "@/components/BookCoverSVG";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Book, User } from "@/types";

export default function AdminPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<"books" | "users">("books");
  const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0 });
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push(user ? "/explore" : "/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (token && user?.role === "admin") {
      Promise.all([api.getAdminStats(token), api.getAllBooksAdmin(token), api.getAllUsersAdmin(token)])
        .then(([statsData, booksData, usersData]) => {
          setStats(statsData);
          setBooks(booksData.books);
          setUsers(usersData.users);
        })
        .catch(() => setError("Could not load admin data."))
        .finally(() => setLoading(false));
    }
  }, [token, user]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Remove this listing as an admin? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await api.adminDeleteBook(id, token);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      setStats((prev) => ({ ...prev, totalBooks: prev.totalBooks - 1 }));
    } catch (err: any) {
      setError(err.message || "Could not delete listing.");
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || !user || user.role !== "admin") {
    return <div className="container-page py-20 text-center text-ink/60">Checking admin access…</div>;
  }

  return (
    <div className="container-page py-10">
      <span className="stamp-badge border-amber text-amber-dark">Admin only</span>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink">Admin dashboard</h1>
      <p className="mt-1 text-ink/60">Moderate every listing and view all registered students.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-card bg-white p-5 shadow-card">
          <p className="font-display text-3xl font-bold text-ink">{stats.totalUsers}</p>
          <p className="mt-1 text-sm text-ink/60">Registered students</p>
        </div>
        <div className="rounded-card bg-white p-5 shadow-card">
          <p className="font-display text-3xl font-bold text-ink">{stats.totalBooks}</p>
          <p className="mt-1 text-sm text-ink/60">Total listings</p>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <button
          onClick={() => setTab("books")}
          className={`rounded-card px-4 py-2 text-sm font-semibold ${
            tab === "books" ? "bg-ink text-paper" : "border border-ink/15 text-ink/60"
          }`}
        >
          All listings
        </button>
        <button
          onClick={() => setTab("users")}
          className={`rounded-card px-4 py-2 text-sm font-semibold ${
            tab === "users" ? "bg-ink text-paper" : "border border-ink/15 text-ink/60"
          }`}
        >
          All users
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-card bg-white shadow-card" />
          ))}
        </div>
      ) : tab === "books" ? (
        <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-dark text-xs uppercase text-ink/50">
              <tr>
                <th className="p-4">Book</th>
                <th className="hidden p-4 md:table-cell">Seller</th>
                <th className="hidden p-4 sm:table-cell">Subject</th>
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
                    <p className="line-clamp-1 font-semibold text-ink">{book.title}</p>
                  </td>
                  <td className="hidden p-4 text-ink/70 md:table-cell">
                    {book.sellerName}
                    <br />
                    <span className="text-xs text-ink/40">{book.sellerEmail}</span>
                  </td>
                  <td className="hidden p-4 text-ink/70 sm:table-cell">{book.subject}</td>
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
                        {deletingId === book._id ? "Removing…" : "Remove"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-card bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-dark text-xs uppercase text-ink/50">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="hidden p-4 sm:table-cell">University</th>
                <th className="hidden p-4 md:table-cell">Sign-in method</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-paper-dark">
                  <td className="p-4 font-semibold text-ink">{u.name}</td>
                  <td className="p-4 text-ink/70">{u.email}</td>
                  <td className="hidden p-4 text-ink/70 sm:table-cell">{u.university || "—"}</td>
                  <td className="hidden p-4 capitalize text-ink/70 md:table-cell">{u.authProvider}</td>
                  <td className="p-4">
                    <span
                      className={`stamp-badge ${
                        u.role === "admin" ? "border-amber text-amber-dark" : "border-sage text-sage"
                      }`}
                    >
                      {u.role}
                    </span>
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
