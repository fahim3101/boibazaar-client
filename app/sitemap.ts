import { MetadataRoute } from "next";

const BASE_URL = "https://boibazaar-client.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/explore",
    "/about",
    "/contact",
    "/faq",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : ("weekly" as const),
    priority: route === "" ? 1 : route === "/explore" ? 0.9 : 0.6,
  }));

  // Try to include dynamic book pages for SEO
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/books?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const bookRoutes: MetadataRoute.Sitemap =
        data.books?.map((book: { _id: string; updatedAt?: string; createdAt?: string }) => ({
          url: `${BASE_URL}/books/${book._id}`,
          lastModified: new Date(book.updatedAt || book.createdAt || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })) || [];
      return [...staticRoutes, ...bookRoutes];
    }
  } catch {
    // Fallback to static routes if API is unavailable at build time
  }

  return staticRoutes;
}
