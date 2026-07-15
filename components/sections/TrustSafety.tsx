const points = [
  {
    title: "Verified student accounts",
    description: "Every seller signs up with a real email and profile before posting a listing.",
  },
  {
    title: "Meet on your own campus",
    description: "We recommend exchanging books in public campus spots — no shipping, no risk.",
  },
  {
    title: "Inspect before you pay",
    description: "Check the book's condition in person before handing over any money.",
  },
  {
    title: "Rated by real students",
    description: "Reviews on each listing help you gauge a seller's reliability before you meet.",
  },
];

export default function TrustSafety() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <span className="stamp-badge border-sage text-sage">Peace of mind</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink">Built for safe, campus-based trades</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="rounded-card border border-paper-dark p-6">
              <div className="mb-3 h-8 w-8 rounded-full bg-sage/15 text-center font-display text-sm font-bold leading-8 text-sage">
                ✓
              </div>
              <h3 className="font-display text-base font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
