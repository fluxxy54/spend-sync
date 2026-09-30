"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

type ChartPieProps = {
  chartData: { category_name: string; total_spent: number; fill: string }[];
  chartConfig: ChartConfig;
};

export function ChartPie({ chartData, chartConfig }: ChartPieProps) {
  const today = new Date();
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>
          {today.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="total_spent" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total_spent"
              nameKey="category_name"
              labelLine={false} // Keeps the lines hidden
              outerRadius={80} // Shrink this number to increase the space between pie and labels
              label={{
                fill: "var(--foreground)",
                fontSize: 14,
                fontWeight: 500,
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
