"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
// import { MoreHorizontal } from "lucide-react";

import { type DataTableFeatures } from "./data-table-features";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  name: string;
  color_hex: string;
  icon: string;
};
export type Transaction = {
  id: number;
  amount: number;
  date: string;
  description: string;
  categories: Category;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Transaction>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  }),
  columnHelper.accessor("date", {}),
  columnHelper.accessor("description", {
    header: "Description",
  }),

  columnHelper.accessor("categories.name", {
    header: "Categories",
  }),
  columnHelper.accessor("categories.color_hex", {
    header: "Color",

    cell: (info) => {
      const hexColor = info.getValue();
      const icon = info.row.original.categories.icon;

      return (
        <div
          className="flex items-center justify-center w-12 h-12 rounded-4xl"
          style={{ backgroundColor: hexColor }}
        >
          <Image src={icon} width={30} height={30} alt="icon"></Image>
        </div>
      );
    },
  }),

  // columnHelper.display({
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const Transaction = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger
  //           render={<Button variant="ghost" className="h-8 w-8 p-0" />}
  //         >
  //           <span className="sr-only">Open menu</span>
  //           <MoreHorizontal className="h-4 w-4" />
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //           // onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // }),
]);
