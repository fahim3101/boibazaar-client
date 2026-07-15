"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BookCoverSVG from "@/components/BookCoverSVG";
import BookCard from "@/components/BookCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Book } from "@/types";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, token } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState<"cover" | "spine" | "back">("cover");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const loadBook = () => {
    setLoading(true);
    api
      .getBookById(id)
      .then((data) => {
        setBook(data.book);
        setRelated(data.related);
      })
      .catch(() => setError("This listing could not be found. It may have been sold or removed."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    if (!comment.trim()) {
      setReviewError("Please write a short comment before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await api.addReview(id, { rating, comment, userName: user.name }, token);
      setComment("");
      setRating(5);
      loadBook();
    } catch (err: any) {
      setReviewError(err.message || "Could not submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SkeletonCard />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-paper-dark" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-paper-dark" />
            <div className="h-24 w-full animate-pulse rounded bg-paper-dark" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container-page py-20 text-center">
        <p className="font-display text-xl font-semibold text-ink">{error || "Listing not found."}</p>
        <Link href="/explore" className="mt-4 inline-block text-amber-dark hover:underline">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="flex h-96 items-center justify-center rounded-card bg-paper-dark p-8 shadow-card">
            {book.imageUrl && activeImage === "cover" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.imageUrl} alt={book.title} className="h-full w-auto rounded-sm object-contain" />
            ) : (
              <BookCoverSVG
                title={book.title}
                subject={book.subject}
                author={book.author}
                edition={book.edition}
                variant={activeImage}
                className="h-full w-auto rounded-sm shadow-card"
              />
            )}
          </div>
          <div className="mt-4 flex justify-center gap-3">
            {(["cover", "spine", "back"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveImage(v)}
                className={`rounded-card border px-4 py-2 text-xs font-medium capitalize ${
                  activeImage === v ? "border-amber bg-amber/10 text-amber-dark" : "border-ink/15 text-ink/60"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="stamp-badge border-sage text-sage">{book.subject}</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">{book.title}</h1>
          <p className="mt-1 text-ink/60">by {book.author} · {book.edition} Edition</p>

          <div className="mt-5 flex items-center gap-4">
            <p className="font-display text-3xl font-bold text-ink">৳{book.price}</p>
            {book.avgRating > 0 && (
              <span className="font-mono text-sm text-amber-dark">
                ★ {book.avgRating.toFixed(1)} ({book.reviews.length} review{book.reviews.length !== 1 ? "s" : ""})
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-ink/70">{book.fullDescription}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-card bg-white p-5 shadow-card">
            <div>
              <p className="text-xs uppercase text-ink/40">Condition</p>
              <p className="text-sm font-semibold text-ink">{book.condition}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/40">Location</p>
              <p className="text-sm font-semibold text-ink">{book.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/40">University</p>
              <p className="text-sm font-semibold text-ink">{book.university}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/40">Posted</p>
              <p className="text-sm font-semibold text-ink">
                {new Date(book.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-card border border-paper-dark p-5">
            <p className="text-xs uppercase text-ink/40">Seller</p>
            <p className="mt-1 font-display font-semibold text-ink">{book.sellerName}</p>
            <a href={`mailto:${book.sellerEmail}`} className="text-sm text-amber-dark hover:underline">
              {book.sellerEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Reviews &amp; ratings</h2>
          {book.reviews.length === 0 ? (
            <p className="mt-3 text-sm text-ink/60">No reviews yet. Be the first to share your experience.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {book.reviews.map((r, i) => (
                <div key={i} className="rounded-card bg-white p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink">{r.userName}</p>
                    <span className="font-mono text-xs text-amber-dark">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink/70">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Leave a review</h2>
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4 rounded-card bg-white p-5 shadow-card">
            <div>
              <label className="text-xs font-semibold uppercase text-ink/50">Rating</label>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    className={`h-9 w-9 rounded-full border font-mono text-sm ${
                      rating >= n ? "border-amber bg-amber text-ink" : "border-ink/15 text-ink/40"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-ink/50">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="How was the book's condition and the exchange experience?"
                className="mt-2 w-full rounded-card border border-ink/15 p-3 text-sm focus:border-amber"
              />
            </div>
            {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-card bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-amber hover:text-ink disabled:opacity-50"
            >
              {user ? (submitting ? "Submitting…" : "Submit review") : "Log in to review"}
            </button>
          </form>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">More in {book.subject}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
