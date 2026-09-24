"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "An interactive bar chart";
const response = await fetch("http://localhost:3000/api/transactions");

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
const chartData = data.transactions;

// {
//       "id": 6,
//       "amount": 600,
//       "date": "2026-09-20",
//       "description": "AUC 24-Hour Relay Registration fee",
//       "categories": {
//         "name": "Running & Fitness",
//         "color_hex": "#F59E0B"
//       }
  
// const chartData = [
//   { date: "2026-01-30", desktop: 434, mobile: 380 },
//   { date: "2026-02-30", desktop: 448, mobile: 490 },
//   { date: "2026-03-30", desktop: 149, mobile: 200 },
//   { date: "2026-04-30", desktop: 103, mobile: 160 },
//   { date: "2026-05-30", desktop: 446, mobile: 400 },
// ];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  amount: {
    label: "amount",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amount");

  //   const total = React.useMemo(
  //     () => ({
  //       desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  //       mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
  //     }),
  //     []
  //   )

  return (
    <Card className="py-2">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-37.5"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
