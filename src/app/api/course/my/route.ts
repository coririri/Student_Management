import { createClient } from "../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 쿼리 파라미터에서 검색어 추출
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";

  // Supabase 쿼리
  let query = supabase.from("course").select("*").eq("teacher_id", user.id);

  if (keyword) {
    // 검색어가 있을 경우 title 컬럼을 기준으로 필터링
    query = query.ilike("name", `%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
