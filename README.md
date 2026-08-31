# BoiBazaar — Frontend

> Next.js + TypeScript + Tailwind CSS frontend for **BoiBazaar**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/tests-Vitest%20%7C%20Jest-green?logo=vitest)](https://vitest.dev)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://boibazaar-client.vercel.app)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-90%2B-brightgreen?logo=lighthouse)](https://pagespeed.web.dev/)

Next.js + TypeScript + Tailwind CSS frontend for **BoiBazaar**, a marketplace where university students in Bangladesh buy and sell secondhand textbooks and study materials — built as a full-stack skills-assessment project.

**Live site:** https://boibazaar-client.vercel.app
**Backend repo:** [boibazaar-server](https://github.com/fahim3101/boibazaar-server)
**API:** https://boibazaar-server.vercel.app

## ✨ Features

- Landing page with 8 content sections, including a live stats chart
- Search, filter (subject/condition), sort, and pagination on Explore
- Book details page with a generated cover gallery, reviews, and related items
- Email/password auth **and** Google/Facebook login (Firebase)
- Protected "Sell a Book" and "My Listings" pages
- Admin dashboard for platform-wide moderation
- Fully responsive, skeleton loaders, no external stock images — every book cover is generated in-app from a 3-color design system

## 🧰 Tech Stack

| Layer     | Technology                                                     |
| --------- | -------------------------------------------------------------- |
| Framework | Next.js 14 (App Router)                                        |
| Language  | TypeScript                                                     |
| Styling   | Tailwind CSS                                                   |
| Charts    | Recharts                                                       |
| Auth      | Firebase Authentication (Google/Facebook) + custom JWT session |
| Analytics | Vercel Analytics + Speed Insights                              |
| Testing   | Vitest + Testing Library + jsdom                               |
| Quality   | ESLint + Prettier + Husky + lint-staged                        |

## 📁 Project Structure

```
client/
├── app/                  # Routes (App Router)
│   ├── books/[id]/        # Book details page
│   ├── explore/           # Search/filter/sort/pagination
│   ├── items/add/          # Protected: create listing
│   ├── items/manage/        # Protected: manage own listings
│   ├── admin/               # Admin-only dashboard
│   ├── sitemap.ts           # SEO: dynamic sitemap
│   ├── robots.ts            # SEO: robots.txt
│   ├── manifest.ts          # PWA manifest
│   ├── loading.tsx          # Global loading skeleton
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # 404 page
│   └── login, register, about, contact, faq
├── components/            # Navbar, Footer, BookCard, sections/, etc.
│   └── __tests__/           # Unit tests (Vitest)
├── context/                # AuthContext (session state)
├── lib/                    # API client, Firebase client init
│   └── __tests__/           # API tests
└── types/                   # Shared TypeScript types
```

## 🔐 Environment Variables

`.env.local` fill in:

| Variable                                   | Description                              |
| ------------------------------------------ | ---------------------------------------- |
| `NEXT_PUBLIC_API_URL`                      | Backend API URL + `/api`                 |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | From Firebase Console → Project Settings |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Same                                     |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Same                                     |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Same                                     |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same                                     |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Same                                     |

## 🚀 Local Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the values above
npm run dev                         # runs on http://localhost:3000
```

Make sure the `boibazaar-server` backend is running first — see its README.

## 🧪 Quality & Testing

```bash
npm run lint           # Next.js ESLint (core-web-vitals)
npm run lint:fix       # Auto-fix
npm run format         # Prettier write
npm run format:check   # Prettier check
npm run test           # Vitest watch mode
npm run test:run       # Vitest single run (CI)
npm run test:coverage  # Coverage report
```

- **Husky pre-commit:** `lint-staged` runs `eslint --fix` + `prettier --write` on staged files.
- **Tests:** 18 tests covering `BookCard`, `BookCoverSVG`, and `api` client (see `vitest.config.ts`).

## 📈 Analytics & SEO

- **Vercel Analytics** + **Speed Insights** integrated in `app/layout.tsx` — view Web Vitals in Vercel dashboard.
- **SEO:** `metadataBase`, `openGraph`, `twitter`, `robots`, canonical URLs in `layout.tsx`; dynamic `sitemap.ts` (fetches `/books?limit=100`) + `robots.ts` + `manifest.ts`.
- **PWA:** `manifest.ts` with theme `#1B2A4A` / background `#F6F4EF` for installability.
- **Lighthouse:** Tested locally with `npm run build && npm start` → Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO). Run via Chrome DevTools → Lighthouse or `npx lighthouse http://localhost:3000 --view`.

## 📄 Pages

| Route                        | Access     | Description                           |
| ---------------------------- | ---------- | ------------------------------------- |
| `/`                          | Public     | Landing page                          |
| `/explore`                   | Public     | Search, filter, sort, paginate books  |
| `/books/[id]`                | Public     | Book details, reviews, related items  |
| `/login`, `/register`        | Public     | Auth, including Google/Facebook       |
| `/items/add`                 | Private    | Post a new listing                    |
| `/items/manage`              | Private    | View/delete your own listings         |
| `/admin`                     | Admin only | Moderate all listings, view all users |
| `/about`, `/contact`, `/faq` | Public     | Informational pages                   |

## 🔑 Demo Credentials

| Role    | Email                 | Password     |
| ------- | --------------------- | ------------ |
| Student | `demo@boibazaar.com`  | `Demo1234!`  |
| Admin   | `admin@boibazaar.com` | `Admin1234!` |

_(Run `npm run seed` in the backend project first to create these accounts.)_

## ☁️ Deployment (Vercel)

1. Push this repo to GitHub, import it at [vercel.com/new](https://vercel.com/new)
2. Add all environment variables listed above
3. Deploy — Vercel auto-detects Next.js, Analytics and Speed Insights are enabled automatically
4. In Firebase Console → Authentication → Settings → **Authorized domains**, add your Vercel domain, or social login will fail on the live site

## 👤 Author

Built by **MD Fahim Rana** — [GitHub](https://github.com/fahim3101) · [LinkedIn](https://linkedin.com/in/fahim-rana)
