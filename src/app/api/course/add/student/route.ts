import { createClient } from "@/app/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { ids, courseId } = body;

  if (!ids || !Array.isArray(ids) || !courseId) {
    return NextResponse.json({ error: "잘못된 요청 형식" }, { status: 400 });
  }

  const supabase = await createClient();

  const rowsToInsert = [];

  for (const studentId of ids) {
    // 중복 체크
    const { data: existing, error: checkError } = await supabase
      .from("course_student")
      .select("id")
      .eq("student_id", studentId)
      .eq("course_id", courseId);

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    // 존재하지 않으면 insert 목록에 추가
    if (!existing || existing.length === 0) {
      rowsToInsert.push({
        student_id: studentId,
        course_id: courseId,
      });
    }
  }

  // 한 번에 bulk insert
  if (rowsToInsert.length > 0) {
    const { data, error: insertError } = await supabase
      .from("course_student")
      .insert(rowsToInsert)
      .select();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    if (data) {
      return NextResponse.json(
        { message: "삽입 완료", inserted: data.length },
        { status: 200 }
      );
    }
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
