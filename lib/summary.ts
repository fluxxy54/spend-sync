// utils/queries.ts
import { createClient } from "../utils/supabase/server";

export async function getTransactionSummary() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("transactions").select(`
      amount,
      categories ( type )
  `);

  if (error) {
    console.error("Database Error:", error.message);
    return null; // Or handle the error as needed
  }

  let totalIncome = 0;
  let totalExpense = 0;

  (data || []).forEach((tx) => {
    const amount = Number(tx.amount);
    const category = tx.categories as unknown as { type: string };
    const categoryType = category?.type;

    if (categoryType === "Income") {
      totalIncome += amount;
    } else if (categoryType === "Expense") {
      totalExpense += amount;
    }
  });

  return {
    totalEarning: totalIncome,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    totalSaving: totalIncome - totalExpense,
  };
}