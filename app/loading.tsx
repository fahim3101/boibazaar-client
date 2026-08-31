import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="container-page py-10">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-paper-dark" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
