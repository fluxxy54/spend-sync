Phase 2 — Development Presentation (up to 10 slides) — Notes and Slide Content

Project: Spend Sync — Finance Analytics Dashboard
Student: [Your Name]  Matriculation: [Matr.-No.]

Slide 1 — Title

- Spend Sync — Finance Analytics Dashboard
- Student: [Your Name]
- GitHub: (see GitHubLink.txt)

Slide 2 — Project Summary

- Short description: Transaction table + visualizer charts. Stack: Next.js, Supabase, Tailwind, Chart.js.
- Goals for Phase 2: working transaction list, API endpoints, interactive charts.

Slide 3 — Architecture Diagram

- Browser ↔ Next.js API routes ↔ Supabase (Postgres)
- Notes: APIs: `/api/transactions`, `/api/category-summary`, `/api/monthly-summary`

Slide 4 — Data Model (ERD)

- tables: transactions, categories, budgets
- relationships: transactions.category_id → categories.id

Slide 5 — Transaction Table (Screenshot)

- Include screenshot(s) of `app/spending/data-table.tsx` showing filters, search, and pagination.

Slide 6 — Visualizations (Screenshots)

- Pie chart: expenses by category
- Bar chart: monthly expenses
- Line chart: spending over time

Slide 7 — Backend APIs

- Implemented endpoints: `/api/transactions` (list, filter), `/api/summary/categories`, `/api/summary/monthly`
- Notes on SQL: GROUP BY `date_trunc('month', date)` for monthly aggregation

Slide 8 — Features Implemented

- Transaction list with sorting/search
- Charts connected to seeded data
- Basic add-expense UI (local or via API)

Slide 9 — Challenges & Decisions

- Switched from server-side DataTables to client-side table for simplicity
- Seeded data used due to no remote DB credentials in repo

Slide 10 — Current Status & Next Steps

- What works: UI, charts, basic APIs (mocked/seeded)
- Next: integrate real DB, add authentication, deploy demo, export CSV

Appendix: Screenshots and commands to run locally

- `npm install`
- `npm run dev`

---
End of Phase 2 presentation notes (use to export slides as PDF).
