import { BudgetDashboard } from "@/components/budget-dashboard";
import { createClient } from "@/utils/supabase/server";
import { GET as getCategoryData } from "@/app/api/category/route";

const BudgetPage = async () => {
  const supabase = await createClient();
  const [categoryRes, transactionsResult] = await Promise.all([
    getCategoryData(),
    supabase
      .from("transactions")
      .select(
        "id, amount, date, description, categories ( name, type, color_hex, icon )",
      )
      .order("date", { ascending: false }),
  ]);

  const categoryRawData = await categoryRes.json();
  const categoryItems = Array.isArray(categoryRawData?.transactions)
    ? categoryRawData.transactions
    : [];

  const pieChartData = categoryItems.map(
    (transaction: { category_name: string; total_spent: number; color_hex: string }) => ({
      ...transaction,
      fill: transaction.color_hex || "#94A3B8",
    }),
  );

  const chartConfig = Object.fromEntries(
    categoryItems.map((transaction: { category_name: string; color_hex: string }, index: number) => [
      transaction.category_name || `category-${index}`,
      {
        label: transaction.category_name,
        color: transaction.color_hex || "#94A3B8",
      },
    ]),
  );

  const lineChartData = (transactionsResult.data ?? []).map((txn) => ({
    date: txn.date,
    amount: Number(txn.amount),
  }));

  const barChartData = lineChartData;

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Budget
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Spending trends</h1>
      </div>
      <BudgetDashboard
        lineChartData={lineChartData}
        barChartData={barChartData}
        pieChartData={pieChartData}
        chartConfig={chartConfig}
      />
    </div>
  );
};

export default BudgetPage;
