// app/api/user/add/route.ts
import { createClient as createServerClient } from "../../supabase/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚡ 여기!! Service Role Key
);

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  const supabase = await createServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData } = await supabase
    .from("teacher")
    .select("*")
    .eq("id", user.id) // 또는 .eq("user_id", user.id) 등
    .single();

  if (userData.role != "admin") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  // 유저 삭제
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);

  // 에러가 있으면 에러 메시지 반환
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  // 성공하면 변경된 데이터 반환
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}
