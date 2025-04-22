// app/api/student/deleteMany/route.ts

import { createClient } from "@/app/api/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { ids } = await req.json(); // ids: number[] 또는 string[]

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "잘못된 요청 형식" }, { status: 400 });
  }

  const { error } = await supabase.from("student").delete().in("id", ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제 완료", status: 200 });
}
