import { createClient } from "../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const courseId = context.params.id;
  const supabase = await createClient();
  console.log(courseId);
  if (courseId == "0") {
    return NextResponse.json(
      { error: "조회할 반이 존재하지 않습니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("course")
    .select("name")
    .eq("id", courseId) // `id` 필드 기준으로 조회해야 함
    .single(); // 하나의 결과만 기대하므로 `.single()` 사용

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ name: data.name });
}
