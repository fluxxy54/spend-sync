Phase 1 — Concept Document

Project: Spend Sync — Finance Analytics Dashboard
Student: Youssef Amr  Matriculation: 4253093

1. Project Type and Objective
- Project type: Finance analytics dashboard (personal finance tracker)
- Objective: Build a responsive web dashboard to view, filter and analyze personal transactions, categories and budgets. The dashboard presents a searchable transaction table and interactive charts for category and monthly summaries, enabling exploration of spending patterns.

2. Key Features (minimum)
- Transaction listing with columns: date, amount, category, description.
- Filters: date range, category, amount range, text search.
- Visualizations: pie chart (expenses by category), bar chart (monthly expenses), line chart (spending trend).
- Add-expense UI (modal) that submits asynchronously to the API without a full page refresh.

3. Data Model (high-level)
- transactions(id, user_id, date, amount, category_id, description, created_at)
- categories(id, name, type, color_hex)
- budgets(id, user_id, category_id, amount, period)

Data flow: Browser → Next.js Route Handlers → Supabase (Postgres) → JSON → frontend charts & table rendering.

4. Technology & Tools
- Frontend: Next.js 16 (App Router), TypeScript, React, Tailwind CSS, UI primitives via shadcn/ui components in `/ui` and presentational components in `/components`.
- Backend: Next.js Route Handlers (server functions) communicating with Supabase (Postgres) using the server-side client in `utils/supabase/server.ts`.
- Visualization: In-repo chart components (`components/bar-chart.tsx`, `components/pie-chart.tsx`, `components/line-chart.tsx`) used instead of an external Chart.js dependency.
- Table: Data table and DataTable-style features implemented at [app/spending/data-table.tsx](app/spending/data-table.tsx#L1).
- Version control: Git + GitHub.

5. Initial Implementation Plan (implemented status)
- Week 1: Scaffolded key UI pages (`/app/spending`, `/app/budget`) and core components; basic data seeding via Add Expense modal — COMPLETE.
- Week 2: Implemented Next.js Route Handlers for categories, transactions and summaries and connected frontend components to these routes — COMPLETE.
- Week 3: Polished UI, added filters and summary metrics; prepared Phase 2 materials — IN PROGRESS / ONGOING.

6. Deliverables for Phase 1
- Updated concept document (this file) and an architecture diagram (optional export).
- Working Git repository with README and implemented example routes and components.

Notes & assumptions
- Single-user demo (no auth required for MVP); data seeded for demo purposes.
- Supabase is the chosen backend for persistence; credentials and deployment are out of scope for Phase 1 deliverable.
- Focus is on a reproducible local development setup and clear README instructions.

Files to check in project (examples)
- [app/spending/data-table.tsx](app/spending/data-table.tsx#L1)
- [components/bar-chart.tsx](components/bar-chart.tsx#L1)
- [components/pie-chart.tsx](components/pie-chart.tsx#L1)
- [utils/supabase/server.ts](utils/supabase/server.ts#L1)

Implemented API endpoints (Next.js Route Handlers)
- `GET /api/category` — returns available categories (used to populate the Add Expense select).
- `POST /api/add-expenses` — accepts JSON payload and inserts a new transaction into `transactions`.
- `GET /api/transactions` — returns transaction records joined with category metadata for display.

Implemented UI features
- Add Expense modal overlay with controlled inputs and asynchronous `fetch()` POST to `/api/add-expenses`.
- Summary module that computes Total Income, Total Expenses and Net Savings from fetched data.

---
End of Phase 1 concept (updated).

---
End of Phase 1 concept (one page).
