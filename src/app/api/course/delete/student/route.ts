// app/api/course/delete/student/route.ts

import { createClient } from "@/app/api/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { course_id, student_ids } = await req.json(); // course_id: string, student_ids: string[]

  if (!course_id || !Array.isArray(student_ids) || student_ids.length === 0) {
    return NextResponse.json({ error: "잘못된 요청 형식" }, { status: 400 });
  }

  const { error } = await supabase
    .from("course_student")
    .delete()
    .match({ course_id })
    .in("student_id", student_ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제 완료", status: 200 });
}
