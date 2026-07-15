import Link from "next/link";
import { SUBJECTS } from "@/types";

const icons: Record<string, string> = {
  "Computer Science": "⌘",
  "Business Administration": "◫",
  "Electrical & Electronic Engineering": "⚡",
  "Civil Engineering": "▲",
  Economics: "◐",
  Mathematics: "∑",
  Law: "⚖",
  English: "✎",
  "Medical & Pharmacy": "✚",
};

export default function Categories() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <span className="stamp-badge border-sage text-sage">Browse by shelf</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink">Find your department</h2>
        <p className="mt-2 max-w-2xl text-ink/60">
          Every subject has its own shelf. Jump straight to the books your course needs.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject}
              href={`/explore?subject=${encodeURIComponent(subject)}`}
              className="flex flex-col items-center gap-3 rounded-card border border-paper-dark bg-paper p-5 text-center transition-colors hover:border-amber hover:bg-amber/10"
            >
              <span className="font-display text-2xl text-ink">{icons[subject] || "📚"}</span>
              <span className="text-sm font-medium text-ink">{subject}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
