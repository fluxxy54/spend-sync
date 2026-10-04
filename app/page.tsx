"use client";

import { useEffect, useState } from "react";
import { ChartBarInteractive } from "@/components/bar-chart";
import { ChartPie } from "@/components/pie-chart";
import { SectionCard } from "@/components/section-cards";
import type { ChartConfig } from "@/components/ui/chart";
import { columns, type Transaction } from "./spending/columns";
import { DataTable } from "./spending/data-table";
import { AddButton } from "@/components/AddExpenses";

type PieChartItem = {
  category_name: string;
  total_spent: number;
  color_hex: string;
  fill: string;
};

const defaultSummary = {
  totalEarning: 0,
  totalIncome: 0,
  totalExpense: 0,
  totalSaving: 0,
};

type DashboardTransaction = {
  categories?:
    | Array<{
        name?: string;
        type?: string;
        color_hex?: string;
        icon?: string;
      }>
    | {
        name?: string;
        type?: string;
        color_hex?: string;
        icon?: string;
      }
    | null;
  [key: string]: unknown;
};

function buildChartConfig(items: PieChartItem[]): ChartConfig {
  return Object.fromEntries(
    items.map((item, index) => [
      item.category_name || `category-${index}`,
      {
        label: item.category_name,
        color: item.color_hex || item.fill || "#94A3B8",
      },
    ]),
  );
}

function normalizeTransactions(data: DashboardTransaction[] = []): Transaction[] {
  return (data ?? []).map((transaction) => {
    const category = Array.isArray(transaction.categories)
      ? transaction.categories[0] ?? {
          name: "Uncategorized",
          type: "Expense",
          color_hex: "#94A3B8",
          icon: "",
        }
      : transaction.categories ?? {
          name: "Uncategorized",
          type: "Expense",
          color_hex: "#94A3B8",
          icon: "",
        };

    return {
      ...transaction,
      categories: category,
    } as Transaction;
  });
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState(defaultSummary);
  const [chartData, setChartData] = useState<PieChartItem[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);

        const [transactionsRes, summaryRes, categoryRes] = await Promise.all([
          fetch("/api/transactions"),
          fetch("/api/summary"),
          fetch("/api/category"),
        ]);

        if (!transactionsRes.ok || !summaryRes.ok || !categoryRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const [transactionsJson, summaryJson, categoryJson] = await Promise.all([
          transactionsRes.json(),
          summaryRes.json(),
          categoryRes.json(),
        ]);

        if (!active) return;

        const normalizedTransactions = normalizeTransactions(
          transactionsJson?.transactions ?? [],
        );

        const nextChartData = (categoryJson?.transactions ?? []).map(
          (transaction: { category_name: string; total_spent: number; color_hex: string }) => ({
            ...transaction,
            fill: transaction.color_hex || "#94A3B8",
          }),
        );

        setTransactions(normalizedTransactions);
        setSummary(summaryJson ?? defaultSummary);
        setChartData(nextChartData);
        setChartConfig(buildChartConfig(nextChartData));
      } catch (error) {
        console.error("Dashboard refresh failed:", error);
        if (active) {
          setTransactions([]);
          setChartData([]);
          setChartConfig({});
          setSummary(defaultSummary);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboard();
    const interval = setInterval(() => {
      void loadDashboard();
    }, 25000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const cards = [
    { name: "Total Earning", number: summary.totalEarning, percent: "+10" },
    { name: "Total Income", number: summary.totalIncome, percent: "+10" },
    { name: "Total Expense", number: summary.totalExpense, percent: "+10" },
    { name: "Total Saving", number: summary.totalSaving, percent: "+10" },
  ];

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Finance overview</h1>
        </div>
        <AddButton />
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
          Loading dashboard data...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <SectionCard
                key={card.name}
                name={card.name}
                number={card.number}
                percent={card.percent}
              />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <div className="min-h-80">
              <ChartBarInteractive
                data={transactions.map((transaction) => ({
                  date: transaction.date,
                  amount: Number(transaction.amount),
                }))}
              />
            </div>

            <div className="min-h-80">
              <ChartPie chartData={chartData} chartConfig={chartConfig} />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-2 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2 pt-2">
              <h2 className="text-lg font-semibold">Recent transactions</h2>
              <span className="text-sm text-muted-foreground">
                {transactions.length} records
              </span>
            </div>
            {transactions.length > 0 ? (
              <DataTable columns={columns} data={transactions} />
            ) : (
              <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                No transaction data is available yet. Add a new expense to begin tracking your spending.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
