import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: Request | NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const categoryId = searchParams.get("category_id")?.trim();
  const from = searchParams.get("from")?.trim();
  const to = searchParams.get("to")?.trim();
  const requestedLimit = Number(searchParams.get("limit") ?? "50");
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0 && requestedLimit <= 250 ? requestedLimit : 50;

  const supabase = await createClient();

  let queryBuilder = supabase
    .from("transactions")
    .select(
      `
      id,
      amount,
      date,
      description,
      category_id,
      categories ( name, type, color_hex, icon )
    `,
    )
    .order("date", { ascending: false })
    .limit(limit);

  if (query) {
    queryBuilder = queryBuilder.ilike("description", `%${query}%`);
  }

  if (categoryId) {
    const parsedCategoryId = Number(categoryId);
    if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
      return NextResponse.json(
        { error: "category_id must be a positive integer." },
        { status: 400 },
      );
    }
    queryBuilder = queryBuilder.eq("category_id", parsedCategoryId);
  }

  if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
    queryBuilder = queryBuilder.gte("date", from);
  }

  if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
    queryBuilder = queryBuilder.lte("date", to);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ transactions: data ?? [] });
}
