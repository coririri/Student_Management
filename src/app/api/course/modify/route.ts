// app/api/course/route.ts
import { createClient } from "@/app/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { title, courseId } = body;

  if (!title || title.trim() === "") {
    return NextResponse.json(
      { error: "반 제목은 필수입니다." },
      { status: 400 }
    );
  }

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId가 누락되었습니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("course")
    .update({ name: title })
    .eq("id", courseId)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data || data.length === 0)
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });

  return NextResponse.json({ id: data[0].id });
}
