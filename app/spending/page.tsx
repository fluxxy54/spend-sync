import { columns, Transaction } from "./columns";
import { DataTable } from "./data-table";
import {GET as getTransaction} from "@/app/api/transactions/route"

async function getData(): Promise<Transaction[]> {
  const response = await getTransaction(new Request("http://localhost"));

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  
  return data.transactions;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="container mx-auto p-5">
        
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
