"use client";

// import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";
const response = await fetch("http://localhost:3000/api/category");

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();

const chartData = data.transactions.map(
  (transaction: { color_hex: string }) => ({
    ...transaction,
    fill: transaction.color_hex, // Recharts needs this exact property name
  }),
);
const chartConfig = data.transactions;
const today = new Date();
export function ChartPie() {
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
      {/* <CardFooter className="flex-col gap-2 text-sm"> */}
      {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total total_spent for the last 6 months
        </div> */}
      {/* </CardFooter> */}
    </Card>
  );
}
