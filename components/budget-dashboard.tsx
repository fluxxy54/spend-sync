import { ChartBarInteractive } from "@/components/bar-chart";
import { ChartLine } from "@/components/line-chart";
import { ChartPie } from "@/components/pie-chart";
import type { ChartConfig } from "@/components/ui/chart";

type BudgetPieChartItem = {
  category_name: string;
  total_spent: number;
  color_hex: string;
  fill: string;
};

type BudgetDashboardProps = {
  lineChartData: Array<{ date: string; amount: number }>;
  barChartData: Array<{ date: string; amount: number }>;
  pieChartData: BudgetPieChartItem[];
  chartConfig: ChartConfig;
};

export function BudgetDashboard({
  lineChartData,
  barChartData,
  pieChartData,
  chartConfig,
}: BudgetDashboardProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <div className="min-h-[320px]">
        <ChartLine data={lineChartData} />
      </div>

      <div className="min-h-[320px]">
        <ChartPie chartData={pieChartData} chartConfig={chartConfig} />
      </div>

      <div className="xl:col-span-2">
        <ChartBarInteractive data={barChartData} />
      </div>
    </div>
  );
}
