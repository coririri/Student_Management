// app/api/user/add/route.ts
import { createClient as createServerClient } from "../../supabase/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚡ 여기!! Service Role Key
);

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, password } = body;

  if (password == "" || password.length < 6) {
    return NextResponse.json(
      { error: "비밀번호는 6자리 이상으로 입력해주세요." },
      { status: 400 }
    );
  }
  const supabase = await createServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("teacher")
    .select("*")
    .eq("id", user.id) // 또는 .eq("user_id", user.id) 등
    .single();

  if (data.role != "admin") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  // 비밀번호 변경
  const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
    password: password, // 새 비밀번호
  });

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
