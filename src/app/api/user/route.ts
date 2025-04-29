import { createClient } from "../supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // teacher 테이블에서 모든 데이터를 가져옵니다.
  const { data, error } = await supabase.from("teacher").select("*");

  // 오류가 있을 경우 처리
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 원하는 데이터 형식으로 변환하여 반환
  const result = data.map((teacher) => ({
    id: teacher.id,
    username: teacher.username,
    email: teacher.email,
  }));

  return NextResponse.json(result);
}
