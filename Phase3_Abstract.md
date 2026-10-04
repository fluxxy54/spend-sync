# Phase 3 — Final Abstract

Project: SpendSync — Finance Analytics Dashboard

## Introduction

SpendSync is a full-stack financial dashboard designed to help users track spending, understand category performance, and review cash-flow trends through a responsive analytics interface. The project combines modern frontend development, server-side API routes, and a relational data model to showcase how personal finance data can be captured and visualized in a clear, actionable way.

## Method

The application was implemented with Next.js and TypeScript for the front end and API layer, Tailwind CSS for styling, and Recharts for interactive visual exploration. The dashboard includes summary cards, a transaction table, and dedicated budget and spending views. Data is persisted through Supabase/PostgreSQL, while route handlers validate requests before writing records or returning query results.

The data model centers on transactions and categories, with each transaction linked to a category and date. This structure supports both detailed transaction review and aggregated financial insights, such as total income, total expenses, and budget distribution by spending category. By separating UI logic from query logic, the application remains easier to maintain, debug, and extend as new features are added.

## Implementation summary

The dashboard is organized around a few core user journeys. On the home page, users can see summary cards for total income, expenses, and savings and review recent transactions. The spending page offers a sortable, searchable transaction table and supports filtering through the route layer to keep payloads focused and efficient. The budget page visualizes trends over time and compares category-level allocations through charts that update based on the underlying dataset.

A key emphasis during the final phase was cleanup and reliability. Unused or stale code patterns were removed, chart configuration logic was corrected so the visualization layer receives the appropriate shape, and API requests were hardened to reject malformed or unsafe data. These refinements improved both maintainability and the overall user experience.

## Results

The final prototype demonstrates a coherent product flow: a user can add expenses, inspect account summaries, browse transaction history, and analyze spending through visual charts. The interface is responsive across screen sizes and the project is cleanly structured into route, component, and utility folders. Security checks now ensure invalid input is rejected before it reaches the database, while pagination and filtering reduce unnecessary data transfer for larger datasets.

## Reflection

This project reinforced several important lessons about frontend analytics and full-stack design. On the frontend, it became clear that readable dashboards depend not only on data accuracy but also on careful visual hierarchy, spacing, and color usage. On the backend, validation and query discipline were equally important because even a well-designed UI fails when the API accepts unsafe or inconsistent inputs. Working with the relational model also highlighted how a small database schema can be extended for future features such as budgets, recurring expenses, or user-specific accounts.

What worked well was keeping the architecture modular: separate API routes for transactions, summaries, and categories made it easier to debug and evolve the dashboard. The use of reusable chart and table components also reduced duplication and improved consistency. The main challenge was balancing a polished user experience with realistic constraints, especially when local development had to rely on environment configuration and the absence of a production-ready database. This is a common issue in real-world projects, where deployment and data security considerations are often more complex than initial prototypes suggest.

## Future work

The dashboard is already a strong prototype, but several enhancements would make it more production-ready. User authentication would allow personal finance data to be separated by account and protect sensitive information. CSV and PDF export features would support reporting workflows, while server-side pagination and more advanced analytics would scale better as transaction volumes grow. A live deployment on Vercel or another hosting platform would also turn the prototype into a shareable demo and make it easier to validate behavior in a real environment.

## Conclusion

SpendSync successfully demonstrates the full stack: database design, backend APIs, frontend analytics, and responsive presentation. The project not only implements a functional finance dashboard, but also shows a thoughtful design process that considers validation, maintainability, and future growth. The final phase strengthens the prototype into a more polished, reliable, and realistic application, while also clarifying how the project could evolve from a student dashboard into a usable real-world product.
