import Link from "next/link";
import BookCard from "../BookCard";
import { Book } from "@/types";

export default function FeaturedBooks({ books }: { books: Book[] }) {
  return (
    <section className="bg-paper py-16">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <div>
            <span className="stamp-badge border-amber text-amber-dark">Fresh listings</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">Recently added books</h2>
          </div>
          <Link href="/explore" className="hidden text-sm font-semibold text-ink hover:text-amber sm:block">
            View all →
          </Link>
        </div>

        {books.length === 0 ? (
          <p className="mt-8 text-ink/60">
            No listings yet — be the first to add one from the &quot;Sell a Book&quot; page.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.slice(0, 4).map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <Link href="/explore" className="mt-6 block text-sm font-semibold text-ink hover:text-amber sm:hidden">
          View all →
        </Link>
      </div>
    </section>
  );
}
