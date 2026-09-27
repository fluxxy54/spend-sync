// app/api/transactions/route.ts
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  // 1. Initialize the Supabase connection
  const supabase = await createClient();

  // 2. Execute the query (This performs a JOIN on the Categories table)
  let queryBuilder = supabase
    .from("transactions")
    .select(
      `
      id,
      amount,
      date,
      description,
      categories ( name, color_hex,icon )
    `,
    )
    .order("date", { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.ilike("description", `%${query}%`);
  }

  const { data, error } = await queryBuilder;

  // 3. Handle errors
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 4. Return the formatted JSON payload to your Client Components
  return NextResponse.json({ transactions: data });
}
