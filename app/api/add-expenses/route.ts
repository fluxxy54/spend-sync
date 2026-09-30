import { NextRequest, NextResponse } from "next/server";
// Using the relative path to bypass the Turbopack alias issue
import { createClient } from "../../../utils/supabase/server";

// Define the expected shape of the incoming data
type SaveRequest = {
  //   id: number;
  amount: number;
  date: string;
  category_id: number;
  description: string | null;
};

export async function POST(request: NextRequest) {
  try {
    // 1. Initialize the Supabase connection
    const supabase = await createClient();

    // 2. Parse and type the incoming JSON body
    const body: SaveRequest = await request.json();
    const { amount, date, category_id, description } = body;

    // 3. Basic validation to ensure required fields aren't missing
    if (amount === undefined || !date || !category_id) {
      return NextResponse.json(
        { error: "Missing required fields: amount, date, or category_id" },
        { status: 400 },
      );
    }

    // 4. Insert the new record into the database
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          //   id: id,
          amount: amount,
          date: date,
          category_id: category_id,
          description: description,
        },
      ])
      .select() // Tells Supabase to return the newly inserted row
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 5. Return a successful 201 Created response with the new data
    return NextResponse.json(
      { success: true, transaction: data },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/transactions error:", err);
    return NextResponse.json(
      { error: "Invalid request payload or server error" },
      { status: 500 },
    );
  }
}
