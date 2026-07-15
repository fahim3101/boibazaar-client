# BoiBazaar Client (Frontend)

Next.js 14 + TypeScript + Tailwind CSS frontend for BoiBazaar, a used textbook
exchange platform for university students in Bangladesh.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Recharts (stats chart on the landing page)

## Local Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.local.example` to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```
   Set `NEXT_PUBLIC_API_URL` to your backend's URL (e.g. `http://localhost:5000/api`
   for local dev, or your deployed Vercel API URL in production).

   Also fill in the `NEXT_PUBLIC_FIREBASE_*` values from your Firebase project
   (Console → Project Settings → General → Your apps → Web app) to enable
   Google/Facebook login. See the main setup guide for full steps.

3. Run the dev server:
   ```
   npm run dev
   ```
   App runs at http://localhost:3000

Make sure the `boibazaar-server` backend is running (see its own README) before
using login, register, explore, or listings features.

## Pages

| Route              | Access    | Description                          |
|---------------------|-----------|----------------------------------------|
| /                   | Public    | Landing page                          |
| /explore            | Public    | Search, filter, sort, paginate books   |
| /books/[id]          | Public    | Book details, reviews, related items   |
| /login, /register    | Public    | Auth pages                            |
| /items/add           | Private   | Post a new listing                    |
| /items/manage        | Private   | View/delete your own listings          |
| /admin                | Admin     | Moderate all listings and view all users |
| /about, /contact, /faq | Public  | Informational pages                   |

## Deploying to Vercel

1. Push this folder to its own GitHub repo (e.g. `boibazaar-client`).
2. Go to https://vercel.com/new and import that repo.
3. In the Vercel project settings, add Environment Variables:
   - `NEXT_PUBLIC_API_URL` — your deployed backend URL + `/api`, e.g.
     `https://boibazaar-server.vercel.app/api`
   - All six `NEXT_PUBLIC_FIREBASE_*` values from your `.env.local`
4. Deploy. Vercel auto-detects Next.js — no extra config needed.
5. Your site will be live at `https://your-project-name.vercel.app`
6. Back in the Firebase Console, add this Vercel domain (and localhost) under
   **Authentication → Settings → Authorized domains**, or Google/Facebook
   login popups will fail on the live site.

## Demo Credentials
- Student account — Email: `demo@boibazaar.com` / Password: `Demo1234!`
- Admin account — Email: `admin@boibazaar.com` / Password: `Admin1234!` (shows an extra "Admin Panel" link in the navbar, at `/admin`)

(Run `npm run seed` in the server project first to create these accounts.)
