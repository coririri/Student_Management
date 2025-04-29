// app/api/course/route.ts
import { createClient } from "@/app/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title } = body;

  if (title == "") {
    return NextResponse.json(
      { error: "반 제목은 필수입니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("course")
    .insert([{ name: title }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0)
    return NextResponse.json({ error: "생성 실패" }, { status: 500 });

  return NextResponse.json({ id: data[0].id });
}
