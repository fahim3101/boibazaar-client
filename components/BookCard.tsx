import Link from "next/link";
import BookCoverSVG from "./BookCoverSVG";
import { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  const postedDate = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <div className="perforated-top" />
      <div className="flex h-56 items-center justify-center bg-paper-dark p-4">
        {book.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-auto rounded-sm object-cover shadow-sm"
          />
        ) : (
          <BookCoverSVG
            title={book.title}
            subject={book.subject}
            author={book.author}
            edition={book.edition}
            className="h-full w-auto rounded-sm shadow-sm"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="stamp-badge w-fit border-sage text-sage">{book.subject}</span>
          {book.avgRating > 0 && (
            <span className="font-mono text-xs font-semibold text-amber-dark">
              ★ {book.avgRating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="line-clamp-1 font-display text-base font-bold text-ink">{book.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink/60">{book.shortDescription}</p>

        <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink/70">
          <span>{book.condition}</span>
          <span>{book.location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-paper-dark pt-3">
          <div>
            <p className="font-display text-lg font-bold text-ink">৳{book.price}</p>
            <p className="text-[11px] text-ink/40">Posted {postedDate}</p>
          </div>
          <Link
            href={`/books/${book._id}`}
            className="rounded-card bg-ink px-3 py-2 text-xs font-semibold text-paper transition-colors hover:bg-amber hover:text-ink"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
