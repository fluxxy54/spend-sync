# SpendSync

SpendSync is a finance analytics dashboard for tracking personal spending, monitoring category performance, and understanding cash-flow trends through a responsive web interface.

## Features

- Transaction overview dashboard with summary cards
- Add-expense form with category selection and date validation
- Searchable and sortable transaction table
- Interactive charts for spending trends and category distribution
- Budget-focused analytics page for monthly and category-level insights
- Secure server-side validation before writing to the database

## Stack

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS
- UI system: shadcn/ui components
- Data viz: Recharts
- Backend: Next.js Route Handlers
- Persistence: Supabase + PostgreSQL

## Local setup

1. Install dependencies:
   npm install
2. Configure Supabase environment variables in a local .env file:
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
3. Start the app:
   npm run dev
4. Open http://localhost:3000

## Project structure

- app/ — route pages and API handlers
- components/ — reusable dashboard and chart UI
- utils/supabase/ — Supabase server client configuration
- public/ — static assets

## Security and quality checks

- API input validation for amount, date, category ID, and description length
- Environment guard to fail clearly when Supabase is not configured
- Defensive handling for missing database data or failed API requests
- Pagination and filtering on transaction fetches to reduce unnecessary payload sizes

## Future enhancements

- User authentication and per-user accounts
- CSV/PDF export for transaction reports
- Server-side filtering, pagination, and analytics for larger data sets
- Hosted deployment with Vercel or another production environment
- Budget alerts and recurring-expense automation
