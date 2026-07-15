const steps = [
  {
    number: "01",
    title: "List your book",
    description:
      "Add your textbook's title, condition, and price in under two minutes. No fees to post.",
  },
  {
    number: "02",
    title: "Get discovered",
    description:
      "Students searching your subject or university see your listing right away in Explore.",
  },
  {
    number: "03",
    title: "Chat and agree",
    description:
      "Reach out using the seller's contact details on the listing page and agree on a meeting spot.",
  },
  {
    number: "04",
    title: "Meet and exchange",
    description:
      "Meet on campus or nearby, check the book, hand over the cash. Simple as that.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-ink py-16 text-paper">
      <div className="container-page">
        <span className="stamp-badge border-amber text-amber">The process</span>
        <h2 className="mt-3 font-display text-3xl font-bold">How BoiBazaar works</h2>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <span className="font-display text-4xl font-bold text-amber/40">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-6 hidden h-px w-8 bg-amber/30 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
