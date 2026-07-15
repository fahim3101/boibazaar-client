import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import Categories from "@/components/sections/Categories";
import HowItWorks from "@/components/sections/HowItWorks";
import StatsSection from "@/components/sections/StatsSection";
import TrustSafety from "@/components/sections/TrustSafety";
import Testimonials from "@/components/sections/Testimonials";
import FAQPreview from "@/components/sections/FAQPreview";
import NewsletterCTA from "@/components/sections/NewsletterCTA";
import { api } from "@/lib/api";
import { Book, BooksResponse } from "@/types";

async function getLandingData() {
  try {
    const data: BooksResponse = await api.getBooks("limit=50&sort=newest");
    return data.books;
  } catch {
    return [] as Book[];
  }
}

export default async function HomePage() {
  const books = await getLandingData();

  const totalBooks = books.length;
  const totalUniversities = new Set(books.map((b) => b.university)).size;
  const avgPrice = totalBooks
    ? Math.round(books.reduce((sum, b) => sum + b.price, 0) / totalBooks)
    : 0;

  const subjectCountMap: Record<string, number> = {};
  books.forEach((b) => {
    subjectCountMap[b.subject] = (subjectCountMap[b.subject] || 0) + 1;
  });
  const subjectCounts = Object.entries(subjectCountMap).map(([subject, count]) => ({
    subject,
    count,
  }));

  return (
    <>
      <Hero />
      <FeaturedBooks books={books} />
      <Categories />
      <HowItWorks />
      <StatsSection
        totalBooks={totalBooks}
        totalUniversities={totalUniversities}
        avgPrice={avgPrice}
        subjectCounts={subjectCounts.length ? subjectCounts : [{ subject: "No data yet", count: 0 }]}
      />
      <TrustSafety />
      <Testimonials />
      <FAQPreview />
      <NewsletterCTA />
    </>
  );
}
