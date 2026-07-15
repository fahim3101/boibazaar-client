import Link from "next/link";

const faqs = [
  {
    q: "Is it free to list a book?",
    a: "Yes. Creating an account and posting listings on BoiBazaar is completely free.",
  },
  {
    q: "How do I pay for a book?",
    a: "BoiBazaar doesn't process payments. Buyers and sellers meet in person and exchange cash directly.",
  },
  {
    q: "Can I edit a listing after posting it?",
    a: "Not yet — for now you can delete a listing from My Listings and post a fresh one with updated details.",
  },
];

export default function FAQPreview() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <div>
            <span className="stamp-badge border-sage text-sage">Quick answers</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">Frequently asked questions</h2>
          </div>
          <Link href="/faq" className="hidden text-sm font-semibold text-ink hover:text-amber sm:block">
            View all FAQs →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-card border border-paper-dark p-6">
              <h3 className="font-display text-sm font-semibold text-ink">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.a}</p>
            </div>
          ))}
        </div>

        <Link href="/faq" className="mt-6 block text-sm font-semibold text-ink hover:text-amber sm:hidden">
          View all FAQs →
        </Link>
      </div>
    </section>
  );
}
