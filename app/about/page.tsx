const values = [
  {
    title: "Built by a student",
    description:
      "BoiBazaar started as a way to solve a problem every student in Bangladesh knows well — overpaying for textbooks that get used once and then sit on a shelf.",
  },
  {
    title: "Campus-first",
    description:
      "No shipping, no delivery fees. Every exchange happens face-to-face on or near campus, keeping things simple and low-cost.",
  },
  {
    title: "Community-rated",
    description:
      "Reviews on every listing help students trust each other and build a reliable secondhand book economy.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-14">
      <span className="stamp-badge border-amber text-amber-dark">Our story</span>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">About BoiBazaar</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
        BoiBazaar is a marketplace built specifically for university students in
        Bangladesh to buy and sell secondhand textbooks and study materials.
        New textbooks are expensive and often used for only a single semester —
        BoiBazaar makes it easy to pass them on to the next student who needs them,
        at a price that actually makes sense.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-card bg-white p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-card bg-ink p-8 text-paper">
        <h2 className="font-display text-2xl font-bold">Why I built this</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-paper/70">
          As a student myself, I spent every semester scrolling through scattered
          Facebook groups trying to find secondhand copies of required textbooks.
          BoiBazaar brings that scattered process into one organized, searchable
          place — built with the same tools I use to learn full-stack development.
        </p>
      </div>
    </div>
  );
}
