import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="stamp-badge border-sage text-sage">404</span>
      <h2 className="mt-4 font-display text-3xl font-bold text-ink">Page not found</h2>
      <p className="mt-2 max-w-md text-sm text-ink/60">
        The shelf you are looking for doesn&apos;t exist. Let&apos;s get you back to browsing
        textbooks.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-card bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-amber hover:text-ink"
      >
        Go back home
      </Link>
    </div>
  );
}
