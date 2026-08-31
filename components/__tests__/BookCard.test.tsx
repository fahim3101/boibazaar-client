import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookCard from "../BookCard";
import { Book } from "@/types";

const mockBook: Book = {
  _id: "test123",
  title: "Calculus: Early Transcendentals",
  author: "James Stewart",
  subject: "Mathematics",
  edition: "8th",
  condition: "Good",
  price: 850,
  shortDescription: "Well-maintained copy with minimal highlights.",
  fullDescription: "Detailed description of the book with all chapters intact.",
  imageUrl: "",
  location: "Dhaka",
  university: "University of Dhaka",
  sellerId: "seller123",
  sellerName: "Fahim Rana",
  sellerEmail: "demo@boibazaar.com",
  reviews: [],
  avgRating: 4.5,
  createdAt: "2024-01-15T10:00:00.000Z",
};

describe("BookCard", () => {
  it("renders book title and subject", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByRole("heading", { name: mockBook.title })).toBeInTheDocument();
    expect(screen.getByText(mockBook.subject)).toBeInTheDocument();
  });

  it("renders price with Taka symbol", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText(`৳${mockBook.price}`)).toBeInTheDocument();
  });

  it("renders condition and location", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText(mockBook.condition)).toBeInTheDocument();
    expect(screen.getByText(mockBook.location)).toBeInTheDocument();
  });

  it("renders short description", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText(mockBook.shortDescription)).toBeInTheDocument();
  });

  it("renders rating when avgRating > 0", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText(/★ 4.5/)).toBeInTheDocument();
  });

  it("does not render rating when avgRating is 0", () => {
    const bookNoRating = { ...mockBook, avgRating: 0 };
    render(<BookCard book={bookNoRating} />);
    expect(screen.queryByText(/★/)).not.toBeInTheDocument();
  });

  it("has link to book details page", () => {
    render(<BookCard book={mockBook} />);
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", `/books/${mockBook._id}`);
  });

  it("renders generated SVG cover when no imageUrl", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByLabelText(`Cover of ${mockBook.title}`)).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const bookWithImage = { ...mockBook, imageUrl: "https://example.com/cover.jpg" };
    render(<BookCard book={bookWithImage} />);
    const img = screen.getByAltText(`Cover of ${mockBook.title}`);
    expect(img).toHaveAttribute("src", bookWithImage.imageUrl);
  });
});
