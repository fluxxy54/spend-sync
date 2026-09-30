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
  const pieChartData = (categoryRawData?.transactions || []).map(
    (transaction: { color_hex: string }) => ({
      ...transaction,
      fill: transaction.color_hex,
    }),
  );

  const chartConfig = categoryRawData?.transactions || {};
  const lineChartData = (transactionsResult.data ?? []).map((txn) => ({
    date: txn.date,
    amount: Number(txn.amount),
  }));

  const barChartData = lineChartData;

  return (
    <BudgetDashboard
      lineChartData={lineChartData}
      barChartData={barChartData}
      pieChartData={pieChartData}
      chartConfig={chartConfig}
    />
  );
};

export default BudgetPage;
