import { NextResponse } from "next/server";
// Using the relative path to bypass the Turbopack alias issue
import { createClient } from "../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Fetch amounts and their category types
  const { data, error } = await supabase.from("transactions").select(`
      amount,
      categories ( type )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 2. Initialize aggregators
  let totalIncome = 0;
  let totalExpense = 0;

  // 3. Process the data server-side
  data.forEach((tx) => {
    const amount = Number(tx.amount);

    const category = tx.categories as unknown as { type: string };
    const categoryType = category?.type;

    if (categoryType === "Income") {
      totalIncome += amount;
    } else if (categoryType === "Expense") {
      totalExpense += amount;
    }
  });

  // 4. Calculate net savings
  const totalSaving = totalIncome - totalExpense;

  // 5. Return the exact JSON structure needed for your UI cards
  return NextResponse.json({
    totalEarning: totalIncome, // Top wide card
    totalIncome: totalIncome, // Bottom left card
    totalExpense: totalExpense, // Bottom middle card
    totalSaving: totalSaving, // Bottom right card
  });
}
