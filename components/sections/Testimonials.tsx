const testimonials = [
  {
    name: "Rafid Hasan",
    role: "CSE, BUET",
    quote:
      "Sold three semesters worth of textbooks in a week. Way faster than posting in random Facebook groups.",
  },
  {
    name: "Nusrat Jahan",
    role: "BBA, North South University",
    quote:
      "Found a like-new Mankiw copy for half the bookstore price. The seller was a senior from my own department.",
  },
  {
    name: "Tanvir Ahmed",
    role: "EEE, IUT",
    quote:
      "The condition tags and photos on each listing meant no surprises when I met the seller on campus.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-paper py-16">
      <div className="container-page">
        <span className="stamp-badge border-amber text-amber-dark">From the community</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink">What students are saying</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-card bg-white p-6 shadow-card">
              <p className="font-display text-3xl leading-none text-amber">&ldquo;</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.quote}</p>
              <div className="mt-5 border-t border-paper-dark pt-4">
                <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink/50">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
