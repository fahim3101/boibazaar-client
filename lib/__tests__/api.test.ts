import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { api } from "../api";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("api client", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:5000/api";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("getBooks fetches with query string", async () => {
    const mockData = { books: [], total: 0, page: 1, pages: 1 };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const data = await api.getBooks("search=calculus&subject=Mathematics");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/books?search=calculus&subject=Mathematics"),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(data).toEqual(mockData);
  });

  it("throws error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Unauthorized" }),
    } as Response);

    await expect(api.getBooks("")).rejects.toThrow("Unauthorized");
  });

  it("sends Authorization header when token is provided", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ books: [] }),
    } as Response);

    await api.getMyBooks("test-token-123");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token-123",
        }),
      })
    );
  });

  it("createBook sends POST with payload", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ book: { _id: "new123" } }),
    } as Response);

    const payload = {
      title: "Test Book",
      author: "Test Author",
      subject: "Mathematics",
      condition: "Good",
      price: 500,
      shortDescription: "Short",
      fullDescription: "Full",
      location: "Dhaka",
      university: "DU",
    };

    await api.createBook(payload, "token-xyz");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/books"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
      })
    );
  });
});
