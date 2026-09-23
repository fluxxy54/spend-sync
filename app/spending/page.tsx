import { columns, Transaction } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Transaction[]> {
  const response = await fetch("http://localhost:3000/api/transactions");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  // FIX 1: Return the array, not the parent object
  return data.transactions;
}
// return [
//   {
//     id: 1,
//     amount: 350,
//     date: "2026-09-18",
//     description: "Sahlpay electricity and gas bill",
//     categories: {
//       name: "Utilities",
//       color_hex: "#EF4444",
//     },
//   },
//   {
//     id: 2,
//     amount: 120,
//     date: "2026-09-16",
//     description: "Rabbit Mobility ride",
//     categories: {
//       name: "Transport",
//       color_hex: "#3B82F6",
//     },
//   },

//   // ...
// ];

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="container mx-auto p-10">
        {/* FIX 2: Pass 'data', which now contains the array returned from getData() */}
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
