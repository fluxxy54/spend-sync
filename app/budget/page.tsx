import { ChartBarInteractive } from "@/components/bar-chart";
import { ChartLine } from "@/components/line-chart";
import { ChartPie } from "@/components/pie-chart";
import React from "react";
import { getTransactionSummary } from "@/lib/summary";
import { GET as getCategoryData } from "@/app/api/category/route";

const budget = async () => {
  const categoryRes = await getCategoryData();
  const categoryRawData = await categoryRes.json();
  const chartData = (categoryRawData?.transactions || []).map(
    (transaction: { color_hex: string }) => ({
      ...transaction,
      fill: transaction.color_hex,
    }),
  );
  const chartConfig = categoryRawData?.transactions || {};
  return (
    <>
      {/* <div className="p-5">budget</div> */}

      <div className="grid grid-cols-3 gap-4 p-5 ">
        <div className="col-span-2">
          <ChartLine />
        </div>
        <div>
          <ChartPie chartData={chartData} chartConfig={chartConfig} />
        </div>
        <div className="h-10 col-span-3">
          <ChartBarInteractive />
        </div>
      </div>
    </>
  );
};

export default budget;
