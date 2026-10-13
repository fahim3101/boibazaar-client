const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Vercel serverless cold starts can be slow; fail fast instead of hanging SSR.
const FETCH_TIMEOUT_MS = 10000;

interface FetchOptions extends RequestInit {
  token?: string | null;
}

async function apiFetch(path: string, options: FetchOptions = {}) {
  const { token, headers, ...rest } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      cache: "no-store",
    });
  } catch (error: any) {
    if (error?.name === "AbortError") {
      throw new Error(`Request timed out after ${FETCH_TIMEOUT_MS / 1000}s. Please try again.`);
    }
    throw new Error("Could not reach the server. Please check your connection and try again.");
  } finally {
    clearTimeout(timeout);
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}. Please try again.`);
  }

  return data;
}

export const api = {
  register: (payload: {
    name: string;
    email: string;
    password: string;
    university?: string;
    phone?: string;
  }) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(payload) }),

  login: (payload: { email: string; password: string }) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify(payload) }),

  socialLogin: (idToken: string) =>
    apiFetch("/auth/social", { method: "POST", body: JSON.stringify({ idToken }) }),

  getMe: (token: string) => apiFetch("/auth/me", { token }),

  getBooks: (queryString: string) => apiFetch(`/books?${queryString}`),

  getBookById: (id: string) => apiFetch(`/books/${id}`),

  getMyBooks: (token: string) => apiFetch("/books/mine", { token }),

  createBook: (payload: Record<string, unknown>, token: string) =>
    apiFetch("/books", { method: "POST", body: JSON.stringify(payload), token }),

  deleteBook: (id: string, token: string) => apiFetch(`/books/${id}`, { method: "DELETE", token }),

  addReview: (
    id: string,
    payload: { rating: number; comment: string; userName: string },
    token: string
  ) => apiFetch(`/books/${id}/reviews`, { method: "POST", body: JSON.stringify(payload), token }),

  getAdminStats: (token: string) => apiFetch("/admin/stats", { token }),

  getAllBooksAdmin: (token: string) => apiFetch("/admin/books", { token }),

  getAllUsersAdmin: (token: string) => apiFetch("/admin/users", { token }),

  adminDeleteBook: (id: string, token: string) =>
    apiFetch(`/admin/books/${id}`, { method: "DELETE", token }),
};
