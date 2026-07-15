export default function SkeletonCard() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="h-56 animate-pulse bg-paper-dark" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-paper-dark" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-paper-dark" />
        <div className="h-3 w-full animate-pulse rounded bg-paper-dark" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-paper-dark" />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="h-6 w-14 animate-pulse rounded bg-paper-dark" />
          <div className="h-8 w-24 animate-pulse rounded bg-paper-dark" />
        </div>
      </div>
    </div>
  );
}
