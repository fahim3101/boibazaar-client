export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  subject: string;
  edition: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Worn";
  price: number;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
  location: string;
  university: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  reviews: Review[];
  avgRating: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  university?: string;
  authProvider?: "local" | "google" | "facebook";
  photoUrl?: string;
  role?: "user" | "admin";
}

export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  pages: number;
}

export const SUBJECTS = [
  "Computer Science",
  "Business Administration",
  "Electrical & Electronic Engineering",
  "Civil Engineering",
  "Economics",
  "Mathematics",
  "Law",
  "English",
  "Medical & Pharmacy",
] as const;

export const CONDITIONS = ["New", "Like New", "Good", "Fair", "Worn"] as const;
