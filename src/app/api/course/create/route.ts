// app/api/class/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../subabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    // 필수 값 확인
    if (!name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Supabase에 "class" 테이블에 반 정보 삽입
    const { data, error } = await supabase
      .from("course")
      .insert([{ name }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
