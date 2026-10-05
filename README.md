# SpendSync

SpendSync is a lightweight finance analytics dashboard for tracking personal spending, monitoring category performance, and understanding cash-flow trends.

🌐 **Live Demo:** [https://spend-sync.ya9423561.workers.dev/](https://spend-sync.ya9423561.workers.dev/)

---

## Key Features

- Transaction overview dashboard with summary cards
- Add-expense form with category selection and date validation
- Searchable and sortable transaction table
- Interactive charts for spending trends and category distribution
- Budget-focused analytics page for monthly and category-level insights
- Server-side validation and defensive API handlers

## Tech Stack

- **Frontend & Fullstack Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Runtime & Deployment:** Cloudflare Workers via [Vinext](https://vinext.dev/) & `@cloudflare/vite-plugin`
- **UI & Components:** shadcn/ui, Base UI, Lucide React
- **Charts:** Recharts
- **Database:** Supabase / PostgreSQL
- **Tooling:** Vite, Wrangler

## Prerequisites

- Node.js 20+ and npm
- A Supabase project (for local dev you can use the free tier)
- A Cloudflare account (for deployment)

## Quickstart (Local)

1. Clone and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file at the project root and add your Supabase keys:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   # Optional: SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Or run with Vite/Vinext:

   ```bash
   npm run dev:vinext
   ```

4. Open the app in your browser at `http://localhost:3000` (or `http://localhost:3001` for Vinext).

## Scripts

- `npm run dev` — Starts the Next.js development server
- `npm run dev:vinext` — Starts the Vite/Vinext development server (port 3001)
- `npm run build` — Builds the production app for Cloudflare Workers using Vinext/Vite
- `npm run build:next` — Builds the standard Next.js production bundle
- `npm run deploy` — Deploys the built worker and assets to Cloudflare Workers via Wrangler
- `npm run lint` — Runs ESLint

## Deployment to Cloudflare Workers

SpendSync is configured to deploy directly to **Cloudflare Workers** using **Vinext** and **Wrangler**:

1. **Configuration:**
   - Worker entrypoint and assets are configured in [`wrangler.jsonc`](./wrangler.jsonc).
   - Vite environment build settings are managed in [`vite.config.ts`](./vite.config.ts).

2. **Cloudflare Dashboard (Workers Builds):**
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`

3. **Environment Variables:**
   Add the following under **Worker Settings > Variables and Secrets**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Project Layout

- `app/` — Next.js App Router pages and API handlers
- `components/` — Reusable UI, forms, and chart components
- `components/ui/` — shadcn/ui primitive components
- `utils/supabase/` — Supabase server and client initialization
- `public/` — Static assets (SVGs and icons)
- `wrangler.jsonc` — Cloudflare Worker and asset bindings configuration
- `vite.config.ts` — Vite & Vinext Cloudflare bundler configuration

## License

This project is licensed under the MIT License.
