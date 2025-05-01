// app/api/course/route.ts
import { createClient } from "@/app/api/supabase/server";
import validatePhoneNumber from "@/app/utils/validatePhoneNumber";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, grade, phonenumber, parent_phonenumber } = body;

  if (name == "") {
    return NextResponse.json({ error: "이름은 필수입니다." }, { status: 400 });
  }

  if (phonenumber == "") {
    return NextResponse.json(
      { error: "학생 전화번호는 필수입니다." },
      { status: 400 }
    );
  }

  if (phonenumber == "") {
    return NextResponse.json(
      { error: "학생 전화번호는 필수입니다." },
      { status: 400 }
    );
  }

  if (validatePhoneNumber(phonenumber)) {
    return NextResponse.json(
      { error: "학생 전화번호 형식 오류." },
      { status: 400 }
    );
  }

  if (validatePhoneNumber(parent_phonenumber)) {
    return NextResponse.json(
      { error: "부모님 전화번호 형식 오류." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("student")
    .insert([{ name, grade, phonenumber, parent_phonenumber }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0)
    return NextResponse.json({ error: "생성 실패" }, { status: 500 });

  return NextResponse.json({ status: 200 });
}
