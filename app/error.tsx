"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="stamp-badge border-amber text-amber">Oops!</span>
      <h2 className="mt-4 font-display text-2xl font-bold text-ink">Something went wrong</h2>
      <p className="mt-2 max-w-md text-sm text-ink/60">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-card bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-amber hover:text-ink"
      >
        Try again
      </button>
    </div>
  );
}
