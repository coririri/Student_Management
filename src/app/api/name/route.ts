import { createClient } from "../supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("teacher")
    .select("*")
    .eq("id", user.id) // 또는 .eq("user_id", user.id) 등
    .single();

  return NextResponse.json({ name: data.username, role: data.role });
}
