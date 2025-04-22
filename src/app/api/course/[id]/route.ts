import { createClient } from "../../supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { UUID } from "crypto";
import type { PostgrestError } from "@supabase/supabase-js";

type StudentCourseRow = {
  student_id: UUID | null;
  student_name: string | null;
  student_grade: number | null;
  student_phonenumber: string | null;
  student_parent_phonenumber: string | null;
  id: UUID | null;
  record_date: string | null;
  attendance: string | null;
  late_time: number | null;
  homework_completion: number | null;
  notes: string | null;
  progress: string | null;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: courseId } = await params;
  const dateParam = request.nextUrl.searchParams.get("date");
  const supabase = await createClient();

  if (!courseId || courseId === "0") {
    return NextResponse.json(
      { error: "조회할 반이 존재하지 않습니다." },
      { status: 400 }
    );
  }

  if (!dateParam) {
    return NextResponse.json({ error: "날짜가 필요합니다." }, { status: 400 });
  }

  const date = new Date(dateParam).toISOString().split("T")[0];

  // 수동으로 JOIN을 사용하여 `course_student`와 `record`를 가져오는 쿼리 작성
  const { data, error } = (await supabase.rpc("get_course_student_records", {
    p_course_id: courseId,
    p_record_date: date,
  })) as unknown as {
    data: StudentCourseRow[]; // <-- 여기 수정[];
    error: PostgrestError | null;
  };

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = data.map((row) => ({
    record_id: row.id ?? null,
    record_date: row.record_date ?? null,
    attendance: row.attendance ?? "attendance",
    late_time: row.late_time ?? 10,
    homework_completion: row.homework_completion ?? 100,
    notes: row.notes ?? null,
    progress: row.progress ?? null,
    student_id: row.student_id,
    name: row.student_name,
    grade: row.student_grade,
    phonenumber: row.student_phonenumber,
    parent_phonenumber: row.student_parent_phonenumber,
  }));

  return NextResponse.json(result);
}
