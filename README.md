# SpendSync

SpendSync is a lightweight finance analytics dashboard for tracking personal spending, monitoring category performance, and understanding cash-flow trends.

## Key Features

- Transaction overview dashboard with summary cards
- Add-expense form with category selection and date validation
- Searchable and sortable transaction table
- Interactive charts for spending trends and category distribution
- Budget-focused analytics page for monthly and category-level insights
- Server-side validation and defensive API handlers

## Tech Stack

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS
- UI: shadcn/ui components
- Charts: Recharts
- Backend: Next.js Route Handlers (Route API)
- Database: Supabase / PostgreSQL

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (for local dev you can use the free tier)

## Quickstart (local)

1. Install dependencies:

   npm install

2. Create a `.env.local` file at the project root and add your Supabase keys:

   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   # Optional (used by some server handlers): SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

3. Start the development server:

   npm run dev

4. Open the app in your browser:

   http://localhost:3000

## Scripts

- `npm run dev` — starts the Next.js dev server
- `npm run build` — builds the production app
- `npm run start` — serves the built app (after `build`)

Check `package.json` for additional scripts (lint/test/etc.).

## Project layout (high level)

- `app/` — Next.js route pages and API handlers
- `components/` — reusable UI and chart components
- `utils/supabase/` — Supabase client and helpers
- `public/` — static assets

## Notes on security & validation

- API route handlers perform basic validation (amount, date, category, description length) before writing to the database.
- The app expects Supabase env vars to be set; server handlers will throw clear errors if configuration is missing.

## Contributing

Contributions, issues, and feature requests are welcome. Please open a PR or issue describing the change.

## License

This project does not include a license file. Add one if you plan to publish or share the project.
