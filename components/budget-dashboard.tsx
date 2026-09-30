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
    <div className="grid grid-cols-3 gap-4 p-5">
      <div className="col-span-2">
        <ChartLine data={lineChartData} />
      </div>

      <div>
        <ChartPie chartData={pieChartData} chartConfig={chartConfig} />
      </div>

      <div className="h-10 col-span-3">
        <ChartBarInteractive data={barChartData} />
      </div>
    </div>
  );
}
