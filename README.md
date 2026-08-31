<p align="center">
  <h1 align="center">📚 BoiBazaar — Frontend</h1>
  <p align="center">A student-to-student marketplace for secondhand textbooks across Bangladeshi universities</p>
  <p align="center">
    <em>Buy low, sell fast, study smarter — your next textbook is already on someone's shelf.</em>
  </p>
</p>

<p align="center">
  <a href="https://boibazaar-client.vercel.app"><img src="https://img.shields.io/badge/Live%20Site-BoiBazaar-1B2A4A?style=for-the-badge&logo=vercel" alt="Live Site" /></a>
  <a href="https://github.com/fahim3101/boibazaar-server"><img src="https://img.shields.io/badge/API-BoiBazaar%20Server-E8A33D?style=for-the-badge&logo=express" alt="API" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Tests-Vitest%20%7C%20TL-green?logo=vitest" alt="Tests" />
  <img src="https://img.shields.io/badge/Lighthouse-90%2B-brightgreen?logo=lighthouse" alt="Lighthouse" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" alt="Vercel" />
</p>

<p align="center">
  <a href="https://boibazaar-client.vercel.app">🌐 Live Demo</a> •
  <a href="https://boibazaar-server.vercel.app">🔗 Live API</a> •
  <a href="https://github.com/fahim3101/boibazaar-server">⚙️ Backend Repo</a>
</p>

---

## 📸 Preview

> No external stock images — every cover is generated in-app via `BookCoverSVG` (ink / amber / sage / paper palette, 6 deterministic patterns).

| Landing (8 sections) | Explore + Filters                                | Book Details (Gallery)             |
| -------------------- | ------------------------------------------------ | ---------------------------------- |
| Hero + Stats + Trust | Search / subject / condition / sort / pagination | Cover spine/back, reviews, related |

<!-- Replace with real screenshots after deploy -->
<!-- ![Landing](docs/screenshots/landing.png) -->
<!-- ![Explore](docs/screenshots/explore.png) -->
<!-- ![Details](docs/screenshots/details.png) -->

---

## ✨ Features

- 🏠 **Landing page** — Hero + 8 sections (Featured, Categories, HowItWorks, Stats with Recharts, TrustSafety, Testimonials, FAQ, Newsletter)
- 🔍 **Explore** — Search (title/author/subject), filter `subject`/`condition`, sort `newest/price/rating`, pagination
- 📖 **Book details** — Generated cover gallery (`cover | spine | back`), reviews & ratings, related books
- 🔐 **Auth** — Email/password + Google/Facebook via Firebase, JWT session, protected routes
- 📦 **Seller flows** — `Sell a Book` (protected) + `My Listings` (delete own)
- 🛡️ **Admin** — Moderation dashboard (all books/users, delete any listing)
- 📱 **Fully responsive** + skeleton loaders (`loading.tsx`), error boundary (`error.tsx`), custom 404 (`not-found.tsx`)

---

