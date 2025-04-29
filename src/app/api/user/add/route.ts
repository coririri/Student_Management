// app/api/user/add/route.ts
import { createClient as createServerClient } from "../../supabase/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚡ 여기!! Service Role Key
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, id, password } = body;

  if (username == "") {
    return NextResponse.json({ error: "이름은 필수입니다." }, { status: 400 });
  }

  if (id == "") {
    return NextResponse.json(
      { error: "아이디는 필수입니다." },
      { status: 400 }
    );
  }

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

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: id,
    password: password,
    user_metadata: { name: username },
    email_confirm: true, // 이메일 인증 필요 없이 바로 생성할 거면 true
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
