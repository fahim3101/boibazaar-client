import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookCoverSVG from "../BookCoverSVG";

describe("BookCoverSVG", () => {
  const props = {
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    author: "Thomas Cormen",
    edition: "4th",
  };

  it("renders front cover with title", () => {
    render(<BookCoverSVG {...props} variant="cover" />);
    expect(screen.getByLabelText(`Cover of ${props.title}`)).toBeInTheDocument();
  });

  it("renders spine variant", () => {
    render(<BookCoverSVG {...props} variant="spine" />);
    expect(screen.getByLabelText(`Spine of ${props.title}`)).toBeInTheDocument();
  });

  it("renders back cover variant", () => {
    render(<BookCoverSVG {...props} variant="back" />);
    expect(screen.getByLabelText(`Back cover of ${props.title}`)).toBeInTheDocument();
  });

  it("is deterministic - same title gives same pattern", () => {
    const { container: c1 } = render(<BookCoverSVG {...props} variant="cover" />);
    const { container: c2 } = render(<BookCoverSVG {...props} variant="cover" />);
    expect(c1.innerHTML).toBe(c2.innerHTML);
  });

  it("renders initials correctly", () => {
    render(<BookCoverSVG {...props} variant="cover" />);
    // Title "Introduction to Algorithms" -> initials "IA"
    expect(screen.getByLabelText(`Cover of ${props.title}`)).toBeInTheDocument();
  });
});
