// src/app/api/course/save/route.ts

import { createClient } from "@/app/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "요청 형식이 잘못되었습니다." },
      { status: 400 }
    );
  }

  for (const record of body) {
    const {
      student_id,
      course_id,
      record_date,
      id,
      attendance,
      late_time,
      homework_completion,
      notes,
      progress,
      ...rest
    } = record;

    if (id === null || id === undefined) {
      // insert
      const { error } = await supabase.from("record").insert([
        {
          student_id,
          course_id,
          record_date,
          attendance: "attendance",
          late_time: 10,
          homework_completion: 100,
          notes,
          progress,
          ...rest,
        },
      ]);

      if (error) {
        return NextResponse.json(
          { error: `삽입 오류 - ${error.message}` },
          { status: 500 }
        );
      }
    } else {
      // update
      const { error } = await supabase
        .from("record")
        .update({
          attendance,
          late_time,
          homework_completion,
          notes,
          progress,
        })
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: `id: ${id} - ${error.message}` },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json(
    { message: "모든 항목이 성공적으로 저장되었습니다." },
    { status: 200 }
  );
}
