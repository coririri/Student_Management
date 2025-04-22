import { createClient } from "../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { id, password } = body;

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email: id,
    password: password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "생성 실패" }, { status: 500 });

  // ✅ 로그인 성공 시 응답 추가
  return NextResponse.json(
    { message: "로그인 성공", user: data.user },
    { status: 200 }
  );
}