## 🧭 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Local Setup](#-local-setup)
- [Quality & Testing](#-quality--testing)
- [Analytics & SEO](#-analytics--seo)
- [Pages](#-pages)
- [Demo Credentials](#-demo-credentials)
- [Deployment](#️-deployment)
- [Author](#-author)

---

## 🧰 Tech Stack

| Layer     | Technology                                                     |
| --------- | -------------------------------------------------------------- |
| Framework | Next.js 14 (App Router)                                        |
| Language  | TypeScript                                                     |
| Styling   | Tailwind CSS (`ink #1B2A4A / amber #E8A33D / sage #3F6659`)    |
| Charts    | Recharts                                                       |
| Auth      | Firebase Authentication (Google/Facebook) + custom JWT session |
| Analytics | Vercel Analytics + Speed Insights (`app/layout.tsx`)           |
| Testing   | Vitest + Testing Library + jsdom (18 tests)                    |
| Quality   | ESLint (next/core-web-vitals) + Prettier + Husky + lint-staged |

---

## 📁 Project Structure

```
client/
├── app/
│   ├── books/[id]/        # Book details (cover gallery, reviews, related)
│   ├── explore/           # Search / filter / sort / pagination
│   ├── items/add/          # Protected: create listing
│   ├── items/manage/        # Protected: my listings
│   ├── admin/               # Admin-only dashboard
│   ├── sitemap.ts           # SEO: dynamic sitemap (revalidate 3600)
│   ├── robots.ts            # SEO: robots.txt (disallow /admin, /items)
│   ├── manifest.ts          # PWA manifest (theme #1B2A4A)
│   ├── loading.tsx          # Global skeleton (SkeletonCard x8)
│   ├── error.tsx            # Error boundary (Try again)
│   ├── not-found.tsx        # 404 (Go back home)
│   └── about, contact, faq, login, register
├── components/
│   ├── BookCard.tsx / BookCoverSVG.tsx / Hero.tsx / Navbar.tsx / Footer.tsx
│   ├── sections/            # FeaturedBooks, Categories, HowItWorks, Stats, etc.
│   └── __tests__/           # Vitest (BookCard 9, BookCoverSVG 5)
├── context/AuthContext.tsx  # Session state
├── lib/
│   ├── api.ts               # Typed fetch wrapper
│   ├── firebase.ts
│   └── __tests__/api.test.ts (4 tests)
└── types/index.ts
```

---

## 🔐 Environment Variables

Create `.env.local` in `client/`:

```bash
NEXT_PUBLIC_API_URL=https://boibazaar-server.vercel.app/api
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

| Variable                 | Where to get                                                       |
| ------------------------ | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`    | Your deployed `boibazaar-server` URL + `/api`                      |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project Settings → General → Your apps → Config |

> See `.env.local.example` if present, else copy the table above.

---

## 🚀 Local Setup

```bash
# 1. Install
npm install

# 2. Env (client)
cp .env.local.example .env.local  # or create manually (table above)

# 3. Run backend first (in ../server)
# npm run dev  -> http://localhost:5000

# 4. Run frontend
npm run dev     # http://localhost:3000

# 5. Build check
npm run build && npm start
```

---

## 🧪 Quality & Testing

```bash
npm run lint           # Next ESLint (core-web-vitals) - must be clean
npm run lint:fix       # Auto-fix
npm run format         # Prettier write (semi, singleQuote off, 100 cols)
npm run format:check   # CI check
npm run test           # Vitest watch
npm run test:run       # Single run (CI) - 18 passed
npm run test:coverage  # Coverage report
```

- **Husky pre-commit** (`.husky/pre-commit`) → `lint-staged` runs `eslint --fix` + `prettier --write` on staged `*.{ts,tsx}` before every commit. No bad code reaches GitHub.
- **Config:** `vitest.config.ts` (`jsdom`, `alias @`, `jsx automatic`), `vitest.setup.ts` (`@testing-library/jest-dom`).

---

## 📈 Analytics & SEO

**Analytics:** `app/layout.tsx:7` imports `<Analytics />` + `<SpeedInsights />` — view Core Web Vitals (LCP, CLS, INP) in Vercel Dashboard → Analytics. Server side is complemented by `morgan` tiny logging in `boibazaar-server`.

**SEO:**

- `metadataBase` + `openGraph` + `twitter` + `robots` + `canonical` in `layout.tsx`
- Dynamic `sitemap.ts` fetches `GET /books?limit=100` at build (`revalidate 3600`)
- `robots.ts` → `Allow: /`, `Disallow: /admin,/items/manage,/items/add`
- `manifest.ts` → PWA installable (`display: standalone`, `background #F6F4EF`)
- Lighthouse 90+ (Performance / Accessibility / Best Practices / SEO) — run: Chrome DevTools → Lighthouse or `npx lighthouse http://localhost:3000 --view`

**Perf tweaks:** `next.config.js:3` (`reactStrictMode`, `compress`, `poweredByHeader:false`), `images.remotePatterns` wildcard, `container-page` max `1280px`, `stamp-badge` / `perforated-top` CSS for brand feel without extra images.

---

## 📄 Pages

| Route                        | Access     | Description                        |
| ---------------------------- | ---------- | ---------------------------------- |
| `/`                          | Public     | Landing (8 sections + live stats)  |
| `/explore`                   | Public     | Search, filter, sort, paginate     |
| `/books/[id]`                | Public     | Details, gallery, reviews, related |
| `/login`, `/register`        | Public     | Email + Google/Facebook            |
| `/items/add`                 | Private    | Post a new listing (auth guard)    |
| `/items/manage`              | Private    | My listings → delete own           |
| `/admin`                     | Admin only | All books + users → moderate       |
| `/about`, `/contact`, `/faq` | Public     | Informational (SEO static)         |

---

## 🔑 Demo Credentials

Seed first in backend: `npm run seed` (in `server/`)

| Role    | Email                 | Password     | Access                |
| ------- | --------------------- | ------------ | --------------------- |
| Student | `demo@boibazaar.com`  | `Demo1234!`  | Sell / buy / review   |
| Admin   | `admin@boibazaar.com` | `Admin1234!` | + `/admin` moderation |

> Tip: Use `demo` to create a listing, then login as `admin` to see it in admin panel and delete it.

---

## ☁️ Deployment (Vercel)

1. Push to GitHub → Import at [vercel.com/new](https://vercel.com/new) (auto-detects Next.js)
2. **Environment Variables** → Add all `NEXT_PUBLIC_*` from table above
3. Deploy → Analytics + Speed Insights enabled automatically (no extra config)
4. **Firebase fix:** Firebase Console → Authentication → Settings → Authorized domains → Add `your-vercel-domain.vercel.app` or social login fails on live site

---

## 🛠️ Scripts at a Glance

| Script   | What it does                                      |
| -------- | ------------------------------------------------- |
| `dev`    | `next dev` on `:3000`                             |
| `build`  | `next build` (16 routes: `○` static, `ƒ` dynamic) |
| `start`  | `next start` prod                                 |
| `lint`   | `next lint`                                       |
| `format` | `prettier --write .`                              |
| `test`   | `vitest` watch                                    |

---

## 👤 Author

<p align="center">
  <strong>MD Fahim Rana</strong><br/>
  <a href="https://github.com/fahim3101">GitHub</a> • <a href="https://linkedin.com/in/fahim-rana">LinkedIn</a> • <a href="mailto:fahimrana3101@gmail.com">fahimrana3101@gmail.com</a><br/>
  Dhaka, Bangladesh
</p>

<p align="center">
  <em>If you like this project, please ⭐ star the repo — it helps a lot!</em>
</p>

---

> **Crafted for Bangladeshi students.** BoiBazaar connects Dhaka · Chattogram · Sylhet · Rajshahi — one shelf at a time.
