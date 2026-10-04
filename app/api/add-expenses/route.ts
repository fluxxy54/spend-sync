import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

type SaveRequest = {
  amount: number;
  date: string;
  category_id: number;
  description?: string | null;
};

const MAX_AMOUNT = 1000000;
const MAX_DESCRIPTION_LENGTH = 255;

function validatePayload(body: unknown): {
  amount: number;
  date: string;
  categoryId: number;
  description: string | null;
} | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Request body must be a JSON object." };
  }

  const record = body as Record<string, unknown>;
  const amount = Number(record.amount);
  const categoryId = Number(record.category_id);
  const date = typeof record.date === "string" ? record.date.trim() : "";
  const description =
    typeof record.description === "string" ? record.description.trim() : "";

  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_AMOUNT) {
    return {
      error: `Amount must be a positive number no greater than ${MAX_AMOUNT}.`,
    };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Date must be provided in YYYY-MM-DD format." };
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    return { error: "Date is invalid." };
  }

  if (parsedDate.getTime() > Date.now()) {
    return { error: "Date cannot be in the future." };
  }

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return { error: "category_id must be a positive integer." };
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`,
    };
  }

  return {
    amount,
    date,
    categoryId,
    description: description || null,
  };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: SaveRequest = await request.json();
    const validated = validatePayload(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("id", validated.categoryId)
      .maybeSingle();

    if (categoryError) {
      return NextResponse.json({ error: categoryError.message }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json(
        { error: "Selected category does not exist." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          amount: validated.amount,
          date: validated.date,
          category_id: validated.categoryId,
          description: validated.description,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, transaction: data },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/add-expenses error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Invalid request payload or server error",
      },
      { status: 500 },
    );
  }
}
