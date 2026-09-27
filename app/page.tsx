import { ChartBarInteractive } from "@/components/bar-chart";
import { ChartPie } from "@/components/pie-chart";
import { SectionCard } from "@/components/section-cards";
import { columns } from "./spending/columns";
import { DataTable } from "./spending/data-table";

const response = await fetch("http://localhost:3000/api/summary");
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();

const userData = {
  name: "Total Earning",
  number: data.totalEarning,
  percent: "+10",
};
const userIncome = {
  name: "Total Income",
  number: data.totalIncome,
  percent: "+10",
};
const userExpense = {
  name: "Total Expense",
  number: data.totalExpense,
  percent: "+10",
};
const userSaving = {
  name: "Total Saving",
  number: data.totalSaving,
  percent: "+10",
};

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="text-3xl mb-5">Home</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-full">
          <SectionCard {...userData} />
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
          <ChartBarInteractive />
        </div>
        <div className="col-span-1">
          <ChartPie />
        </div>
        <div className="col-span-full">
          <DataTable
            columns={columns}
            data={[]}
            liveRefreshUrl="/api/transactions"
            refreshIntervalMs={15000}
          />
        </div>
      </div>
    </main>
  );
}
