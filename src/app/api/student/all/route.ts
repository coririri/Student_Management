import { createClient } from "../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";

  let query = supabase.from("student").select("*");

  if (keyword) {
    // name 컬럼에 검색어가 포함되어 있는 경우만 필터링
    query = query.ilike("name", `%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
