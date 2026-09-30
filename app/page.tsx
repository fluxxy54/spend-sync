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

function normalizeTransactions(data: any[] = []): Transaction[] {
  return (data ?? []).map((transaction) => ({
    ...transaction,
    categories: Array.isArray(transaction.categories)
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
        },
  }));
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState(defaultSummary);
  const [chartData, setChartData] = useState<PieChartItem[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
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

        setTransactions(normalizeTransactions(transactionsJson?.transactions ?? []));
        setSummary(summaryJson ?? defaultSummary);

        const categoryChartData = (categoryJson?.transactions || []).map(
          (transaction: { color_hex: string }) => ({
            ...transaction,
            fill: transaction.color_hex,
          }),
        );

        setChartData(categoryChartData);
        setChartConfig(categoryJson?.transactions || {});
      } catch (error) {
        console.error("Dashboard refresh failed:", error);
      }
    };

    void loadDashboard();
    const interval = setInterval(() => {
      void loadDashboard();
    }, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const userData = {
    name: "Total Earning",
    number: summary.totalEarning,
    percent: "+10",
  };
  const userIncome = {
    name: "Total Income",
    number: summary.totalIncome,
    percent: "+10",
  };
  const userExpense = {
    name: "Total Expense",
    number: summary.totalExpense,
    percent: "+10",
  };
  const userSaving = {
    name: "Total Saving",
    number: summary.totalSaving,
    percent: "+10",
  };

  return (
    <main className="p-5">
      <h1 className="text-3xl mb-5">Home</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <SectionCard {...userData} />
        </div>
        <div className="col-span-2">
          <AddButton />
        </div>
        <div className="">
          <SectionCard {...userIncome} />
        </div>
        <div className="">
          <SectionCard {...userExpense} />
        </div>
        <div className="">
          <SectionCard {...userSaving} />
        </div>
        <div className="col-span-2">
          <ChartBarInteractive
            data={transactions.map((transaction) => ({
              date: transaction.date,
              amount: Number(transaction.amount),
            }))}
          />
        </div>
        <div className="col-span-1">
          <ChartPie chartData={chartData} chartConfig={chartConfig} />
        </div>
        <div className="col-span-full">
          <DataTable columns={columns} data={transactions} />
        </div>
      </div>
    </main>
  );
}
