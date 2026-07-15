# BoiBazaar — Frontend

Next.js + TypeScript + Tailwind CSS frontend for **BoiBazaar**, a marketplace
where university students in Bangladesh buy and sell secondhand textbooks
and study materials — built as a full-stack skills-assessment project.

**Live site:** https://boibazaar-client.vercel.app
**Backend repo:** [boibazaar-server](https://github.com/fahim3101/boibazaar-server)

## Features

- Landing page with 8 content sections, including a live stats chart
- Search, filter (subject/condition), sort, and pagination on Explore
- Book details page with a generated cover gallery, reviews, and related items
- Email/password auth **and** Google/Facebook login (Firebase)
- Protected "Sell a Book" and "My Listings" pages
- Admin dashboard for platform-wide moderation
- Fully responsive, skeleton loaders, no external stock images —
  every book cover is generated in-app from a 3-color design system

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Auth | Firebase Authentication (Google/Facebook) + custom JWT session |

## Project Structure

```
client/
├── app/                  # Routes (App Router)
│   ├── books/[id]/        # Book details page
│   ├── explore/           # Search/filter/sort/pagination
│   ├── items/add/          # Protected: create listing
│   ├── items/manage/        # Protected: manage own listings
│   ├── admin/               # Admin-only dashboard
│   └── login, register, about, contact, faq
├── components/            # Navbar, Footer, BookCard, sections/, etc.
├── context/                # AuthContext (session state)
├── lib/                    # API client, Firebase client init
└── types/                   # Shared TypeScript types
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL + `/api` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase Console → Project Settings |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Same |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same |

## Local Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the values above
npm run dev                         # runs on http://localhost:3000
```

Make sure the `boibazaar-server` backend is running first — see its README.

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/explore` | Public | Search, filter, sort, paginate books |
| `/books/[id]` | Public | Book details, reviews, related items |
| `/login`, `/register` | Public | Auth, including Google/Facebook |
| `/items/add` | Private | Post a new listing |
| `/items/manage` | Private | View/delete your own listings |
| `/admin` | Admin only | Moderate all listings, view all users |
| `/about`, `/contact`, `/faq` | Public | Informational pages |

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Student | `demo@boibazaar.com` | `Demo1234!` |
| Admin | `admin@boibazaar.com` | `Admin1234!` |

*(Run `npm run seed` in the backend project first to create these accounts.)*

## Deployment (Vercel)

1. Push this repo to GitHub, import it at [vercel.com/new](https://vercel.com/new)
2. Add all environment variables listed above
3. Deploy — Vercel auto-detects Next.js
4. In Firebase Console → Authentication → Settings → **Authorized domains**,
   add your Vercel domain, or social login will fail on the live site

## Author
Built by **MD Fahim Rana** — [GitHub](https://github.com/fahim3101) · [LinkedIn](https://linkedin.com/in/fahim-rana)