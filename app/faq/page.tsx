"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is it free to list a book?",
    a: "Yes. Creating an account and posting listings on BoiBazaar is completely free, with no hidden fees.",
  },
  {
    q: "How do I pay for a book?",
    a: "BoiBazaar doesn't process any payments. Buyers and sellers agree on a price and meet in person to exchange cash and the book directly.",
  },
  {
    q: "Where should I meet the seller?",
    a: "We recommend meeting in a public spot on or near campus — a library, canteen, or department building are all good choices.",
  },
  {
    q: "Can I edit a listing after posting it?",
    a: "Not yet. For now, delete the listing from your My Listings page and create a fresh one with the updated details.",
  },
  {
    q: "What if a seller doesn't respond?",
    a: "Reach out to them directly using the email shown on their listing. If they're unresponsive after a few days, look for another copy in Explore.",
  },
  {
    q: "Can I sell notes or study guides, not just textbooks?",
    a: "Yes — any study material is welcome. Just describe it clearly in the title and description so buyers know exactly what they're getting.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container-page max-w-3xl py-14">
      <span className="stamp-badge border-amber text-amber-dark">Help center</span>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">Frequently asked questions</h1>
      <p className="mt-3 text-ink/60">Everything you need to know about buying and selling on BoiBazaar.</p>

      <div className="mt-8 space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="overflow-hidden rounded-card bg-white shadow-card">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-display font-semibold text-ink">{faq.q}</span>
              <span className="font-mono text-lg text-amber-dark">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
